import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { MathUtils, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const MODEL_PATH = '/models/skateboard/';

type LoadedMaterials = {
  resourcePath?: string;
  texturePath?: string;
  preload: () => void;
};

function prepareMaterials(materials: LoadedMaterials) {
  materials.resourcePath = MODEL_PATH;
  materials.texturePath = MODEL_PATH;
  materials.preload();
}

function tuneMaterials(root: Object3D, hoverColor: string) {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (!(material instanceof MeshStandardMaterial)) return;
      material.roughness = Math.min(material.roughness + 0.18, 0.92);
      material.metalness = material.name.toLowerCase().includes('truck') ? 0.72 : material.metalness;

      if (material.name.toLowerCase().includes('wheel')) {
        material.color.set(hoverColor);
        material.roughness = 0.42;
      }
    });
  });
}

type ImportedSkateboardModelProps = {
  hovered: boolean;
};

export function ImportedSkateboardModel({ hovered }: ImportedSkateboardModelProps) {
  const deckMaterials = useLoader(MTLLoader, `${MODEL_PATH}deck.mtl`);
  const wheelMaterials = useLoader(MTLLoader, `${MODEL_PATH}wheel.mtl`);

  const deck = useLoader(OBJLoader, `${MODEL_PATH}deck.obj`, (loader) => {
    prepareMaterials(deckMaterials);
    loader.setMaterials(deckMaterials);
  });

  const wheels = useLoader(OBJLoader, `${MODEL_PATH}wheel.obj`, (loader) => {
    prepareMaterials(wheelMaterials);
    loader.setMaterials(wheelMaterials);
  });

  const deckObject = useMemo(() => {
    const object = deck.clone(true);
    tuneMaterials(object, '#ffffff');
    return object;
  }, [deck]);

  const wheelObject = useMemo(() => {
    const object = wheels.clone(true);
    tuneMaterials(object, hovered ? '#aefdf1' : '#ff2f7d');
    return object;
  }, [hovered, wheels]);

  return (
    <group scale={0.44} position={[0, 0.05, 0]} rotation={[MathUtils.degToRad(188), MathUtils.degToRad(90), MathUtils.degToRad(90)]}>
      <primitive object={deckObject} />
      <primitive object={wheelObject} />
    </group>
  );
}
