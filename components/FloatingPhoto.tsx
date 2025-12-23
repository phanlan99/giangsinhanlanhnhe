'use client';

import React from 'react';
import { Float, Image } from '@react-three/drei';

// Định nghĩa các tham số đầu vào cho bức ảnh
interface FloatingPhotoProps {
    url: string; // Đường dẫn ảnh (bắt buộc)
    position: [number, number, number];
    rotation?: [number, number, number]; // Góc nghiêng
    scale?: number; // Độ to nhỏ
}

export default function FloatingPhoto({ url, position, rotation = [0, 0, 0], scale = 1 }: FloatingPhotoProps) {
  return (
    // Sử dụng Float để tạo hiệu ứng bay lơ lửng nhẹ nhàng
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
      <group rotation={rotation} scale={scale}>
        
        {/* 1. Phần Viền Khung Ảnh (Tạo bằng một hình hộp mỏng màu trắng) */}
        <mesh position={[0, 0, -0.02]}> {/* Đặt lùi về sau một chút (z=-0.02) */}
            {/* Kích thước viền: Rộng 2.2, Cao 3.2 (tỷ lệ ảnh dọc), Dày 0.05 */}
            <boxGeometry args={[2.2, 3.2, 0.05]} />
            <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
        </mesh>

        {/* 2. Phần Ảnh Chính (Sử dụng component Image của Drei) */}
        {/* scale={[2, 3]} quy định tỷ lệ khung hình là 2:3 (ảnh dọc) */}
        <Image 
            url={url} 
            scale={[2, 3]} 
            position={[0, 0, 0.01]} // Đặt nhích lên trước viền một chút
            transparent
            opacity={1}
            side={2} // Hiển thị cả 2 mặt trước sau
        />
      </group>
    </Float>
  );
}