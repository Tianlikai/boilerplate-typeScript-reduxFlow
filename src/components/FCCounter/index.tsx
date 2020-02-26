import React from "react";

interface FCCounterProps {
  label: string;
  count: number;
  onIncrement: () => void;
}

export const FCCounter: React.FC<FCCounterProps> = ({
  label,
  count,
  onIncrement,
}: FCCounterProps) => {
  const handleIncrement = () => onIncrement();
  return (
    <div>
      <span>{`${label}:${count}`}</span>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};
