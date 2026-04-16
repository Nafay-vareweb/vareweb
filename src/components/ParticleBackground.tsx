'use client';

import React from 'react';

const DEFAULT_OPACITY = { min: 0.15, max: 0.35 };

interface ParticleBackgroundProps {
  /** Number of particles (default: 50) */
  count?: number;
  /** CSS class for the canvas container */
  className?: string;
  /** z-index for the canvas (default: 0) */
  zIndex?: number;
  /** Particle opacity range (default: 0.15-0.35) */
  opacity?: { min: number; max: number };
  /** Whether particles connect with lines (default: true) */
  connectLines?: boolean;
  /** Connection distance in px (default: 100) */
  connectionDistance?: number;
  /** Enable mouse interaction (default: false) */
  interactive?: boolean;
  /** Background color for particles (default: matches dark purple theme) */
  theme?: 'dark' | 'light';
}

export default function ParticleBackground({
  count = 70,
  className = '',
  zIndex = 0,
  opacity = DEFAULT_OPACITY,
  connectLines = true,
  connectionDistance = 100,
  interactive = true,
  theme = 'dark',
}: ParticleBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isDark = theme === 'dark';
    const colors = isDark
      ? ['rgba(255,255,255,', 'rgba(124,77,187,', 'rgba(245,158,11,']
      : ['rgba(58,26,112,', 'rgba(124,77,187,', 'rgba(139,92,246,'];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      baseSpeedX: number;
      baseSpeedY: number;
    }

    const particles: Particle[] = Array.from({ length: count }, () => {
      const speedX = (Math.random() - 0.5) * 0.4;
      const speedY = -(0.15 + Math.random() * 0.4);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2.5,
        speedX,
        speedY,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: opacity.min + Math.random() * (opacity.max - opacity.min),
        baseSpeedX: speedX,
        baseSpeedY: speedY,
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;
    // Force-disable interactive mouse behavior for static particles.
    const interactiveEnabled = false;
    const mouseRadius = 0;
    const repelForce = 2.5;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveEnabled) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    // Burst particles feature
    interface BurstParticle {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      size: number;
      color: string;
      opacity: number;
      life: number;
      maxLife: number;
    }
    const burstParticles: BurstParticle[] = [];

    const handleClick = (e: MouseEvent) => {
      if (!interactiveEnabled) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const burstColors = isDark 
        ? ['rgba(255,255,255,', 'rgba(124,77,187,', 'rgba(245,158,11,', 'rgba(139,92,246,']
        : ['rgba(58,26,112,', 'rgba(124,77,187,', 'rgba(91,45,158,', 'rgba(139,92,246,'];
        
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3;
        const speed = 2 + Math.random() * 4;
        burstParticles.push({
          x: clickX,
          y: clickY,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          color: burstColors[Math.floor(Math.random() * burstColors.length)],
          opacity: 0.8 + Math.random() * 0.2,
          life: 1,
          maxLife: 40 + Math.random() * 20,
        });
      }
    };

    if (interactiveEnabled) {
      const parent = canvas.parentElement;
      if (parent) {
        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseleave', handleMouseLeave);
        parent.addEventListener('click', handleClick);
      }
    }

    let animId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        // Mouse repulsion is disabled for static behavior.
        if (interactiveEnabled && mouseRadius > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (mouseRadius - dist) / mouseRadius * repelForce;
            p.speedX = p.baseSpeedX + (dx / dist) * force;
            p.speedY = p.baseSpeedY + (dy / dist) * force;
          } else {
            p.speedX += (p.baseSpeedX - p.speedX) * 0.05;
            p.speedY += (p.baseSpeedY - p.speedY) * 0.05;
          }
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      if (connectLines) {
        const lineColor = isDark ? 'rgba(255,255,255,' : 'rgba(58,26,112,';
        const distLimit = connectionDistance || 120;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < distLimit) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `${lineColor}${0.06 * (1 - dist / distLimit)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.speedX;
        bp.y += bp.speedY;
        bp.speedX *= 0.96; // friction
        bp.speedY *= 0.96;
        bp.life--;
        bp.opacity = Math.max(0, (bp.life / bp.maxLife) * 0.8);

        if (bp.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        ctx.fillStyle = `${bp.color}${bp.opacity})`;
        ctx.fill();

        // Glow effect for burst particles
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${bp.color}${bp.opacity * 0.15})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (interactiveEnabled) {
        const parent = canvas.parentElement;
        if (parent) {
          parent.removeEventListener('mousemove', handleMouseMove);
          parent.removeEventListener('mouseleave', handleMouseLeave);
          parent.removeEventListener('click', handleClick);
        }
      }
    };
  }, [count, opacity.min, opacity.max, connectLines, connectionDistance, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    />
  );
}
