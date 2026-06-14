import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const cameraTarget = new Vector3(0, 0.1, 0);

export function CameraController() {
  useFrame(({ pointer, camera }) => {
    camera.position.x += (pointer.x * 0.62 - camera.position.x) * 0.045;
    camera.position.y += (1.1 + pointer.y * 0.48 - camera.position.y) * 0.045;
    camera.position.z += (6.2 - camera.position.z) * 0.08;

    camera.lookAt(cameraTarget);
  });

  return null;
}
