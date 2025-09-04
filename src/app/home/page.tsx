'use client';

import { useEffect } from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Story from '../../components/Story';
import Menu from '../../components/Menu';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import { initAll } from '../../utils/animations';

export default function HomePage() {
  useEffect(() => {
    initAll();
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <Story />
      <Menu />
      <Contact />
      <Footer />
    </main>
  );
}