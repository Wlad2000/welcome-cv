import { Physics } from '@react-three/cannon';
import type { ReactNode } from 'react';

type PhysicsWorldProps = {
  children: ReactNode;
};

export function PhysicsWorld({ children }: PhysicsWorldProps) {
  return (
    <Physics gravity={[0, -0.42, 0]} iterations={12} broadphase="SAP" allowSleep={false}>
      {children}
    </Physics>
  );
}
