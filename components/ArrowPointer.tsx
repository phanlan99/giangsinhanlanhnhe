'use client';

import React from 'react';
import { Float } from '@react-three/drei';

interface ArrowPointerProps {
    position: [number, number, number]; // Vị trí đặt mũi tên
    color?: string; // Màu sắc
}

export default function ArrowPointer({ position, color = '#ffeb3b' }: ArrowPointerProps) { // Mặc định màu vàng sáng
  return (
    // Dùng Float để mũi tên nhấp nhô lên xuống
    // speed: tốc độ nhấp nhô
    // floatIntensity: độ mạnh của chuyển động lơ lửng
    // floatingRange: giới hạn phạm vi di chuyển lên xuống (ở đây là từ 0 đến 0.3 đơn vị)
    <Float speed={3} floatIntensity={1} floatingRange={[0, 0.3]} position={position}>
      {/* Group chứa cả mũi tên, xoay 180 độ trục X (Math.PI) để nó chỉ đầu xuống đất */}
      <group rotation={[Math.PI, 0, 0]}>
        
        {/* 1. Thân mũi tên (Hình trụ) */}
        {/* position y=0.4 để đẩy nó lên cao một chút so với tâm group */}
        <mesh position={[0, 0.4, 0]} castShadow>
          {/* args: [bán kính trên, bán kính dưới, chiều cao, số cạnh] */}
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          {/* emissive giúp nó tự phát sáng nhẹ trong đêm */}
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>

        {/* 2. Đầu mũi tên (Hình nón) */}
        {/* position y=1 để đặt nó ngay trên đỉnh của thân hình trụ */}
        <mesh position={[0, 1, 0]} castShadow>
          {/* args: [bán kính đáy, chiều cao, số cạnh] */}
          <coneGeometry args={[0.2, 0.4, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>

      </group>
    </Float>
  );
}