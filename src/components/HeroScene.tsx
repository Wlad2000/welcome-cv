import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { skills } from '../data/skills';
import { CameraController } from '../scene/CameraController';
import { Lights } from '../scene/Lights';
import { PhysicsWorld } from '../scene/PhysicsWorld';
import { StreetBackground } from '../scene/StreetBackground';
import { SkateboardModel } from './SkateboardModel';
import { SkillTag3D } from './SkillTag3D';

export function HeroScene() {
  return (
    <div className="hero-scene-canvas relative h-[52vh] min-h-[340px] w-full touch-none overflow-hidden sm:h-[50vh] sm:min-h-[380px] lg:h-[58vh] lg:min-h-[460px] xl:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 1.1, 6.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#08080d']} />
          <fog attach="fog" args={['#08080d', 7.2, 12]} />
          <Lights />
          <StreetBackground />
          <PhysicsWorld>
            <SkateboardModel />
          </PhysicsWorld>
          {skills.map((skill, index) => (
            <SkillTag3D key={skill.name} skill={skill} index={index} />
          ))}
          <Environment preset="city" />
          <CameraController />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-asphalt to-transparent" />
    </div>
  );
}
