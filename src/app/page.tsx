'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Float, Text } from '@react-three/drei';

// Import các component
import ChristmasTree from '../../components/ChristmasTree';
import Snowman from '../../components/Snowman';
import FloatingPhoto from '../../components/FloatingPhoto';
import GiftBox from '../../components/GiftBox';
import FloatingText from '../../components/FloatingText';
import ArrowPointer from '../../components/ArrowPointer';
import SantaClaus from '../../components/SantaClaus'; // <--- IMPORT MỚI

export default function ChristmasPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // --- STATE QUẢN LÝ MŨI TÊN ---
  const [showArrow1, setShowArrow1] = useState(true); 
  const [showArrow2, setShowArrow2] = useState(true); 

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
        if (audioRef.current && !isPlaying) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.log("Autoplay blocked"));
        }
        window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050b14', position: 'relative' }}>
      
      {/* Âm thanh & Nút bấm */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      <div 
        onClick={toggleMusic}
        style={{
            position: 'absolute', top: '20px', left: '20px', zIndex: 10, cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.1)', padding: '10px 20px', borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white', fontFamily: 'sans-serif',
            backdropFilter: 'blur(5px)', userSelect: 'none'
        }}
      >
        {isPlaying ? '🔊 Đang phát nhạc' : '🔇 Bật nhạc Giáng sinh'}
      </div>

      <Canvas shadows camera={{ position: [0, 3, 12], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-5, 8, 5]} angle={0.4} intensity={1.5} color="#ffddaa" castShadow />

        {/* --- KHU RỪNG CÂY THÔNG --- */}
        <ChristmasTree position={[0, -2, 0]} scale={1} />
        <ChristmasTree position={[-5, -2, -2]} scale={0.7} />
        <ChristmasTree position={[5, -2, -2]} scale={0.7} />
        <ChristmasTree position={[0, -3, -5]} scale={1.5} />
        <ChristmasTree position={[8, -3, -5]} scale={1.5} />
        <ChristmasTree position={[-8, -3, -5]} scale={1.5} />

        {/* --- ÔNG GIÀ NOEL (MỚI THÊM) --- */}
        {/* Đặt vị trí y=-2.5 để đứng trên mặt sàn, hơi chếch về bên phải (x=2) và phía trước (z=1) */}
        <SantaClaus position={[2, -2.5, 1]} scale={1.1} rotation={[0, -Math.PI / 6, 0]} />


        {/* CÁC DÒNG CHỮ BAY */}
        <FloatingText text="Bình an" position={[-10, 6, -5]} rotation={[0, Math.PI / 6, 0]} color="#ffeb3b" size={0.25} />
        <FloatingText text="Mạnh khẻo" position={[8, 7, -5]} rotation={[0, -Math.PI / 6, 0]} color="#2ecc71" size={0.6} />
        <FloatingText text="Zui zẻ" position={[-12, 2, -8]} rotation={[0, Math.PI / 4, Math.PI / 12]} color="#e74c3c" size={0.5} />
        <FloatingText text="Dáng xinh an lành" position={[12, 3, -8]} rotation={[0, -Math.PI / 4, -Math.PI / 12]} color="#ffffff" size={0.45} />

        {/* --- NHỮNG HỘP QUÀ THƯỜNG --- */}
        <GiftBox position={[0.8, -2.5, 0.5]} scale={0.6} color="#d63031" ribbonColor="#fdcb6e" rotation={[0, 0.5, 0]} />
        <GiftBox position={[-0.7, -2.5, 0.8]} scale={0.5} color="#0984e3" ribbonColor="#ffffff" rotation={[0, -0.3, 0]} />
        <GiftBox position={[-2, -2.5, 1]} scale={0.7} color="#6c5ce7" ribbonColor="#55efc4" rotation={[0, 0.8, 0]} />
        <GiftBox position={[-4.5, -2.5, -1.5]} scale={0.5} color="#e17055" ribbonColor="#ffeaa7" />
        <GiftBox position={[4, -2.5, -1.5]} scale={0.6} color="#00b894" ribbonColor="#d63031" rotation={[0, 1, 0]} />
        <GiftBox position={[1, -3, -4]} scale={0.8} color="#fd9644" ribbonColor="#2d3436" rotation={[0, 2, 0]} />
        <GiftBox position={[0, -2, -4]} scale={0.8} color="#fd9644" ribbonColor="#2d3436" rotation={[0, 2, 0]} />
        <GiftBox position={[0, -2, 0]} scale={0.8} color="#e17055" ribbonColor="#2d3436" rotation={[0, 2, 0]} />
        
        {/* --- HỘP QUÀ ĐẶC BIỆT 1 (BÊN PHẢI) --- */}
        <GiftBox 
            position={[6, -2.5, 0.5]} 
            scale={0.6} 
            color="#d63031" 
            ribbonColor="#fdcb6e" 
            rotation={[0, 0.5, 0]} 
            message="Không có quà bởi vì bạn đã là món quà =))))"
            onInteract={() => setShowArrow1(false)} 
        />
        {showArrow1 && (
            <ArrowPointer position={[6, -0.7, 0.5]} color="yellow" />
        )}

        {/* --- HỘP QUÀ ĐẶC BIỆT 2 (BÊN TRÁI - I LOVE YOU 3000) --- */}
        <GiftBox 
            position={[-6, -2.5, 0.5]} 
            scale={0.8} 
            color="#00b894" 
            ribbonColor="#ffeaa7" 
            rotation={[0, 0.5, 0]} 
            message="I love you 3000!" 
            onInteract={() => setShowArrow2(false)} 
        />
        {showArrow2 && (
            <ArrowPointer position={[-6, -0.7, 0.5]} color="#fd79a8" />
        )}


        {/* --- NGƯỜI TUYẾT --- */}
        <Snowman position={[-3, -2.8, 1.5]} scale={1} rotation={[0, Math.PI / 6, 0]} />
        <Snowman position={[2.5, -2.2, -1]} scale={0.7} rotation={[0, -Math.PI / 4, 0]} />
        
        {/* --- BỘ SƯU TẬP ẢNH --- */}
        <FloatingPhoto url="/anh1.jpg" position={[-8, 2, 0]} rotation={[0, Math.PI / 8, Math.PI / 12]} scale={1} />
        <FloatingPhoto url="/anh2.jpg" position={[6, 8, -2]} rotation={[0, -Math.PI / 6, -Math.PI / 12]} scale={1.2} />
        <FloatingPhoto url="/anh3.jpg" position={[0, 4, -20]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh4.jpg" position={[-8, 8, -10]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh5.jpg" position={[0, 7, -15]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh6.jpg" position={[8, 5, -20]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh7.jpg" position={[0, 7, 2]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh8.jpg" position={[-7, 6, -2]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh9.jpg" position={[10, 5, -2]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />
        <FloatingPhoto url="/anh10.jpg" position={[0, 5, -2]} rotation={[Math.PI / 12, 0, 0]} scale={0.8} />

        {/* Hiệu ứng môi trường */}
        <Sparkles count={500} scale={[12, 12, 12]} size={4} speed={0.4} opacity={0.8} color="#ffffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Chữ Chúc Mừng */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text position={[0, -1.8, 2]} fontSize={0.6} color="#ff4d4d" anchorX="center" anchorY="middle">
                Merry Christmas!
            </Text>
            <Text position={[0, -2.4, 2]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
                Giáng sinh vui vẻ
            </Text>
        </Float>

        <OrbitControls 
            enableZoom={true}      // Bật tính năng zoom (lăn chuột hoặc vuốt 2 ngón tay)
            minDistance={5}        // Zoom gần nhất là 5 (để không chui tọt vào trong cây thông)
            maxDistance={25}       // Zoom xa nhất là 25 (để không bay ra khỏi vũ trụ)
            autoRotate 
            autoRotateSpeed={0.5} 
            minPolarAngle={Math.PI/4} 
            maxPolarAngle={Math.PI/2 + 0.2} 
        />
      </Canvas>
    </div>
  );
}