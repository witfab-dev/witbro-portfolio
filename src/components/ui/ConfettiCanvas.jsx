import React, { useEffect, useRef } from 'react';

const ConfettiCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const confettiRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Confetti colors
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

    // Create confetti pieces
    const createConfetti = (count = 150) => {
      const confetti = [];
      
      for (let i = 0; i < count; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 10 + 5,
          d: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 10,
          tiltAngleIncrement: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
          type: Math.floor(Math.random() * 3),
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 5 - 2.5
        });
      }
      
      return confetti;
    };

    // Draw confetti piece
    const drawConfettiPiece = (piece) => {
      ctx.beginPath();
      
      if (piece.type === 0) {
        // Circle
        ctx.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2);
        ctx.fillStyle = piece.color;
        ctx.fill();
      } else if (piece.type === 1) {
        // Square
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.r, -piece.r, piece.r * 2, piece.r * 2);
        ctx.restore();
      } else {
        // Triangle
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, -piece.r);
        ctx.lineTo(piece.r, piece.r);
        ctx.lineTo(-piece.r, piece.r);
        ctx.closePath();
        ctx.fillStyle = piece.color;
        ctx.fill();
        ctx.restore();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confettiRef.current.forEach((piece, i) => {
        // Update position
        piece.y += (Math.cos(piece.d) + 3 + piece.r / 2) / 2;
        piece.tiltAngle += piece.tiltAngleIncrement;
        piece.tilt = Math.sin(piece.tiltAngle) * 15;
        piece.rotation += piece.rotationSpeed;
        
        // Draw
        drawConfettiPiece(piece);
        
        // Reset if off screen
        if (piece.y > canvas.height) {
          confettiRef.current[i] = {
            ...piece,
            x: Math.random() * canvas.width,
            y: -20,
            r: piece.r,
            d: piece.d
          };
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    confettiRef.current = createConfetti();
    animate();

    // Trigger confetti on custom event
    const triggerConfetti = () => {
      confettiRef.current = createConfetti(200);
    };

    window.addEventListener('trigger-confetti', triggerConfetti);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('trigger-confetti', triggerConfetti);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default ConfettiCanvas;