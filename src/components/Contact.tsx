import Image from 'next/image';

export default function Contact() {
  return (
    <div id="contact" className="translate-form relative section-padding with-bottom container-xl mx-auto d-grid col-2 lgt-col-1 grid-gap-32 relative">
      <div className="absolute top-0 left-0 w-100 h-100">
        <Image className="w-100 h-100 object-fit-cover d-flex" src="/images/white1.png" alt="" fill />
      </div>

      <div className="translate-one relative z-2 d-flex flex-column">
        <div className="prehead d-flex align-center">
          <div className="prehead__icon w-50 h-50 bg-primary radius-full d-flex flex-center">
            <i className="fa-regular fa-comments text-white"></i>
          </div>
          <span className="ml-20 text-primary">КОНТАКТ</span>
        </div>

        <h4 className="f-3 f-weight-500 md-f-4 mt-10">Како до нас?</h4>

        <div className="contact-infos relative z-2 mt-24 d-flex flex-column grid-gap-20">
          <div className="contact-info box-shadow-md py-12 bg-white bg-opacity-100 px-20 radius-2 d-flex align-center">
            <div className="contact-info__icon relative w-55 h-55 bg-primary bg-opacity-20 d-flex flex-center radius-full">
              <i className="fa-solid fa-phone text-primary f-size-24"></i>
            </div>
            <a href="tel: 078 669 092" target="_blank" className="contact-info__p ml-20 f-size-24 text-primary">
              <span>078 669 092</span>
            </a>
          </div>

          <div className="contact-info box-shadow-md py-12 bg-white bg-opacity-100 px-20 radius-2 d-flex align-center">
            <div className="contact-info__icon relative w-55 h-55 bg-primary bg-opacity-20 d-flex flex-center radius-full">
              <i className="fa-solid fa-envelope text-primary f-size-24"></i>
            </div>
            <a href="mailto: ciao@ilbaffo.mk" target="_blank" className="contact-info__p ml-20 f-size-24 text-primary">
              <span>ciao@ilbaffo.mk</span>
            </a>
          </div>

          <div className="contact-info box-shadow-md py-12 bg-white bg-opacity-100 px-20 radius-2 d-flex align-center">
            <div className="contact-info__icon relative w-55 h-55 bg-primary bg-opacity-20 d-flex flex-center radius-full">
              <i className="fa-solid fa-location-dot text-primary f-size-24"></i>
            </div>
            <a href="https://maps.app.goo.gl/Ksu8xfWYDV5cJ3aBA" target="_blank" className="contact-info__p ml-20 f-size-24 text-primary">
              <span>Кирил и Методиј 5, Битола 7000</span>
            </a>
          </div>

          <div className="contact-info box-shadow-md py-12 bg-white bg-opacity-100 px-20 radius-2 d-flex align-center">
            <div className="contact-info__icon relative w-55 h-55 bg-primary bg-opacity-20 d-flex flex-center radius-full">
              <i className="fa-brands fa-facebook-f text-primary f-size-24"></i>
            </div>
            <a href="https://www.facebook.com/profile.php?id=61571610909641" target="_blank" className="contact-info__p ml-20 f-size-24 text-primary">
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <div className="translate-one relative z-2 section-padding-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.9166527614582!2d21.333936438846774!3d41.028902742836884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135725f9cee92337%3A0x27fef22dbb10396f!2sPizza%20Il%20Baffo!5e0!3m2!1sen!2smk!4v1737720725504!5m2!1sen!2smk"
          className="w-100 h-450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
