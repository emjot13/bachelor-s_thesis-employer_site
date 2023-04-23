import React, { useState, useEffect } from 'react';
import coffee from '../assets/coffee.png'


const Coffee = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => {
        const newX = Math.max(
          Math.min(
            prevPosition.x + Math.floor(Math.random() * 201) - 100,
            window.innerWidth - 50
          ),
          0
        );
        const newY = Math.max(
          Math.min(
            prevPosition.y + Math.floor(Math.random() * 201) - 100,
            window.innerHeight - 50
          ),
          0
        );
        return { x: newX, y: newY };
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (e) => {

    const xDiff = parseInt(Math.random() * 200) - 100
    const yDiff = Math.random() < 0.5 ? 100 - Math.abs(xDiff) : (100 - Math.abs(xDiff)) * -1

    const newX = Math.max(Math.min(position.x + xDiff * 3, window.innerWidth - 50), 0);
    const newY = Math.max(Math.min(position.y + yDiff * 3, window.innerHeight - 50), 0);

    console.log("position x, y", position.x, position.y)
    console.log(xDiff, yDiff)
    setPosition({ x: newX, y: newY });
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'all 2s ease',
      }}
      onClick={handleClick}
    >
      <img
        src={coffee}
        alt="cup of coffee"
        width="50"
        height="50"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};

export default Coffee;
