'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingShape {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'hexagon' | 'ring' | 'diamond' | 'cross' | 'dot-grid' | 'wireframe-cube' | 'circuit-line' | 'gear' | 'pulse-ring' | 'binary-stream';
  size: number;
  top: string;
  left: string;
  opacity: number;
  color: string;
  duration: string;
  delay: string;
  rotate3d?: string;
}

const shapes: FloatingShape[] = [
  // Original shapes (enhanced)
  { id: 0, type: 'circle', size: 40, top: '8%', left: '5%', opacity: 0.06, color: '#7c4dbb', duration: '20s', delay: '0s' },
  { id: 1, type: 'square', size: 28, top: '20%', left: '92%', opacity: 0.05, color: '#5b2d9e', duration: '25s', delay: '2s' },
  { id: 2, type: 'triangle', size: 32, top: '45%', left: '3%', opacity: 0.07, color: '#f59e0b', duration: '18s', delay: '4s' },
  { id: 3, type: 'ring', size: 50, top: '15%', left: '88%', opacity: 0.04, color: '#7c4dbb', duration: '22s', delay: '1s' },
  { id: 4, type: 'circle', size: 20, top: '65%', left: '7%', opacity: 0.05, color: '#f59e0b', duration: '28s', delay: '3s' },
  { id: 5, type: 'hexagon', size: 24, top: '80%', left: '90%', opacity: 0.06, color: '#5b2d9e', duration: '24s', delay: '5s' },
  { id: 6, type: 'square', size: 18, top: '35%', left: '95%', opacity: 0.04, color: '#7c4dbb', duration: '19s', delay: '2s' },
  { id: 7, type: 'ring', size: 36, top: '70%', left: '4%', opacity: 0.05, color: '#f59e0b', duration: '23s', delay: '4s' },

  // NEW: 3D Tech shapes
  { id: 8, type: 'wireframe-cube', size: 36, top: '12%', left: '50%', opacity: 0.05, color: '#7c4dbb', duration: '30s', delay: '0s' },
  { id: 9, type: 'diamond', size: 22, top: '30%', left: '15%', opacity: 0.06, color: '#5b2d9e', duration: '22s', delay: '1.5s' },
  { id: 10, type: 'cross', size: 20, top: '55%', left: '85%', opacity: 0.05, color: '#f59e0b', duration: '26s', delay: '3s' },
  { id: 11, type: 'gear', size: 30, top: '75%', left: '20%', opacity: 0.04, color: '#7c4dbb', duration: '35s', delay: '2s' },
  { id: 12, type: 'pulse-ring', size: 60, top: '40%', left: '48%', opacity: 0.03, color: '#5b2d9e', duration: '8s', delay: '0s' },
  { id: 13, type: 'dot-grid', size: 50, top: '90%', left: '70%', opacity: 0.04, color: '#7c4dbb', duration: '20s', delay: '1s' },
  { id: 14, type: 'circuit-line', size: 80, top: '25%', left: '60%', opacity: 0.03, color: '#5b2d9e', duration: '15s', delay: '0s' },
  { id: 15, type: 'binary-stream', size: 14, top: '60%', left: '50%', opacity: 0.04, color: '#f59e0b', duration: '20s', delay: '2s' },
  { id: 16, type: 'wireframe-cube', size: 24, top: '85%', left: '45%', opacity: 0.04, color: '#f59e0b', duration: '28s', delay: '4s' },
  { id: 17, type: 'diamond', size: 16, top: '5%', left: '75%', opacity: 0.05, color: '#7c4dbb', duration: '20s', delay: '3s' },
  { id: 18, type: 'gear', size: 20, top: '50%', left: '25%', opacity: 0.03, color: '#5b2d9e', duration: '32s', delay: '1s' },
  { id: 19, type: 'pulse-ring', size: 40, top: '20%', left: '30%', opacity: 0.025, color: '#f59e0b', duration: '6s', delay: '3s' },
];

