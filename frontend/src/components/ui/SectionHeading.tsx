import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  gradient: string;
  description: string;
}

export default function SectionHeading({
  badge,
  title,
  gradient,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mx-auto mb-20 max-w-3xl text-center"
    >
      {badge && (
        <div className="mb-6 inline-flex rounded-md border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          {badge}
        </div>
      )}

      <h2 className="text-4xl font-black text-white md:text-5xl">
        {title}

        <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          {gradient}
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}