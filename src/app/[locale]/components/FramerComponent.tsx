"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  animationProps: {
    variants: {
      hidden: { [key: string]: any };
      visible: { [key: string]: any };
    };
    transition: { [key: string]: any };
    delay?: number;
  };
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  animationProps,
}) => {
  const { variants, transition, delay } = animationProps || {};
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay || 0);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="hidden"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedHeading;
