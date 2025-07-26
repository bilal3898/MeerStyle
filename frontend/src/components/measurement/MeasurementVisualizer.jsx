'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

function BodyModel({ measurements }) {
  const bodyParts = useMemo(() => ({
    chest: { position: [0, 1.5, 0], rotation: [0, 0, 0] },
    waist: { position: [0, 1, 0], rotation: [Math.PI/2, 0, 0] },
    // Add more body part positions
  }), []);

  return (
    <>
      {/* Main body mesh */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.8, 32]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Measurement annotations */}
      {Object.entries(measurements).map(([part, value]) => (
        <group key={part} position={bodyParts[part].position}>
          <Text
            fontSize={0.1}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {`${part}: ${value}cm`}
          </Text>
          <mesh rotation={bodyParts[part].rotation}>
            <cylinderGeometry args={[0.01, 0.01, 0.5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function MeasurementVisualizer({ measurements }) {
  return (
    <div className="w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {Object.keys(measurements).length > 0 ? (
          <BodyModel measurements={measurements} />
        ) : (
          <Text position={[0, 1, 0]} fontSize={0.2}>
            No measurements available
          </Text>
        )}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />
        <gridHelper args={[5, 30]} />
      </Canvas>
    </div>
  );
}