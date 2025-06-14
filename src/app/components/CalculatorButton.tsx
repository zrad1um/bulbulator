"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface CalculatorButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "number" | "operator" | "equals" | "clear";
  className?: string;
  disabled?: boolean;
}

const buttonVariants: Variants = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.08 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.1 }
  }
};

const baseClasses = "text-xl font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2";

const variantClasses = {
  number: "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white",
  operator: "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white",
  equals: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300",
  clear: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300"
};

export default function CalculatorButton({
  children,
  onClick,
  variant = "number",
  className = "",
  disabled = false
}: CalculatorButtonProps) {
  return (
    <motion.button
      variants={buttonVariants}
      whileTap="tap"
      whileHover="hover"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
        ${className}
        p-4
      `}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </motion.button>
  );
}