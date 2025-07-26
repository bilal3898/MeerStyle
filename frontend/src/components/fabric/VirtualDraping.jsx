'use client';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

function GarmentModel({ fabricTexture }) {
  const { scene } = useGLTF('/models/shirt.glb');
  const texture = useLoader(THREE.TextureLoader, fabricTexture);

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [texture, scene]);

  return <primitive object={scene} />;
}

function SceneSetup({ fabric }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(2, 2, 2);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <GarmentModel fabricTexture={fabric.textureMap} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI/2}
      />
    </>
  );
}

export default function VirtualDraping({ selectedFabric }) {
  return (
    <div className="w-full h-[500px] bg-gray-50 rounded-xl overflow-hidden">
      <Canvas camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          {selectedFabric ? (
            <SceneSetup fabric={selectedFabric} />
          ) : (
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#ccc" />
            </mesh>
          )}
        </Suspense>
      </Canvas>
      
      {!selectedFabric && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
          Select a fabric to preview
        </div>
      )}
    </div>
  );
}