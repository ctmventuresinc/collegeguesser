"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const imageUrls = [
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Tyson_Rodney.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Colvin_Matthew.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Parker_William.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Johnson_Da_Vaun.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Aiyegoro_Richard.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Brown_Tavius.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/McGhee_Greg.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Alston_Cameron.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Blair_Julian.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Cunningham_Jamie.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Offor_Godspower.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Grimes_Odis.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Johnson_Kalen.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Hartman_Stewart.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Matthews_Atavius.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Freeman_Aquanius.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Dunn_Alonte.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Antoine_Tamlin.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Thiel_David.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/David_Julien.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Lassiter_LeLand.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Ezell_Jabril.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Tusan_Terrance.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Russ_Kenneth.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Banks_Yoseff.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Robinson_Alizah.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Price_DeAndre.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Branton_Casey.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Brown_Khari.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Robinson_Charles.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Fleck_John.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Hunt_Travon.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Johnson_Craig.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Rollins_Devin.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Day_Jalen.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Stevens_Julio.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Kindle_Parrish_Caleb.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Boozer_Tommie.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Alkins_Chris.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Bennett_Jacob.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Mills_Zachary.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Orr_Austin.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Brown_Travis.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/9/12/MB.png&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Pittman_Eric.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Smith_John.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Reid_Devyn.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Parker_Matthew.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Kebe_Ibrahima.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Lee_David.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Boyd_Toree.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Anglin_Elijah.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Powers_Gregory.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Hogan_Lance.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Wright_Gerald.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Kendricks_Shaka.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Lewis_Nathan.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Reyes_Janer.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Dunham_Jordan.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Shadrach_Tyler.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Lebofsky_Dakota.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Rutledge_Malcolm.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Holman_James.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Allen_Wright_Deonta.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Mercer_Robert.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Iyere_Patrick.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Payne_Andre.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Hall_Raymond.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Harris_Marvin.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Chaney_Justin.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Williams_Myles.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Warren_Howard.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Williams_Cody.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Iduwe_Ghanfona.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Johnson_Richard.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Gresham_Chisolm_Damon.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Haugabook_Trae.JPG&width=200&type=jpeg&quality=100",
  "https://images.sidearmdev.com/resize?url=https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/howard-bison.com/images/2014/8/8/Dillard_Joseph.JPG&width=200&type=jpeg&quality=100",
];

export default function Home() {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImage(imageUrls[randomIndex]);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {randomImage && (
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            src={randomImage}
            alt="Howard Player"
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
        </div>
      )}
    </div>
  );
}
