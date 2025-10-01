import Image from 'next/image';

export default function Menu() {
  const galleryImages = [
    '/images/gal/1.jpg',
    '/images/gal/2.jpg',
    '/images/gal/3.jpg',
    '/images/gal/4.jpg',
    '/images/gal/5.jpg',
    '/images/gal/6.jpg',
  ];

  return (
    <div id="menu" className="gallery bg-black d-flex flex-column flex-center">
      <div className="container-xl section-padding with-bottom">
        <h2 className="text-white text-center f-1 smd-f-2 sm-f-3 family-third">
          Нашата Пица
        </h2>
        <br />

        <p className="text-white text-center lh-30 sm-f-size-14 sm-lh-25">
          Вкус од соништата 🍕✨ <br />
          Пица со тенко крцкаво тесто, најдобрите состојки донесени од Италија и љубов од нашите пица мајстори во
          кујната. <br />
          Денес ви ја препорачуваме нашата специјална пица со кремаста бурaта и слој од најфината мортадела.
        </p>

        <div className="btn-out d-flex flex-center pt-20">
          {/* Menu button can be added here if needed */}
        </div>

        <div className="gallery-sm section-padding-sm d-grid col-3 sm-col-2 sm-grid-gap-14 grid-gap-24">
          {galleryImages.map((image, index) => (
            <Image
              key={index}
              className="w-100 h-100 d-flex object-fit-cover radius-1"
              src={image}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={300}
            />
          ))}
        </div>
      </div>
    </div>
  );
}