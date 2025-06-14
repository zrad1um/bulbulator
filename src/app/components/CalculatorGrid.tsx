"use client";

import CalculatorButton from "./CalculatorButton";
import { motion } from "framer-motion";

type ButtonType = "number" | "operator" | "equals" | "clear";

interface ButtonConfig {
  value: string;
  type: ButtonType;
  span?: number;
}

const buttonConfigs: ButtonConfig[] = [
  { value: "C", type: "clear" },
  { value: "±", type: "operator" },
  { value: "%", type: "operator" },
  { value: "÷", type: "operator" },
  { value: "7", type: "number" },
  { value: "8", type: "number" },
  { value: "9", type: "number" },
  { value: "×", type: "operator" },
  { value: "4", type: "number" },
  { value: "5", type: "number" },
  { value: "6", type: "number" },
  { value: "-", type: "operator" },
  { value: "1", type: "number" },
  { value: "2", type: "number" },
  { value: "3", type: "number" },
  { value: "+", type: "operator" },
  { value: "0", type: "number", span: 2 },
  { value: ".", type: "number" },
  { value: "=", type: "equals" },
];

interface CalculatorGridProps {
  onButtonClick: (value: string) => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function CalculatorGrid({
  onButtonClick,
  className = "",
}: CalculatorGridProps) {
  return (
    <motion.div
      className={`grid grid-cols-4 gap-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {buttonConfigs.map((button) => (
        <motion.div
          key={button.value}
          variants={itemVariants}
          className={button.span === 2 ? "col-span-2" : ""}
        >
          <CalculatorButton
            variant={button.type}
            onClick={() => onButtonClick(button.value)}
            className={`${button.value === "0" ? "text-left pl-6" : ""} ${
              button.type === "equals" ? "h-full" : ""
            }`}
          >
            {button.value}
          </CalculatorButton>
        </motion.div>
      ))}
    </motion.div>
  );
}