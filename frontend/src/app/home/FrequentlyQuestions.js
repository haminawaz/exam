"use client";
import React, { useState } from "react";

export const FrequentlyQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqData = [
    {
      question: " Qu'est-ce qu'Acces-sec ?",
      answer:
        "Acces-Sec est un simulateur d'examen conçu pour aider les élèves à se préparer efficacement aux examens d'admission aux écoles secondaires du Québec. Il propose des tests conformes au programme scolaire avec des retours détaillés pour chaque matière.",
    },
    {
      question: "Comment utiliser Acces-Sec ?",
      answer:
        "Acces-Sec oƯre deux niveaux de simulation d’examens. Il vous suƯit de commander le niveau sur lequel vous souhaitez que votre enfant s’exerce. En général, pour une préparation optimale, nous recommandons de commencer par le niveau 1. Vous recevrez alors un code qui donnera à votre enfant l’accès aux simulations d’examens autant en français et qu’en mathématiques. Une fois les examens terminés, vous bénéficierez d’un rapport détaillé contenant des pistes d’amélioration des résultats.",
    },
    {
      question:
        "Les examens d'Acces-Sec sont-ils adaptés au programme scolaire ?",
      answer:
        "Oui, tous les tests d'Acces-sec sont conformes aux exigences des examens d'admission, permettant à votre enfant de s'entraîner avec des questions réalistes et pertinentes.",
    },
    {
      question: "Puis-je utiliser Acces-Sec sur n'importe quel appareil ?",
      answer:
        "Oui, Acces-sec est accessible sur ordinateur, téléphone et tablette, ce qui permet à votre enfant de s'exercer où qu'il soit et à tout moment.",
    },
    {
      question: "Comment les résultats sont-ils présentés sur Acces-Sec ?",
      answer:
        "Après chaque simulation, vous recevrez par courriel un rapport contenant le score global par matière ainsi qu'un score par section dans chaque matière. Vous pourrez alors identifier les sections que votre enfant doit réviser davantage.",
    },
    {
      question: "Mon enfant peut-il refaire les simulations plusieurs fois ?",
      answer:
        "Oui, il peut refaire les tests autant de fois qu'il le souhaite pour améliorer son score et renforcer ses connaissances.",
    },
    {
      question:
        "Les parents peuvent-ils suivre les performances de leur enfant sur Acces-Sec ?",
      answer:
        "Oui, Acces-Sec oƯre un suivi personnalisé pour les parents, avec des rapports sur les performances de leur enfant, incluant les scores obtenus et les sections à améliorer dans chaque matière.",
    },
    {
      question: "Est-ce que l'utilisation d'Acces-Sec est payante ?",
      answer: `Acces-Sec propose la fonctionnalité "simulation gratuite" pour vous oƯrir un essai. Un paiement est requis pour ouvrir l'accès aux simulations complètes d'examens qui oƯrent des tests plus exhaustifs, vous permettant de recevoir des rapports détaillés.`,
    },
    {
      question: "Les questions sont-elles conformes aux examens réels ?",
      answer:
        "Oui, les questions sont spécialement conçues pour être en conformité avec le programme scolaire et les examens d'admission réels, garantissant ainsi une préparation optimale.",
    },
  ];

  return (
    <section className="py-5 px-5 md:px-[200px] flex flex-col md:flex-row">
      <div className="md:w-[35%]">
        <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold">
          Questions fréquentes
        </h1>
      </div>
      <div className="flex flex-col md:w-[65%]">
        {faqData.map((item, index) => (
          <div key={index} className="md:ml-[100px]  mb-4">
            <div className="border-b border-[#e7e9eb] py-5">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold flex-grow pr-4">
                  {item.question}
                </h1>
                <img
                  onClick={() => toggleFAQ(index)}
                  src={
                    openIndex === index
                      ? "/images/minus_btn.png"
                      : "/images/plus_btn.png"
                  }
                  alt="Toggle"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
              {openIndex === index && (
                <p className="font-quicksand max-w-[700px] text-[14px] font-normal py-5 text-[#0D1216]">
                  {item.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
