import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    originalX?: number;
    originalY?: number;
}

interface ParticlesBackgroundProps {
    color?: string | string[];
    quantity?: number;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    interactive?: boolean;
    className?: string;
    density?: number;
}

export default function ParticlesBackground({
    color = '#4f46e5',
    quantity = 500,
    minSize = 1,
    maxSize = 5,
    speed = 0.5,
    interactive = true,
    className = '',
    density = 1,
}: ParticlesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number | null>(null);
    const mousePosition = useRef<{ x: number; y: number } | null>(null);

    // Initialize particles
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            if (!canvasRef.current || !ctx) return;

            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            // Calculate number of particles based on canvas size and density
            const area = canvas.width * canvas.height;
            const calculatedQuantity = Math.max(quantity, Math.floor((area / 5000) * density));

            // Create particles only when dimensions change
            particles.current = Array.from({ length: calculatedQuantity }, () => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const particleColor = Array.isArray(color) ? color[Math.floor(Math.random() * color.length)] : color;

                return {
                    x,
                    y,
                    originalX: x,
                    originalY: y,
                    size: Math.random() * (maxSize - minSize) + minSize,
                    speedX: (Math.random() - 0.5) * speed,
                    speedY: (Math.random() - 0.5) * speed,
                    color: particleColor,
                };
            });
        };

        // Set canvas dimensions initially
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [color, quantity, minSize, maxSize, speed, density]);

    // Mouse interaction
    useEffect(() => {
        if (!interactive || !canvasRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            mousePosition.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mousePosition.current = null;
        };

        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [interactive]);

    // Animation loop
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            if (!canvasRef.current || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((particle) => {
                // Check for mouse interaction
                if (interactive && mousePosition.current) {
                    const dx = mousePosition.current.x - particle.x;
                    const dy = mousePosition.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Push particles away from mouse within a certain radius
                    if (distance < 80) {
                        const angle = Math.atan2(dy, dx);
                        const force = (80 - distance) / 80; // Stronger when closer

                        particle.x -= Math.cos(angle) * force * 2;
                        particle.y -= Math.sin(angle) * force * 2;
                    } else if (particle.originalX && particle.originalY) {
                        // Gradually return to original position when not influenced by mouse
                        particle.x += (particle.originalX - particle.x) * 0.01;
                        particle.y += (particle.originalY - particle.y) * 0.01;
                    }
                }

                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Bounce off walls
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX *= -1;
                }

                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY *= -1;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = 0.7;
                ctx.fill();
            });

            // Connect particles with lines if they're close
            particles.current.forEach((particleA, i) => {
                particles.current.slice(i + 1).forEach((particleB) => {
                    const dx = particleA.x - particleB.x;
                    const dy = particleA.y - particleB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = particleA.color;
                        ctx.globalAlpha = 0.2 * (1 - distance / 100);
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particleA.x, particleA.y);
                        ctx.lineTo(particleB.x, particleB.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [interactive]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-0 h-full w-full ${className}`}
            style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        />
    );
}
