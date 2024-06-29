import { useEffect, useState } from 'react';

const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

// This hook allows to run a callback when the Konami code is entered
export const useKonamiCode = (callback: () => void) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === konamiCode[currentIndex]) {
        setCurrentIndex((prev) => prev + 1);
        if (currentIndex + 1 === konamiCode.length) {
          callback();
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, callback]);
};
