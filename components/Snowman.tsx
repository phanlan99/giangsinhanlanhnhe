'use client';

import React from 'react';

interface SnowmanProps {
    position: [number, number, number];
    scale?: number;
    rotation?: [number, number, number];
}

export default function Snowman({ position, scale = 1, rotation = [0, 0, 0] }: SnowmanProps) {
    return (
        <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
            {/* Thân dưới */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
            </mesh>

            {/* Thân giữa */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
            </mesh>

            {/* Đầu */}
            <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
            </mesh>

            {/* Mũi cà rốt */}
            <mesh position={[0, 2.2, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.05, 0.25, 16]} />
                <meshStandardMaterial color="orange" />
            </mesh>

            {/* Mắt */}
            <mesh position={[-0.1, 2.3, 0.25]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
             <mesh position={[0.1, 2.3, 0.25]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Tay */}
            <mesh position={[0.45, 1.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
                 <cylinderGeometry args={[0.02, 0.02, 0.7]} />
                 <meshStandardMaterial color="#5c4033" />
            </mesh>
            <mesh position={[-0.45, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
                 <cylinderGeometry args={[0.02, 0.02, 0.7]} />
                 <meshStandardMaterial color="#5c4033" />
            </mesh>
        </group>
    );
}