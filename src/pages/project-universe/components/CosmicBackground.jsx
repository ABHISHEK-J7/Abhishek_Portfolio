import React, { useEffect, useRef } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? '#0066FF' : '#00FF88'
        });
      }
      return particles;
    };

    const drawParticle = (particle) => {
      ctx?.save();
      ctx.globalAlpha = particle?.opacity;
      ctx.fillStyle = particle?.color;
      ctx?.beginPath();
      ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
      ctx?.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle?.color;
      ctx?.fill();
      ctx?.restore();
    };

    const updateParticle = (particle) => {
      particle.x += particle?.speedX;
      particle.y += particle?.speedY;

      // Wrap around edges
      if (particle?.x < 0) particle.x = canvas?.width;
      if (particle?.x > canvas?.width) particle.x = 0;
      if (particle?.y < 0) particle.y = canvas?.height;
      if (particle?.y > canvas?.height) particle.y = 0;

      // Subtle opacity animation
      particle.opacity += Math.sin(Date.now() * 0.001 + particle?.x * 0.01) * 0.01;
      particle.opacity = Math.max(0.1, Math.min(0.7, particle?.opacity));
    };

    const drawConnections = (particles) => {
      ctx.strokeStyle = 'rgba(0, 102, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles?.length; i++) {
        for (let j = i + 1; j < particles?.length; j++) {
          const dx = particles?.[i]?.x - particles?.[j]?.x;
          const dy = particles?.[i]?.y - particles?.[j]?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.globalAlpha = (150 - distance) / 150 * 0.2;
            ctx?.beginPath();
            ctx?.moveTo(particles?.[i]?.x, particles?.[i]?.y);
            ctx?.lineTo(particles?.[j]?.x, particles?.[j]?.y);
            ctx?.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw connections first (behind particles)
      drawConnections(particlesRef?.current);

      // Update and draw particles
      particlesRef?.current?.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    particlesRef.current = createParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      particlesRef.current = createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default CosmicBackground;