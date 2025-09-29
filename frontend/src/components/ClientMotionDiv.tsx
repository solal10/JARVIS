"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface ClientMotionDivProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
  whileHover?: any;
}

export default function ClientMotionDiv({
  children,
  className,
  initial,
  whileInView,
  transition,
  viewport,
  whileHover
}: ClientMotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
}