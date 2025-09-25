import Image from 'next/image';

export default function Story() {
  return (
    <div id="story" className="ourstory overflow-hidden with-bottom section-padding relative">
      <div className="absolute w-100 h-100 d-flex">
        <Image
          className="w-100 h-100 object-fit-cover"
          src="/images/white1.png"
          alt="Background"
          fill
        />
      </div>

      <div className="story relative z-2 mx-auto container-xl d-grid col-2 md-col-1 smd-grid-gap-32 grid-gap-48">
        <div className="story__img">
          <Image
            className="w-100 h-100 object-fit-cover"
            src="/images/hero.jpg"
            alt="IL BAFFO Restaurant"
            width={600}
            height={400}
          />
        </div>

        <div className="story__content d-flex flex-column justify-center">
          <h2 className="f-1 lap-f-2 md-left-0 relative left--120 text-secondary family-third f-weight-600 md-f-3">
            Нашата приказна
          </h2>

          <p className="mt-12 f-weight-500 smd-f-size-14 smd-lh-25 lh-30">
            Тоа е првиот вистински италијански ресторан во Битола, каде што љубовта, семејството и
            пријателството создадоа магија во чинија. <br /><br />
            Ова е приказна за битолчанец кој го следеше срцето до Италија, се заљуби во Италијанка и ја донесе
            нивната страст за храна назад дома. <br /><br />
            Со својот бизнис партнер и долгогодишен другар, создадоа место кое дише со италијанска традиција.
            <br /><br />
            А Италијанката? <br />
            Таа ги донесе и своите родители во Битола, за заедно да ја готват нивната автентична италијанска
            храна. <br />
            Името IL BAFFO, кое на македонски значи &ldquo;мустак&rdquo;, е посвета на таткото на Италијанката, кој е
            вистински симбол на ова семејство – со својата страст за готвење и италијански шарм. <br />
            Во IL BAFFO не сте само гости – вие сте дел од семејството. <br />
            Вкусете ја приказната ▪️ Benvenuti 🇮🇹
          </p>
        </div>
      </div>
    </div>
  );
}
