import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const particles = particlesRef?.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const particleCount = Math.min(50, Math.floor((canvas?.width * canvas?.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    initParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e?.clientX;
      mouseRef.current.y = e?.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      particles?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Mouse interaction
        const dx = mouseRef?.current?.x - particle?.x;
        const dy = mouseRef?.current?.y - particle?.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        // Boundary check
        if (particle?.x < 0 || particle?.x > canvas?.width) particle.vx *= -1;
        if (particle?.y < 0 || particle?.y > canvas?.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas?.width, particle?.x));
        particle.y = Math.max(0, Math.min(canvas?.height, particle?.y));

        // Pulse effect
        particle.opacity += Math.sin(Date.now() * particle?.pulseSpeed) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.7, particle?.opacity));

        // Draw particle
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${particle?.opacity})`;
        ctx?.fill();

        // Draw connections
        particles?.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle?.x - otherParticle?.x;
            const dy = particle?.y - otherParticle?.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx?.beginPath();
              ctx?.moveTo(particle?.x, particle?.y);
              ctx?.lineTo(otherParticle?.x, otherParticle?.y);
              ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.5;
              ctx?.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
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

export default ParticleBackground;