export default function PageDecorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    shapeRefs.current.forEach((el, i) => {
      if (!el) return;

      const shape = shapes[i];
      if (!shape) return;

      // Special animations for certain shape types
      if (shape.type === 'pulse-ring') {
        gsap.to(el, {
          scale: 1.8,
          opacity: 0,
          duration: parseFloat(shape.duration),
          ease: 'power1.out',
          repeat: -1,
          delay: parseFloat(shape.delay),
        });
      } else if (shape.type === 'wireframe-cube') {
        gsap.to(el, {
          rotationX: 360,
          rotationY: 180,
          duration: parseFloat(shape.duration),
          ease: 'none',
          repeat: -1,
          delay: parseFloat(shape.delay),
          force3D: true,
        });
      } else if (shape.type === 'gear') {
        gsap.to(el, {
          rotation: 360,
          duration: parseFloat(shape.duration),
          ease: 'none',
          repeat: -1,
          delay: parseFloat(shape.delay),
          force3D: true,
        });
      } else if (shape.type === 'binary-stream') {
        gsap.to(el, {
          y: -200,
          opacity: 0,
          duration: parseFloat(shape.duration),
          ease: 'none',
          repeat: -1,
          delay: parseFloat(shape.delay),
          onRepeat: function() {
            gsap.set(el, { y: 200, opacity: 0.04 });
          },
        });
      } else if (shape.type === 'circuit-line') {
        gsap.to(el, {
          opacity: 0.06,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: parseFloat(shape.delay),
        });
      } else {
        // Default floating animation for original shapes
        gsap.to(el, {
          y: `+=${12 + (i % 3) * 8}`,
          x: `+=${(i % 2 === 0 ? 1 : -1) * (5 + (i % 4) * 3)}`,
          rotation: (i % 2 === 0 ? 90 : -90),
          duration: 2.5 + i * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: parseFloat(shape.delay),
          force3D: true,
        });
      }
    });
  }, []);

  const getShapeStyle = (shape: FloatingShape): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      top: shape.top,
      left: shape.left,
      width: shape.size,
      height: shape.size,
      opacity: shape.opacity,
      pointerEvents: 'none',
    };

    switch (shape.type) {
      case 'circle':
        return { ...base, borderRadius: '50%', background: `radial-gradient(circle, ${shape.color}, ${shape.color}33)` };
      case 'square':
        return { ...base, borderRadius: '4px', background: `linear-gradient(135deg, ${shape.color}, ${shape.color}33)` };
      case 'triangle':
        return { ...base, background: `linear-gradient(135deg, ${shape.color}, ${shape.color}33)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' };
      case 'hexagon':
        return { ...base, borderRadius: '30%', background: `linear-gradient(135deg, ${shape.color}, ${shape.color}33)` };
      case 'ring':
        return { ...base, borderRadius: '50%', border: `2px solid ${shape.color}`, background: 'transparent' };
      case 'diamond':
        return { ...base, background: `linear-gradient(135deg, ${shape.color}, ${shape.color}33)`, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: 'rotate(45deg)' };
      case 'cross':
        return {
          ...base,
          background: 'transparent',
        };
      case 'gear': {
        const teeth = 8;
        const r = shape.size / 2;
        const inner = r * 0.6;
        const outer = r;
        let path = '';
        for (let t = 0; t < teeth; t++) {
          const a1 = (t / teeth) * Math.PI * 2;
          const a2 = ((t + 0.3) / teeth) * Math.PI * 2;
          const a3 = ((t + 0.5) / teeth) * Math.PI * 2;
          const a4 = ((t + 0.8) / teeth) * Math.PI * 2;
          const cx = r;
          const cy = r;
          if (t === 0) path += `M ${cx + Math.cos(a1) * inner} ${cy + Math.sin(a1) * inner} `;
          path += `L ${cx + Math.cos(a2) * outer} ${cy + Math.sin(a2) * outer} `;
          path += `L ${cx + Math.cos(a3) * outer} ${cy + Math.sin(a3) * outer} `;
          path += `L ${cx + Math.cos(a4) * inner} ${cy + Math.sin(a4) * inner} `;
        }
        path += 'Z';
        return { ...base, background: 'transparent' };
      }
      case 'pulse-ring':
        return { ...base, borderRadius: '50%', border: `1.5px solid ${shape.color}`, background: 'transparent' };
      case 'dot-grid': {
        return {
          ...base,
          background: `
            radial-gradient(circle, ${shape.color} 1px, transparent 1px),
            radial-gradient(circle, ${shape.color} 1px, transparent 1px)
          `,
          backgroundSize: `${shape.size / 4}px ${shape.size / 4}px`,
          backgroundPosition: '0 0, ' + `${shape.size / 8}px ${shape.size / 8}px`,
        };
      }
      case 'wireframe-cube':
        return {
          ...base,
          border: `1.5px solid ${shape.color}`,
          borderRadius: '4px',
          background: 'transparent',
          boxShadow: `inset 0 0 ${shape.size / 3}px ${shape.color}11`,
        };
      case 'circuit-line':
        return {
          ...base,
          background: 'transparent',
          borderTop: `1px solid ${shape.color}`,
          borderRight: `1px solid ${shape.color}`,
          borderBottom: 'none',
          borderLeft: 'none',
          borderRadius: '0',
          width: shape.size,
          height: shape.size * 0.4,
        };
      case 'binary-stream':
        return {
          ...base,
          fontFamily: 'monospace',
          fontSize: '8px',
          color: shape.color,
          lineHeight: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          whiteSpace: 'pre',
        };
      default:
        return base;
    }
  };

  const renderShape = (shape: FloatingShape) => {
    const style = getShapeStyle(shape);

    if (shape.type === 'cross') {
      return (
        <div key={shape.id} style={{ ...style, background: 'transparent', position: 'absolute', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1.5px', background: shape.color, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1.5px', background: shape.color, transform: 'translateX(-50%)' }} />
        </div>
      );
    }

    if (shape.type === 'gear') {
      const r = shape.size / 2;
      const inner = r * 0.65;
      const outer = r;
      return (
        <div key={shape.id} style={{ ...style, background: 'transparent' }}>
          <svg width={shape.size} height={shape.size} viewBox={`0 0 ${shape.size} ${shape.size}`} fill="none">
            <circle cx={r} cy={r} r={inner} stroke={shape.color} strokeWidth="1.2" fill="none" />
            <circle cx={r} cy={r} r={inner * 0.4} stroke={shape.color} strokeWidth="1" fill="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <rect
                key={deg}
                x={r - 2}
                y={0}
                width="4"
                height={r - inner + 2}
                fill={shape.color}
                transform={`rotate(${deg} ${r} ${r})`}
              />
            ))}
          </svg>
        </div>
      );
    }

    if (shape.type === 'binary-stream') {
      const binaryStr = '01001\n10110\n01101\n11010\n00111\n10010\n11101\n01010';
      return (
        <div key={shape.id} ref={(el) => { shapeRefs.current[shape.id] = el; }} style={style}>
          <span style={{ fontFamily: 'monospace', fontSize: '7px', lineHeight: '1.4', letterSpacing: '1px', color: shape.color }}>{binaryStr}</span>
        </div>
      );
    }

    if (shape.type === 'wireframe-cube') {
      const s = shape.size;
      return (
        <div key={shape.id} style={{ ...style, perspective: '200px' }}>
          <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={{ transformStyle: 'preserve-3d' }}>
            {/* Front face */}
            <rect x={s * 0.2} y={s * 0.2} width={s * 0.6} height={s * 0.6} stroke={shape.color} strokeWidth="1" fill="none" rx="2" />
            {/* Back face offset */}
            <rect x={s * 0.35} y={s * 0.15} width={s * 0.6} height={s * 0.6} stroke={shape.color} strokeWidth="0.6" fill="none" rx="2" opacity="0.4" />
            {/* Connecting lines */}
            <line x1={s * 0.2} y1={s * 0.2} x2={s * 0.35} y2={s * 0.15} stroke={shape.color} strokeWidth="0.5" opacity="0.3" />
            <line x1={s * 0.8} y1={s * 0.2} x2={s * 0.95} y2={s * 0.15} stroke={shape.color} strokeWidth="0.5" opacity="0.3" />
            <line x1={s * 0.2} y1={s * 0.8} x2={s * 0.35} y2={s * 0.75} stroke={shape.color} strokeWidth="0.5" opacity="0.3" />
            <line x1={s * 0.8} y1={s * 0.8} x2={s * 0.95} y2={s * 0.75} stroke={shape.color} strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>
      );
    }

    if (shape.type === 'circuit-line') {
      return (
        <div key={shape.id} style={{ ...style, background: 'transparent' }}>
          <svg width={shape.size} height={shape.size * 0.4} viewBox={`0 0 ${shape.size} ${shape.size * 0.4}`} fill="none">
            <polyline
              points={`0,${shape.size * 0.2} ${shape.size * 0.3},${shape.size * 0.2} ${shape.size * 0.3},${shape.size * 0.05} ${shape.size * 0.6},${shape.size * 0.05} ${shape.size * 0.6},${shape.size * 0.35} ${shape.size},${shape.size * 0.35}`}
              stroke={shape.color}
              strokeWidth="1"
              fill="none"
            />
            {/* Node dots */}
            <circle cx={shape.size * 0.3} cy={shape.size * 0.2} r="2" fill={shape.color} opacity="0.5" />
            <circle cx={shape.size * 0.6} cy={shape.size * 0.05} r="2" fill={shape.color} opacity="0.5" />
          </svg>
        </div>
      );
    }

    return (
      <div
        key={shape.id}
        ref={(el) => { shapeRefs.current[shape.id] = el; }}
        style={style}
      />
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {shapes.map(renderShape)}
    </div>
  );
}
