'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Component phụ: Tầng lá
interface TreeLayerProps {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}

function TreeLayer({ position, scale, color }: TreeLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(meshRef.current) {
        // Hiệu ứng xoay lá cây
        meshRef.current.rotation.y = Math.sin(t / 2 + position[1]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[1, 1.5, 8]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

// Component chính: Cây thông
interface ChristmasTreeProps {
    position: [number, number, number];
    scale?: number;
}

export default function ChristmasTree({ position, scale = 1 }: ChristmasTreeProps) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
      <group scale={[scale, scale, scale]}>
        {/* Thân cây */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.4, 1.5]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        
        {/* Các tầng lá */}
        <TreeLayer position={[0, 1.5, 0]} scale={[1.8, 1.2, 1.8]} color="#0f5f34" />
        <TreeLayer position={[0, 2.5, 0]} scale={[1.4, 1.2, 1.4]} color="#157a46" />
        <TreeLayer position={[0, 3.4, 0]} scale={[1.0, 1.2, 1.0]} color="#1e9959" />


        

        {/* Ngôi sao */}
        <mesh position={[0, 4.2, 0]}>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}