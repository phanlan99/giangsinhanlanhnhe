'use client';

import React, { useRef } from 'react'; // Bỏ useState vì không dùng
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three'; // Import để lấy kiểu dữ liệu THREE.Mesh

// Định nghĩa kiểu dữ liệu cho props của TreeLayer
interface TreeLayerProps {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}

// 1. Component tạo từng tầng lá của cây thông
function TreeLayer({ position, scale, color }: TreeLayerProps) {
  // Báo cho TypeScript biết ref này sẽ gắn vào một Mesh
  const meshRef = useRef<THREE.Mesh>(null);

  // Hiệu ứng xoay nhẹ cho sinh động
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Kiểm tra meshRef.current có tồn tại không trước khi dùng
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[1, 1.5, 8]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

// 2. Component Cây Thông hoàn chỉnh
function ChristmasTree() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, -1.5, 0]}>
        {/* Thân cây */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.4, 1.5]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>

        {/* Các tán lá */}
        <TreeLayer position={[0, 1.5, 0]} scale={[1.8, 1.2, 1.8]} color="#0f5f34" />
        <TreeLayer position={[0, 2.5, 0]} scale={[1.4, 1.2, 1.4]} color="#157a46" />
        <TreeLayer position={[0, 3.4, 0]} scale={[1.0, 1.2, 1.0]} color="#1e9959" />

        {/* Ngôi sao trên đỉnh */}
        <mesh position={[0, 4.2, 0]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Trang chính
export default function ChristmasPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050b14' }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
        {/* Ánh sáng */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.3} intensity={2} color="red" />
        <spotLight position={[10, 10, -10]} angle={0.3} intensity={2} color="green" />

        {/* Cây thông */}
        <ChristmasTree />

        {/* Hiệu ứng Tuyết rơi (Sparkles) */}
        <Sparkles
          count={500}
          scale={[10, 10, 10]}
          size={4}
          speed={0.4}
          opacity={0.8}
          color="#ffffff"
        />

        {/* Bầu trời sao */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Chữ 3D */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, -1.8, 2]}  // Sửa từ -2.5 thành -1.8 để đưa chữ lên cao hơn
            fontSize={0.6}           // Sửa từ 0.8 thành 0.6 để chữ nhỏ lại
            color="#ff4d4d"
            anchorX="center"
            anchorY="middle"
          >
            Merry Christmas!
          </Text>
        </Float>

        {/* Cho phép xoay camera */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}