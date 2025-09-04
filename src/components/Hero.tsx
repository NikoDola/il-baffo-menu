'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple horizontal scroll animation without GSAP
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      carousel.style.transform = `translateX(-${scrollPosition}px)`;

      // Reset position when it goes too far
      if (scrollPosition > carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const pizzaImages = [
    '/images/pizza/1.png',
    '/images/pizza/2.png',
    '/images/pizza/3.webp',
    '/images/pizza/5.png',
    '/images/pizza/7.webp',
    '/images/pizza/8.webp',
    '/images/pizza/9.webp',
    '/images/pizza/10.png',
    '/images/pizza/11.webp',
    '/images/pizza/12.webp',
    '/images/pizza/13.png',
  ];

  return (
    <div className="hero-in relative z-2 section-padding-md px-20 d-flex flex-column flex-center">
      <div className="hero-in__title container-xl text-center f-weight-600">
        <h1 className="f-2 text-uppercase smd-f-4 sm-f-size-40">
          Приказна за <span className="text-secondary">љубов,</span>
          <span className="text-primary"> пријателство</span> <span className="text-secondary">и италијански вкусови</span>
        </h1>

        <p className="f-weight-500 lh-30 container sm-w-100 sm-max-w-100 mt-12 mx-auto smd-mt-8 smd-f-size-14">
          Со секој залак ќе откриете совршен баланс на кремасти сирења, нежна кора и богат,
          препознатлив вкус кој носи духот на Наполи директно на вашата маса. Во Il Baffo, секој детал е со
          вкус, секој залак е уметност 🍕
        </p>
      </div>

      <div className="marq horizontal-loop d-flex section-padding-sm with-bottom">
        <div ref={carouselRef} className="d-flex">
          {pizzaImages.map((image, index) => (
            <div key={index} className="img-one for-scroll drop-shadow-2xl">
              <Image
                className="max-w-360 smd-w-240 sm-w-180 overflow-hidden"
                src={image}
                alt={`Pizza ${index + 1}`}
                width={360}
                height={360}
              />
            </div>
          ))}
          {/* Duplicate images for seamless loop */}
          {pizzaImages.map((image, index) => (
            <div key={`duplicate-${index}`} className="img-one for-scroll drop-shadow-2xl">
              <Image
                className="max-w-360 smd-w-240 sm-w-180 overflow-hidden"
                src={image}
                alt={`Pizza ${index + 1}`}
                width={360}
                height={360}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
