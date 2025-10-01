'use client';

export default function Hero() {
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
    </div>
  );
}
