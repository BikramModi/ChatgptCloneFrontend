import { motion } from "framer-motion";

const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
  const yOffset = direction === "up" ? 80 : -80;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: yOffset }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.2 }} // <--- triggers every scroll
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
