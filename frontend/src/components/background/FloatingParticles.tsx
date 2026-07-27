import { motion } from "framer-motion";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 12 + 10,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.5 + 0.2,
  color:
    i % 3 === 0
      ? "#8B5CF6"
      : i % 3 === 1
      ? "#06B6D4"
      : "#EC4899",
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{
            x: 0,
            y: 0,
            opacity: particle.opacity,
            scale: 1,
          }}
          animate={{
            y: [-20, -120],
            x: [
              0,
              Math.random() * 40 - 20,
              Math.random() * 60 - 30,
            ],
            opacity: [
              particle.opacity,
              particle.opacity * 0.8,
              0,
            ],
            scale: [1, 1.6, 0.4],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 20px ${particle.color}`,
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  );
}