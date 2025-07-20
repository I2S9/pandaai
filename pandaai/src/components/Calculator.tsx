"use client";
import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setEquation(display + ' ' + operator + ' ');
    setShouldResetDisplay(true);
  };

  const handleEqual = () => {
    const result = eval(equation + display);
    setDisplay(result.toString());
    setEquation('');
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    { label: 'C', action: handleClear, className: 'bg-red-500 hover:bg-red-600' },
    { label: '±', action: () => setDisplay((-parseFloat(display)).toString()), className: 'bg-gray-500 hover:bg-gray-600' },
    { label: '%', action: () => setDisplay((parseFloat(display) / 100).toString()), className: 'bg-gray-500 hover:bg-gray-600' },
    { label: '÷', action: () => handleOperator('/'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '7', action: () => handleNumber('7'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', action: () => handleNumber('8'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', action: () => handleNumber('9'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '×', action: () => handleOperator('*'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '4', action: () => handleNumber('4'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', action: () => handleNumber('5'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', action: () => handleNumber('6'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '-', action: () => handleOperator('-'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '1', action: () => handleNumber('1'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', action: () => handleNumber('2'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', action: () => handleNumber('3'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '+', action: () => handleOperator('+'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '0', action: () => handleNumber('0'), className: 'bg-gray-700 hover:bg-gray-600 col-span-2' },
    { label: '.', action: handleDecimal, className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '=', action: handleEqual, className: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="bg-black rounded-lg p-4 w-64">
      {/* Display */}
      <div className="mb-4">
        <div className="text-right text-gray-400 text-sm h-6">{equation}</div>
        <div className="text-right text-white text-3xl font-light">{display}</div>
      </div>
      
      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`${button.className} text-white rounded-full h-12 font-medium text-lg transition-colors`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
} 