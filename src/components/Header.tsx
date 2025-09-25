'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    // Add/remove overlay class to body
    if (newState) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    document.body.classList.remove('overlay');
  };

  // Function to check if restaurant is open
  const checkRestaurantStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeString = now.toLocaleTimeString('mk-MK', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Skopje'
    });

    setCurrentTime(currentTimeString);

    // Restaurant is open from 08:00 to 23:00
    const isOpen = (currentHour >= 8 && currentHour < 23);
    setIsRestaurantOpen(isOpen);
  };

  // Cleanup effect to remove overlay class when component unmounts
  useEffect(() => {
    checkRestaurantStatus();

    // Update time every minute
    const interval = setInterval(checkRestaurantStatus, 60000);

    return () => {
      document.body.classList.remove('overlay');
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu-content ${isMobileMenuOpen ? 'opened' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu h-100 bg-primary d-flex flex-column">
          <div className="mobile-menu__top px-16 text-black py-10 d-flex align-center justify-end">
            <button className="bg-transparent z-9 relative" onClick={toggleMobileMenu}>
              <div className="nav-toggle d-flex">
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
              </div>
            </button>
          </div>

          <div className="mobile-menu__links relative top--50 h-100 active d-flex flex-column flex-center mobile-screen">
            <Link href="/" className="m-logo text-black mb-20">
              <Image
                className="filter-invert filtered"
                width={250}
                height={100}
                src="/images/logo.png"
                alt="IL BAFFO Logo"
              />
            </Link>

            <button
              onClick={() => scrollToSection('story')}
              className="m-link py-10 px-16 text-white d-flex justify-between align-center"
            >
              <span className="f-size-32 text-white f-weight-500 relative size-fix">Нашата приказна</span>
            </button>

            <button
              onClick={() => scrollToSection('menu')}
              className="m-link py-10 px-16 text-white d-flex justify-between align-center"
            >
              <span className="f-size-32 text-white f-weight-500 relative size-fix">Нашето мени</span>
            </button>

            <a
              href="/career"
              className="m-link py-10 px-16 text-white d-flex justify-between align-center"
            >
              <span className="f-size-32 text-white f-weight-500 relative size-fix">Кариера</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="m-link py-10 px-16 text-white d-flex justify-between align-center"
            >
              <span className="f-size-32 text-white f-weight-500 relative size-fix">Контакт</span>
            </button>

            <div className="my-20"></div>

            <div className={`py-12 d-flex px-24 ml-12 text-white radius-1 d-flex align-center f-weight-500 mdd-f-size-14 mdd-px-12 ${isRestaurantOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              <i className="fa-solid fa-clock mr-4"></i>
              <span>08:00 - 23:00</span>
            </div>

            <div className="mt-20"></div>

            <a
              className="d-flex mx-12 py-10 px-16 f-weight-500 text-black bg-white radius-1 d-flex align-center"
              href="tel: 078 669 092"
            >
              <i className="fa-solid fa-phone mr-4 f-size-15 mdd-f-size-13"></i>
              <span>ПОВИКАЈ ILBAFFO</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="hero-wrap overflow-hidden relative">
        <div className="absolute w-100 h-100 d-flex">
          <Image
            className="w-100 h-100 object-fit-cover"
            src="/images/white1.png"
            alt="Background"
            fill
          />
        </div>

        <div className="nav-wrap relative z-2 d-flex justify-between align-center container-xl mx-auto">
          <div className="nav-left lgt-d-none smd-d-none flex-1 d-flex align-center">
            <button
              onClick={() => scrollToSection('story')}
              className="py-24 d-flex px-12 f-weight-500 text-black mdd-px-8 hover-text-primary mdd-f-size-15"
            >
              <span>НАШАТА ПРИКАЗНА</span>
            </button>

            <button

              className="py-24 d-flex px-12 f-weight-500 text-black mdd-px-8 hover-text-primary mdd-f-size-15"
            >
              <Link href={"/menu"} > <span>НАШЕТО МЕНИ</span></Link>

            </button>

            <button
              className="py-24 d-flex px-12 f-weight-500 text-black mdd-px-8 hover-text-primary mdd-f-size-15"
            >
              <Link href={"/career"} > <span>КАРИЕРА</span></Link>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="py-24 d-flex px-12 f-weight-500 text-black mdd-px-8 hover-text-primary mdd-f-size-15"
            >
              <span>КОНТАКТ</span>
            </button>
          </div>

          <Link href="/" className="py-24">
            <Image
              className="w-220 mdd-w-150 lap-w-130 lgt-w-160"
              src="/images/logo.png"
              alt="IL BAFFO Logo"
              width={220}
              height={100}
            />
          </Link>

          <div className="nav-right lgt-d-none justify-end flex-1 d-flex align-center">
            <div className={`py-12 d-flex px-24 text-white radius-1 d-flex align-center f-weight-500 mdd-f-size-14 mr-12 ${isRestaurantOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              <i className="fa-solid fa-clock mr-4 f-size-15 mdd-f-size-13"></i>
              <span>08:00 - 23:00</span>
              <span className="ml-4 f-size-12">• {isRestaurantOpen ? 'Отворено' : 'Затворено'}</span>
            </div>

            <a
              className="py-12 d-flex px-24 bg-primary text-white radius-1 d-flex align-center f-weight-500 mdd-f-size-14 mdd-px-12 call-button"
              href="tel: 078 669 092"
            >
              <i className="fa-solid fa-phone mr-4 f-size-15 mdd-f-size-13"></i>
              <span>ПОВИКАЈ ILBAFFO</span>
            </a>
          </div>

          <div className="nav-toggle d-none ml-12 smd-d-flex" onClick={toggleMobileMenu}>
            <span className="first"></span>
            <span className="second"></span>
            <span className="third"></span>
          </div>
        </div>
      </div>
    </>
  );
}
