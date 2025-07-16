"use client";
import Image from "next/image";
import "./Menu.css";
import Link from "next/link";

interface MenuType {
  name: string;
  description: string[];
  price: number;
}

import { useEffect, useState } from "react";

export default function Menu() {
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [language, setLanguage] = useState("mk");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/menu-${language}.json`);
      const data = await response.json();
      setMenu(data);
    }
    getData();
  }, [language]);

  return (
    <div className="menuWrapper">
      <div className="logoWrapper">
        <Image
          src={"/images/branding/il-baffo_logo-white.svg"}
          width={300}
          height={100}
          alt="il-baffo logo"
        />
        <p className="tagline">Pizza Napolitana</p>
      </div>

      <div className="languagesWrapper">
        <Image
          className={language === "mk" ? "languageSelected" : "language"}
          onClick={() => setLanguage("mk")}
          src={"/images/flags/mk.svg"}
          width={30}
          height={30}
          alt="macedonian language"
        />
        <Image
          className={language === "ita" ? "languageSelected" : "language"}
          onClick={() => setLanguage("ita")}
          src={"/images/flags/ita.svg"}
          width={30}
          height={30}
          alt="italian language"
        />
        <Image
          className={language === "eng" ? "languageSelected" : "language"}
          onClick={() => setLanguage("eng")}
          src={"/images/flags/eng.svg"}
          width={30}
          height={30}
          alt="english language"
        />
        <Image
          className={language === "alb" ? "languageSelected" : "language"}
          onClick={() => setLanguage("alb")}
          src={"/images/flags/alb.svg"}
          width={30}
          height={30}
          alt="albanian language"
        />
        <Image
          className={language === "gr" ? "languageSelected" : "language"}
          onClick={() => setLanguage("gr")}
          src={"/images/flags/gr.svg"}
          width={30}
          height={30}
          alt="greek language"
        />
      </div>

      <div className="menuItemsWrapper">
        {menu.length > 0 ? (
          menu.map((item, index) => (
            <div className="pizzaWrapper" key={index}>
              <h2 className="pizzaName">{item.name}</h2>
              <div className="descriptionWrapper">
                {item.description.map((desc, i) => (
                  <span className="descriptionItem" key={i}>
                    {desc}
                    {i < item.description.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <div className="priceBox">
                <span className="priceCurrency">ден</span>
                <span className="priceValue">{item.price}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="loadingText">Loading...</p>
        )}
      </div>
<Link href="tel:+38978669092" className="phoneNumber">
  {language === "mk" && <span>Јави се на: 078-669-092</span>}
  {language === "eng" && <span>Call us: 078-669-092</span>}
  {language === "alb" && <span>Na telefononi: 078-669-092</span>}
  {language === "gr" && <span>Καλέστε μας: 078-669-092</span>}
  {language === "ita" && <span>Chiamaci: 078-669-092</span>}
</Link>
    </div>
  );
}
