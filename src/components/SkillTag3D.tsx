import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import type { Skill } from '../data/skills';

type SkillTag3DProps = {
  skill: Skill;
  index: number;
};

export function SkillTag3D({ skill, index }: SkillTag3DProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock, camera }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + index * 0.65;
    ref.current.position.y = skill.position[1] + Math.sin(t * 1.2) * 0.12;
    ref.current.position.x = skill.position[0] + Math.cos(t * 0.85) * 0.07;
    ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref} position={skill.position}>
      <mesh>
        <boxGeometry args={[1.22 + skill.name.length * 0.042, 0.38, 0.035]} />
        <meshStandardMaterial color={skill.color} roughness={0.52} metalness={0.08} />
      </mesh>
      <Text position={[0, 0, 0.035]} fontSize={0.13} color="#08080d" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>
    </group>
  );
}
