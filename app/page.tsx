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
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2vh 5vw",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1
        style={{
          fontSize: "min(48px, 8vh)",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          margin: 0,
          paddingTop: "2vh",
        }}
      >
        WhichHU.com
      </h1>

      {randomImage && (
        <div
          style={{
            position: "relative",
            width: "auto",
            height: "60vh",
            maxHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={randomImage}
            alt="Player"
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "90vw",
              maxHeight: "60vh",
              objectFit: "contain",
              borderRadius: "16px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
            }}
            width={500}
            height={650}
            priority
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "90%",
          maxWidth: "600px",
          marginBottom: "3vh",
        }}
      >
        <button
          style={{
            padding: "min(20px, 3vh)",
            width: "50%",
            fontSize: "min(28px, 5vh)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#8B0000",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Howard
        </button>
        <button
          style={{
            padding: "min(20px, 3vh)",
            width: "50%",
            fontSize: "min(28px, 5vh)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#00008B",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Hampton
        </button>
      </div>
    </div>
  );
}
