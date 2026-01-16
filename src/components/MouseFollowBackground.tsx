import { useEffect, useState } from 'react';

export default function MouseFollowBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Smooth interpolation for parallax
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setOffset((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [mousePos, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="w-full h-full"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          filter: 'blur(0.5px)',
        }}
      >
        {/* Animated horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${(i * 100) / 20}%`}
            x2="100%"
            y2={`${(i * 100) / 20}%`}
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            opacity="0.4"
            style={{
              animation: `lineScrollH ${20 + i * 0.5}s linear infinite`,
            }}
          />
        ))}

        {/* Animated vertical lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${(i * 100) / 15}%`}
            y1="0"
            x2={`${(i * 100) / 15}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            opacity="0.3"
            style={{
              animation: `lineScrollV ${25 + i * 0.7}s linear infinite`,
            }}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 144, 255, 0)" />
            <stop offset="50%" stopColor="rgba(30, 144, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(30, 144, 255, 0)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <style>{`
        @keyframes lineScrollH {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes lineScrollV {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
