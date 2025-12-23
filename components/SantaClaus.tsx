'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SantaProps {
    position: [number, number, number];
    scale?: number;
    rotation?: [number, number, number];
}

export default function SantaClaus({ position, scale = 1, rotation = [0, 0, 0] }: SantaProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Màu sắc chủ đạo
  const redColor = "#c0392b";
  const whiteColor = "#ecf0f1";
  const skinColor = "#f1c27d";
  const beltColor = "#2c3e50";

  // Tạo hiệu ứng lắc lư nhẹ cho sinh động
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(groupRef.current) {
        // Lắc qua lắc lại nhẹ nhàng
        groupRef.current.rotation.z = Math.sin(t * 3) * 0.05; 
        // Nhún nhảy nhẹ lên xuống
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 3) * 0.05);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]} rotation={rotation}>
      
      {/* 1. THÂN (Hình cầu lớn màu đỏ) */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={redColor} roughness={0.5} />
      </mesh>

      {/* 2. THẮT LƯNG (Hình vòng xuyến màu đen) */}
       <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        {/* torusGeometry args: [bán kính, độ dày ống, số đoạn tròn, số đoạn ống] */}
        <torusGeometry args={[0.82, 0.08, 16, 100]} />
        <meshStandardMaterial color={beltColor} roughness={0.5} />
      </mesh>

      {/* 3. ĐẦU (Hình cầu màu da) */}
      <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>

      {/* 4. BỘ RÂU (Tổ hợp các hình cầu nhỏ màu trắng) */}
      <group position={[0, 1.5, 0.35]}>
         {/* Râu chính giữa */}
         <mesh position={[0, 0, 0]}> <sphereGeometry args={[0.2, 16, 16]} /> <meshStandardMaterial color={whiteColor} /> </mesh>
         {/* Râu bên trái */}
         <mesh position={[-0.15, 0.1, -0.05]}> <sphereGeometry args={[0.15, 16, 16]} /> <meshStandardMaterial color={whiteColor} /> </mesh>
         {/* Râu bên phải */}
         <mesh position={[0.15, 0.1, -0.05]}> <sphereGeometry args={[0.15, 16, 16]} /> <meshStandardMaterial color={whiteColor} /> </mesh>
      </group>

      {/* 5. MẮT & MŨI */}
      <mesh position={[-0.12, 1.8, 0.35]}> <sphereGeometry args={[0.04, 16, 16]} /> <meshStandardMaterial color="black" /> </mesh>
      <mesh position={[0.12, 1.8, 0.35]}> <sphereGeometry args={[0.04, 16, 16]} /> <meshStandardMaterial color="black" /> </mesh>
      <mesh position={[0, 1.7, 0.4]}> <sphereGeometry args={[0.05, 16, 16]} /> <meshStandardMaterial color="#e74c3c" /> </mesh>


      {/* 6. MŨ GIÁNG SINH */}
      {/* Nhóm mũ, xoay nghiêng ra sau một chút */}
      <group position={[0, 2, 0]} rotation={[-Math.PI / 12, 0, 0]}> 
          {/* Vành mũ (Màu trắng) */}
          <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.4, 0.1, 16, 100]} />
              <meshStandardMaterial color={whiteColor} />
          </mesh>
          {/* Chóp mũ (Hình nón đỏ) */}
          <mesh position={[0, 0.5, 0]}>
              <coneGeometry args={[0.38, 1, 32]} />
              <meshStandardMaterial color={redColor} />
          </mesh>
           {/* Cục bông trên đỉnh mũ (Hình cầu trắng) */}
           <mesh position={[0, 1, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color={whiteColor} />
          </mesh>
      </group>

    </group>
  );
}