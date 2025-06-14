"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function CalculatorPage() {
  const [currentValue, setCurrentValue] = useState("0");
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNumberInput = (num: string) => {
    if (currentValue === "0" && num !== ".") {
      setCurrentValue(num);
    } else if (num === "." && currentValue.includes(".")) {
      return;
    } else {
      setCurrentValue(`${currentValue}${num}`);
    }
  };

  const handleOperation = (op: string) => {
    if (op === "±") {
      setCurrentValue(String(parseFloat(currentValue) * -1));
      return;
    }
    if (op === "%") {
      setCurrentValue(String(parseFloat(currentValue) / 100));
      return;
    }
    if (storedValue && operation) {
      const result = calculate(parseFloat(storedValue), parseFloat(currentValue), operation);
      setStoredValue(String(result));
      setCurrentValue("0");
      setOperation(op);
      setHistory(prev => [...prev, `${storedValue} ${operation} ${currentValue} = ${result}`]);
    } else {
      setStoredValue(currentValue);
      setCurrentValue("0");
      setOperation(op);
    }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (storedValue && operation) {
      const result = calculate(parseFloat(storedValue), parseFloat(currentValue), operation);
      setCurrentValue(String(result));
      setHistory(prev => [...prev, `${storedValue} ${operation} ${currentValue} = ${result}`]);
      setStoredValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setCurrentValue("0");
    setStoredValue(null);
    setOperation(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleButtonClick = (value: string) => {
    if (value === "C") handleClear();
    else if (value === "=") handleEquals();
    else if (["+", "-", "×", "÷", "±", "%"].includes(value)) handleOperation(value);
    else handleNumberInput(value);
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen flex flex-col ${resolvedTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Основной контейнер с адаптивными отступами */}
      <div className="w-full max-w-md mx-auto p-4 flex-1 flex flex-col sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-medium">
            Bulbulator
          </h1>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </header>

        {/* Display - адаптивный размер текста */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-4 sm:mb-6 p-4 rounded-lg ${
            resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'
          }`}
        >
          <div className={`text-right text-sm sm:text-base h-5 mb-1 ${
            resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {storedValue && operation ? `${storedValue} ${operation}` : ' '}
          </div>
          <div className="text-right text-3xl sm:text-4xl md:text-5xl font-light">
            {currentValue}
          </div>
        </motion.div>

        {/* Keypad - адаптивные размеры кнопок */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {["C", "±", "%", "÷"].map((btn) => (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(btn)}
              className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
                resolvedTheme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                ["÷"].includes(btn) ? (resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-600') : ''
              }`}
            >
              {btn}
            </motion.button>
          ))}

          {["7", "8", "9", "×"].map((btn) => (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(btn)}
              className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
                resolvedTheme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                ["×"].includes(btn) ? (resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-600') : ''
              }`}
            >
              {btn}
            </motion.button>
          ))}

          {["4", "5", "6", "-"].map((btn) => (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(btn)}
              className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
                resolvedTheme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                ["-"].includes(btn) ? (resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-600') : ''
              }`}
            >
              {btn}
            </motion.button>
          ))}

          {["1", "2", "3", "+"].map((btn) => (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(btn)}
              className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
                resolvedTheme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                ["+"].includes(btn) ? (resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-600') : ''
              }`}
            >
              {btn}
            </motion.button>
          ))}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleButtonClick("0")}
            className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base col-span-2 ${
              resolvedTheme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            0
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleButtonClick(".")}
            className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
              resolvedTheme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            .
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleButtonClick("=")}
            className={`p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
              resolvedTheme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-500' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            =
          </motion.button>
        </div>

        {/* History - адаптивные размеры */}
        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex-1 p-3 sm:p-4 rounded-lg overflow-y-auto max-h-[200px] sm:max-h-[300px] ${
              resolvedTheme === 'dark' 
                ? 'bg-gray-800/80' 
                : 'bg-white/80 shadow'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className={`text-xs sm:text-sm ${
                resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                HISTORY
              </h3>
              <button
                onClick={handleClearHistory}
                className={`text-xs sm:text-sm ${
                  resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                } hover:underline`}
              >
                CLEAR
              </button>
            </div>
            <ul className="space-y-1 text-xs sm:text-sm">
              {history.slice().reverse().map((item, index) => (
                <li 
                  key={index} 
                  className={`text-right py-1 ${
                    resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}