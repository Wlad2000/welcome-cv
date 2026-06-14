import { useBox, usePlane } from '@react-three/cannon';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Group } from 'three';
import { ImportedSkateboardModel } from './ImportedSkateboardModel';

type PointerPosition = {
  x: number;
  y: number;
};

type Vec3 = [number, number, number];

type PointerCaptureTarget = EventTarget & {
  setPointerCapture?: (pointerId: number) => void;
  releasePointerCapture?: (pointerId: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function SkateboardModel() {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const bodyPosition = useRef<Vec3>([0, 0.45, 0]);
  const bodyRotation = useRef<Vec3>([0, 0, 0]);
  const previousPointer = useRef<PointerPosition | null>(null);
  const dragStartPointer = useRef<PointerPosition | null>(null);
  const dragStartPosition = useRef<Vec3>([0, 0.45, 0]);
  const dragStartRotation = useRef<Vec3>([0, 0, 0]);
  const dragTargetPosition = useRef<Vec3>([0, 0.45, 0]);
  const dragTargetRotation = useRef<Vec3>([0, 0, 0]);
  const idleTargetPosition = useRef<Vec3>([0, 0.45, 0]);
  const idleTargetRotation = useRef<Vec3>([0, 0, 0]);

  const [deckRef, api] = useBox<Group>(() => ({
    mass: 1.8,
    args: [2.9, 0.26, 0.92],
    position: [0, 0.45, 0],
    angularDamping: 0.58,
    linearDamping: 0.8,
  }));

  usePlane(() => ({ position: [0, -1.15, 0], rotation: [-Math.PI / 2, 0, 0] }));
  useBox(() => ({ type: 'Static', args: [0.2, 4, 4], position: [-3.8, 0, 0] }));
  useBox(() => ({ type: 'Static', args: [0.2, 4, 4], position: [3.8, 0, 0] }));
  useBox(() => ({ type: 'Static', args: [8, 4, 0.2], position: [0, 0, -1.15] }));
  useBox(() => ({ type: 'Static', args: [8, 4, 0.2], position: [0, 0, 0.95] }));
  useBox(() => ({ type: 'Static', args: [8, 0.2, 4], position: [0, 2.2, 0] }));

  useEffect(() => {
    const unsubscribe = api.position.subscribe((position) => {
      bodyPosition.current = position;
    });
    const unsubscribeRotation = api.rotation.subscribe((rotation) => {
      bodyRotation.current = rotation;
    });

    return () => {
      unsubscribe();
      unsubscribeRotation();
    };
  }, [api.position, api.rotation]);

  const updateDragFromPointer = useCallback(
    (pointer: PointerPosition) => {
      const startPointer = dragStartPointer.current;
      if (!startPointer) return;

      const deltaX = clamp(pointer.x - startPointer.x, -180, 180);
      const deltaY = clamp(pointer.y - startPointer.y, -220, 220);
      const [startX, startY, startZ] = dragStartPosition.current;
      const [startRotationX, startRotationY, startRotationZ] = dragStartRotation.current;

      dragTargetPosition.current = [
        clamp(startX + deltaX * 0.0045, -1.05, 1.05),
        clamp(startY - deltaY * 0.0045, 0.05, 1.18),
        clamp(startZ + deltaY * 0.0014, -0.3, 0.32),
      ];
      dragTargetRotation.current = [
        clamp(startRotationX + deltaY * 0.012, -1.45, 1.45),
        clamp(startRotationY - deltaX * 0.0055, -0.82, 0.82),
        clamp(startRotationZ - deltaX * 0.0035, -0.55, 0.55),
      ];

      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
    },
    [api.angularVelocity, api.position, api.rotation, api.velocity],
  );

  useEffect(() => {
    const handleWindowMove = (event: PointerEvent) => {
      if (!draggingRef.current || !previousPointer.current) return;

      const nextPointer = { x: event.clientX, y: event.clientY };
      updateDragFromPointer(nextPointer);
      previousPointer.current = nextPointer;
    };

    const finishDrag = () => {
      draggingRef.current = false;
      previousPointer.current = null;
      dragStartPointer.current = null;
      idleTargetPosition.current = [...dragTargetPosition.current];
      idleTargetRotation.current = [...dragTargetRotation.current];
      setDragging(false);
    };

    window.addEventListener('pointermove', handleWindowMove);
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);

    return () => {
      window.removeEventListener('pointermove', handleWindowMove);
      window.removeEventListener('pointerup', finishDrag);
      window.removeEventListener('pointercancel', finishDrag);
    };
  }, [updateDragFromPointer]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const [x, y, z] = bodyPosition.current;
    const [rotationX, rotationY, rotationZ] = bodyRotation.current;
    const [idleX, idleY, idleZ] = idleTargetPosition.current;
    const [idleRotationX, idleRotationY, idleRotationZ] = idleTargetRotation.current;
    const targetY = idleY + Math.sin(t * 1.8) * 0.055;

    if (dragging) {
      const [targetX, targetDragY, targetZ] = dragTargetPosition.current;
      const [targetRotationX, targetRotationY, targetRotationZ] = dragTargetRotation.current;

      api.position.set(
        x + (targetX - x) * 0.42,
        y + (targetDragY - y) * 0.42,
        z + (targetZ - z) * 0.42,
      );
      api.rotation.set(
        rotationX + (targetRotationX - rotationX) * 0.5,
        rotationY + (targetRotationY - rotationY) * 0.5,
        rotationZ + (targetRotationZ - rotationZ) * 0.5,
      );
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
      return;
    }

    api.applyForce([(idleX - x) * 1.6, (targetY - y) * 3.25 + 0.78, (idleZ - z) * 5.6], [0, 0, 0]);
    api.applyTorque([
      (idleRotationX - rotationX) * 0.9,
      (idleRotationY - rotationY) * 1.15,
      (idleRotationZ - rotationZ) * 0.9,
    ]);

    if (
      Math.abs(x) > 3.2 ||
      y < -0.85 ||
      y > 1.8 ||
      Math.abs(z) > 0.52 ||
      Math.abs(rotationX) > 2.2 ||
      Math.abs(rotationY) > 2.2 ||
      Math.abs(rotationZ) > 2.2
    ) {
      api.position.set(...idleTargetPosition.current);
      api.rotation.set(...idleTargetRotation.current);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
    }

    api.applyTorque([Math.sin(t) * 0.025, Math.cos(t * 0.8) * 0.035, Math.sin(t * 0.6) * 0.022]);
  });

  const handleDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target as PointerCaptureTarget).setPointerCapture?.(event.pointerId);
    const pointer = { x: event.nativeEvent.clientX, y: event.nativeEvent.clientY };
    previousPointer.current = pointer;
    dragStartPointer.current = pointer;
    dragStartPosition.current = [...bodyPosition.current];
    dragStartRotation.current = [...bodyRotation.current];
    dragTargetPosition.current = [...bodyPosition.current];
    dragTargetRotation.current = [...bodyRotation.current];
    draggingRef.current = true;
    setDragging(true);
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
  };

  const handleUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target as PointerCaptureTarget).releasePointerCapture?.(event.pointerId);
    draggingRef.current = false;
    previousPointer.current = null;
    dragStartPointer.current = null;
    idleTargetPosition.current = [...dragTargetPosition.current];
    idleTargetRotation.current = [...dragTargetRotation.current];
    setDragging(false);
  };

  const handleMove = (event: ThreeEvent<PointerEvent>) => {
    if (!draggingRef.current || !previousPointer.current) return;

    event.stopPropagation();
    const nextPointer = { x: event.nativeEvent.clientX, y: event.nativeEvent.clientY };
    updateDragFromPointer(nextPointer);
    previousPointer.current = nextPointer;
  };

  return (
    <group
      ref={deckRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        if (!draggingRef.current) setDragging(false);
      }}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
    >
      <group>
        <ImportedSkateboardModel hovered={hovered} />
        <mesh position={[0, 0.05, 0]} onPointerDown={handleDown} onPointerMove={handleMove} onPointerUp={handleUp}>
          <boxGeometry args={[3.15, 0.62, 1.18]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
