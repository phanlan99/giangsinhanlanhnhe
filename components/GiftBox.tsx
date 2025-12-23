'use client';

import React, { useState } from 'react';
import { Text, Float } from '@react-three/drei';

interface GiftBoxProps {
    position: [number, number, number];
    scale?: number;
    color?: string;
    ribbonColor?: string;
    rotation?: [number, number, number];
    message?: string;
    onInteract?: () => void; // <--- THÊM DÒNG NÀY: Hàm callback để báo ra ngoài
}

export default function GiftBox({
    position,
    scale = 1,
    color = '#d63031',
    ribbonColor = '#ffeaa7',
    rotation = [0, 0, 0],
    message,
    onInteract // <--- Nhận hàm này từ props
}: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <group 
      position={position} 
      scale={[scale, scale, scale]} 
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
        // Nếu có hàm onInteract được truyền vào, hãy gọi nó để báo ra ngoài
        if (onInteract) {
            onInteract();
        }
      }}
      onPointerOver={() => { if(message) document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
    >
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>

      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
         <boxGeometry args={[0.15, 0.82, 1.02]} />
         <meshStandardMaterial color={ribbonColor} metalness={0.3} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
         <boxGeometry args={[1.02, 0.82, 0.15]} />
         <meshStandardMaterial color={ribbonColor} metalness={0.3} roughness={0.2} />
      </mesh>

      {message && isOpen && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 2, 0]}>
            <Text
                fontSize={0.4}
                color="white"
                outlineWidth={0.02}
                outlineColor="black"
                maxWidth={3}
                textAlign="center"
                anchorY="bottom"
            >
                {message}
            </Text>
        </Float>
      )}
    </group>
  );
}