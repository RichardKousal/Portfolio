"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";

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
  const [isVisible, setIsVisible] = useState(true);
  const [key, setKey] = useState(Math.random());
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {};
  }, [pathname, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay || 0);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !animationTriggered) {
        setIsVisible(true);
        setKey(Math.random());
        setAnimationTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationTriggered]);
  return (
    <motion.div
      key={key}
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
