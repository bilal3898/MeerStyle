// lib/hooks/useFabricPreview.js
import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export const useFabricPreview = (initialTexture) => {
  const [texture, setTexture] = useState(initialTexture);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTexture = useCallback(async (textureUrl) => {
    try {
      setIsLoading(true);
      setError(null);
      const texture = await useLoader(TextureLoader, textureUrl);
      setTexture(texture);
    } catch (err) {
      setError('Failed to load fabric texture');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const PreviewComponent = useCallback(({ garmentModel }) => (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <primitive object={garmentModel} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </Canvas>
  ), [texture]);

  return {
    texture,
    loadTexture,
    PreviewComponent,
    isLoading,
    error,
    resetTexture: () => setTexture(initialTexture)
  };
};