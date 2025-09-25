'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { initAll } from '../../utils/animations';
import './styles.css';

const jobListings = [
  {
    id: 1,
    emoji: '🍕',
    title: 'Перач на садови',
    description: 'Бараме Перач на садови да се приклучи во нашиот тим во Битола.\n\n✅ Делoвно време или полно работно време\n✅ Добра работна атмосфера\n✅ Не е потребно искуство, ние обучуваме\n\nАко си одговорен, брз и спремен за работа во пријателски тим, ова е работата за тебе!',
    location: 'Il Baffo Пицерија, Битола',
    phone: '070 217 452',
    image: '/images/career/dish-washer.jpg'
  }
  // Commented out other job listings for now
  // {
  //   id: 2,
  //   emoji: '🍕',
  //   title: 'Келнер',
  //   description: 'Бараме Келнер/ка да се приклучи во нашиот тим во Битола.\n\n✅ Добра комуникација со гости\n✅ Делoвно време или полно работно време\n✅ Пријатна работна атмосфера',
  //   location: 'Il Baffo Пицерија, Битола',
  //   phone: '070 217 452',
  //   image: '/images/pizza/2.png'
  // },
  // {
  //   id: 3,
  //   emoji: '🥗',
  //   title: 'Салатер',
  //   description: 'Бараме Салатер (подготовка на салати и ладна кујна).\n\n✅ Одговорност и брзина\n✅ Не е потребно искуство – ние обучуваме\n✅ Одлични услови за работа',
  //   location: 'Il Baffo Пицерија, Битола',
  //   phone: '070 217 452',
  //   image: '/images/pizza/3.webp'
  // },
  // {
  //   id: 4,
  //   emoji: '🍹',
  //   title: 'Шанкер',
  //   description: 'Бараме Шанкер/ка за работа во динамична и позитивна средина.\n\n✅ Подготвка на пијалоци\n✅ Добра организација и тимска работа\n✅ Флексибилно работно време',
  //   location: 'Il Baffo Пицерија, Битола',
  //   phone: '070 217 452',
  //   image: '/images/pizza/5.png'
  // }
];

export default function CareerPage() {
  useEffect(() => {
    initAll();
  }, []);

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="hero-wrap overflow-hidden relative">
        <div className="absolute w-100 h-100 d-flex">
          <Image
            className="w-100 h-100 object-fit-cover"
            src="/images/white1.png"
            alt="Background"
            fill
          />
        </div>

        <div className="hero-in relative z-2 section-padding-md px-20 d-flex flex-column flex-center">
          <div className="hero-in__title container-xl text-center f-weight-600">
            <h1 className="f-2 text-uppercase smd-f-4 sm-f-size-40">
              <span className="text-primary">КАРИЕРА</span> ВО <span className="text-secondary">ИЛ БАФО</span>
            </h1>
            <p className="f-weight-500 lh-30 container sm-w-100 sm-max-w-100 mt-12 mx-auto smd-mt-8 smd-f-size-14">
              Приклучи се во нашиот тим и стани дел од приказната за љубов, пријателство и италијански вкусови! 🍕
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="section-padding">
        <div className="container-xl mx-auto px-20">
          <div className="job-grid">
            {jobListings.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card__image">
                  <Image
                    src={job.image}
                    alt={job.title}
                    className="w-100 h-100 object-fit-cover"
                    width={400}
                    height={200}
                  />
                </div>

                <div className="job-card__content">
                  <div className="job-card__header">
                    <span className="job-emoji">{job.emoji}</span>
                    <h3 className="job-title">{job.title}</h3>
                  </div>

                  <div className="job-description">
                    {job.description.split('\n').map((line, index) => (
                      <p key={index} className={line.startsWith('✅') ? 'benefit-line' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="job-location">
                    <i className="fa-solid fa-map-marker-alt mr-4"></i>
                    <span>{job.location}</span>
                  </div>

                  <a
                    href={`tel:${job.phone}`}
                    className="job-call-button"
                  >
                    <i className="fa-solid fa-phone mr-4"></i>
                    <span>ПОВИКАЈ ЗА РАБОТА</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
