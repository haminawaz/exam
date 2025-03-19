"use client";
import React from "react";

export const WhyChoose = () => {
  const features = [
    {
      image: "/images/teacher.png",
      title:
        "Un contenu conçu par des enseignants qualifiés et 100% conformes au programme.",
      description:
        "Nos simulations d'examens d'admission sont préparées par des enseignants qualifiés et sont conformes au programme du Ministère de l'éducation du Québec.",
    },
    {
      image: "/images/program.png",
      title: "Une préparation complète avec rétroaction pour parents et élèves",
      description:
        "Nos simulations d'examens permettent aux élèves de s'exercer sur des notions qui se retrouvent aux examens d'admission aux écoles secondaires du Québec. Grâce à une rétroaction, les parents sont informés du score obtenu par leur enfant dans les tests en mathématiques et en français ainsi que des pistes d'amélioration des résultats.",
    },
    {
      image: "/images/cost.png",
      title: "Une préparation de qualité à un prix accessible",
      description:
        "Acces-Sec offre deux niveaux de simulation de tests d'admission au secondaire en mathématiques et en français à un prix attractif. Votre code d'accès sera valide pendant deux mois. Votre enfant pourra répéter les exercices pour améliorer ses résultats.",
    },
  ];

  return (
    <section className=" bg-[#398EBB] w-[100%]">
      <div className="">
        <img className=" top-1 left-1 p-5" src="/images/d.png" alt="Top Left" />
      </div>
      <div className="flex flex-col items-center">
        <div className="py-5">
          <h1 className="font-poppins text-[25px] md:text-[40px] font-bold text-white text-center">
            Pourquoi choisir Acces-Sec ?
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch m-auto gap-5 py-5 w-full">
          {features?.map((feature, index) => (
            <div
              key={index}
              className=" max-w-[90%] md:w-[350px] lg:w-[400px] md:p-[26px] bg-white rounded-xl text-center border border-[#FE8840] flex flex-col items-center h-full"
            >
              <img
                className="w-[400px] h-[170px] p-0"
                src={feature.image}
                alt="Feature"
              />
              <div className="flex-grow px-5">
                <h1 className="text-[18px] md:text-[22px] font-bold pt-5 font-poppins">
                  {feature.title}
                </h1>
                <p className="text-[16px] md:text-[20px] font-quicksand font-normal text-[#62605b] py-5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="flex justify-end">
        <img className=" right-0 p-5" src="/images/pi.png" alt="Top Left" />
      </div>
    </section>
  );
};
