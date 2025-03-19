"use client"
import React from "react";
import { UserAuthContext } from "../contexts/auth-context";
import { DictionariesContext } from "../contexts/dictionary-context";

export const WhyChoose = () => {
   const { lng } = UserAuthContext();
    const { dictionaries } = DictionariesContext();
  return (
    <section className=" bg-[#398EBB] w-[100%]">
      <div className="">
        <img className=" top-1 left-1 p-5" src="/images/d.png" alt="Top Left" />
      </div>
      <div className="flex flex-col items-center">
        <div className="py-5">
          <h1 className="font-poppins text-[25px] md:text-[40px] font-bold text-white text-center">
           
            {dictionaries?.Why_Choose_Acces_Sec}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center m-auto gap-5 py-5">
          <div className="max-w-[90%] md:w-[350px] lg:w-[400px] md:p-[26px] md:h-[658px] lg:h-[480px] bg-white rounded-xl  text-center border border-[#FE8840] flex flex-col items-center">
            <img
              className="w-[400px] h-[170px] p-0"
              src="/images/teacher.png"
              alt="Acces"
            />
            <h1 className="text-[18px] md:text-[22px] font-bold pt-5 font-poppins">
            {dictionaries?.Experienced_teacher}
            </h1>
            <p className="text-[16px] md:text-[20px] font-quicksand font-normal text-[#62605b] py-5">
            {dictionaries?.Instructors_from_all_over_Vietnam_and_around_the_world_providing_quality_learning_experiences_and_helping_students_develop_their_full_potential}
            </p>
          </div>
          <div className="max-w-[90%] md:w-[350px] lg:w-[400px] md:p-[26px] md:h-[658px] lg:h-[480px] bg-white rounded-xl  text-center border border-[#FE8840] flex flex-col items-center">
            <img
              className="w-[400px] h-[170px] p-0"
              src="/images/program.png"
              alt="Acces"
            />
            <h1 className="text-[18px] md:text-[22px] font-bold px-5 pt-5 font-poppins">
            {dictionaries?.Creative_program}
            </h1>
            <p className="text-[16px] md:text-[20px] font-quicksand  font-normal text-[#62605b] py-5 px-5">
              Flexible payment, suitable to personal financial situation and
              study schedule. Pay monthly, by course or “study now, pay later”
            </p>
          </div>
          <div className="max-w-[90%] md:w-[350px] lg:w-[400px] md:p-[26px] md:h-[658px] lg:h-[480px] bg-white rounded-xl px-5 text-center border border-[#FE8840] flex flex-col items-center">
            <img
              className="w-[400px] h-[170px] p-0"
              src="/images/cost.png"
              alt="Acces"
            />
            <h1 className="text-[18px] md:text-[22px] font-bold px-5 pt-5 font-poppins">
              Appropriate cost
            </h1>
            <p className="text-[16px] md:text-[20px] font-quicksand  font-normal text-[#62605b] py-5 px-5">
              Thiết kế giáo trình dựa trên năng lực và nhu cầu từng học viên,
              hoạt động học tập hấp dẫn, tương tác 2 chiều liên tục.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <img className=" right-0 p-5" src="/images/pi.png" alt="Top Left" />
      </div>
    </section>
  );
};
