import React from "react";

export const PercentofParent = () => {
  const testimonials = [
    {
      testimonial:
        "Acces-Sec permis à ma fille de s'exercer à son propre rythme et les retours détaillés ont vraiment fait la différence dans sa préparation. Elle est plus confiante et prête pour les examens. Un grand merci à l’équipe d’Acces-Sec !",
      author: "Nathalie B., mère d'Elise",
    },
    {
      testimonial:
        "Ma fille a adoré l'expérience Acces-Sec ! Elle a pu pratiquer sans pression et voir immédiatement où elle devait s'améliorer. C'est un excellent outil pour tous les parents qui veulent aider leurs enfants à se préparer efficacement.",
      author: "François D., père de Léonie",
    },
    {
      testimonial:
        "Acces-Sec a rendu la préparation des examens plus interactive et moins stressante pour mon enfant. Il a adoré l’aspect ludique des simulations et le fait de pouvoir réessayer plusieurs fois. Cela l’a aidé à rester motivé !",
      author: "Sébastien M., père d'Alexandre",
    },
  ];

  return (
    <section className="flex flex-col items-center bg-[#398EBB] py-[50px]">
      <div className="py-5 md:max-w-[60%] m-auto">
        <h1 className="text-[25px] md:text-[40px] font-poppins font-bold text-white text-center">
          {" "}
          Ils ont testé Acces-Sec : découvrez leurs témoignages !
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center m-auto gap-5 py-5">
        {testimonials?.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-[90%] md:max-w-[30%] bg-white rounded-3xl py-5 px-5 flex flex-col "
          >
            <img
              className="w-[40px] h-[30px]"
              src="/images/percentage_parent.png"
              alt="Acces"
            />
            <p className="text-[16px] md:text-[20px] font-quicksand font-normal text-[#0D1216] py-5">
              {testimonial?.testimonial}
            </p>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-[16px] md:text-[20px] font-quicksand font-bold">
                {testimonial?.author}
              </h1>
              <img
                className="w-[106px] h-[18px] object-contain"
                src="/images/rating.png"
                alt="Acces"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
