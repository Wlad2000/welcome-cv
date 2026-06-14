import { Plane, Text } from '@react-three/drei';

export function StreetBackground() {
  return (
    <group position={[0, 0, -1.65]}>
      <Plane args={[9, 5.4]} position={[0, 0.2, -1.05]}>
        <meshStandardMaterial color="#121018" roughness={0.88} metalness={0.08} />
      </Plane>
      <gridHelper args={[9, 12, '#353542', '#24242d']} position={[0, -1.75, 0.45]} rotation={[0, 0, 0]} />
      <Text
        position={[-2.85, 1.3, -0.92]}
        rotation={[0, 0, -0.12]}
        fontSize={0.42}
        color="#ff2f7d"
        anchorX="left"
        fontWeight={900}
      >
        CODE
      </Text>
      <Text
        position={[1.2, -1.1, -0.9]}
        rotation={[0, 0, 0.09]}
        fontSize={0.28}
        color="#35f2c2"
        anchorX="left"
      >
        PUSH / COMMIT / SKATE
      </Text>
    </group>
  );
}
