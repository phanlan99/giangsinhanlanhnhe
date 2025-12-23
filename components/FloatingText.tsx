'use client';

import React from 'react';
import { Float, Text } from '@react-three/drei';

interface FloatingTextProps {
    text: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    size?: number;
}

export default function FloatingText({ 
    text, 
    position, 
    rotation = [0, 0, 0], 
    color = '#ff4d4d', 
    size = 1 
}: FloatingTextProps) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <group rotation={rotation}>
        <Text
            fontSize={size}
            color={color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02} // Thêm viền chữ cho dễ đọc
            outlineColor="#000000"
        >
            {text}
        </Text>
      </group>
    </Float>
  );
}