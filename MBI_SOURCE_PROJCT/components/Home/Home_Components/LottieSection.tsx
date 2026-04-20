"use client";

import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

export default function LottieSection() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/Comp 1_Sim_01.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        setIsLoaded(true);
      })
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  if (!isLoaded) {
    return (
      <section className="w-full bg-background py-0">
        <div className="w-20 h-20 mx-auto rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </section>
    );
  }

  return (
    <section className="w-full bg-background py-0 -mt-16">
      <div className="w-full max-w-[800px] mx-auto h-[300px]"> {/* Adjust these values */}
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </section>
  );
}