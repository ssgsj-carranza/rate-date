// components/Wheel.js
import React, { useState, useRef } from 'react';

const Wheel = ({ items, onSpinEnd }) => {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const wheelRef = useRef(null);

  const spinWheel = () => {
    if (items.length === 0 || spinning) return;

    setSpinning(true);
    const randomDegree = Math.floor(Math.random() * 360) + 3600;
    wheelRef.current.style.transition = 'transform 5s ease-out';
    wheelRef.current.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(${randomDegree % 360}deg)`;
      const winnerIndex = Math.floor((randomDegree % 360) / (360 / items.length));
      const winner = items[winnerIndex];
      setWinner(winner);
      setSpinning(false);
      onSpinEnd(winner);
    }, 5000);
  };

  const colors = ['#FFFFFF', '#FFD700', '#B2AC88', '#000000'];
  const segments = items.length > 0 ? items : Array.from({ length: 8 }, (_, i) => '');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-96 h-96 border-4 border-black rounded-full flex items-center justify-center overflow-hidden">
        <div
          ref={wheelRef}
          className="absolute w-full h-full rounded-full"
          style={{
            transform: 'rotate(0deg)',
          }}
        >
          {segments.map((item, index) => (
            <div
              key={index}
              className="absolute w-full h-full flex items-center justify-center text-center"
              style={{
                backgroundColor: colors[index % colors.length],
                transform: `rotate(${(360 / segments.length) * index}deg) skewY(-30deg)`,
                transformOrigin: '50% 50%',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              }}
            >
              <div
                className="absolute"
                style={{
                  transform: `skewY(30deg) rotate(${(180 / segments.length)}deg)`,
                }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={spinWheel}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-neumorphic active:shadow-neumorphic-inset"
      >
        Spin
      </button>
      {winner && <p className="mt-4">Winner: {winner}</p>}
    </div>
  );
};

export default Wheel;