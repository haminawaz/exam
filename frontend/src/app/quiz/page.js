"use client";
import React, { useEffect, useState } from "react";

const questions = [
  {
    question: "What comes after 2 and before 4?",
    options: ["Zero", "Three", "One"],
    correct: "Three",
  },
  { question: "What is 5 + 3?", options: ["6", "8", "10"], correct: "8" },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris"],
    correct: "Paris",
  },
  { question: "Solve: 12 ÷ 4", options: ["2", "3", "4"], correct: "3" },
  { question: "What is 7 x 6?", options: ["42", "36", "48"], correct: "42" },
  {
    question: "Translate 'Bonjour' to English",
    options: ["Hello", "Goodbye", "Thank you"],
    correct: "Hello",
  },
  { question: "Solve: 15 - 7", options: ["9", "8", "7"], correct: "8" },
  { question: "What is 20 ÷ 5?", options: ["2", "4", "5"], correct: "4" },
  {
    question: "Translate 'Merci' to English",
    options: ["Sorry", "Thanks", "Please"],
    correct: "Thanks",
  },
  { question: "What is 9 + 6?", options: ["15", "16", "17"], correct: "15" },
];
export default function page() {
  const [name, setName] = useState("");
  // const [selected, setSelected] = useState(null);
  const avatars = [
    "/images/choose-avatar/girl_11.png",
    "/images/choose-avatar/girl_13.png",
    "/images/choose-avatar/girl_12.png",
    "/images/choose-avatar/girl_14.png",
    "/images/choose-avatar/girl_15.png",
    "/images/choose-avatar/boy_13.png",
    "/images/choose-avatar/boy_14.png",
    "/images/choose-avatar/boy_12.png",
    "/images/choose-avatar/boy_13.png",
    "/images/choose-avatar/boy_11.png",
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      handleNext();
    }
  }, [timer]);

  const handleNext = () => {
    if (selected === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setTimer(60);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelected(null);
      setTimer(60);
    }
  };
  return (
    <>
      <section className="bg-[#f9f9f9] pb-5">
        <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto ">
          <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-[#000000] text-center py-5">
            Welcome Student!
          </h1>
          <div className="bg-white mx-[40px] md:mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px]">
            <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-5">
              Choose your favorite avatar
            </p>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-24 h-24 cursor-pointer  hover:border-gray-500 transition"
                    onClick={() => setSelectedAvatar(avatar)}
                  />
                ))}
              </div>
            </div>
            <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-2 pt-5">
              Choose your Nick Name
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={name ? "" : "Emile"}
              className="w-full h-12 px-4 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] text-center placeholder:text-center focus:outline-none"
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <img src={selectedAvatar} alt="Farrukh" className="" />
              <p className="text-[14px] font-quicksand font-bold text-[#000000] text-center">
                Wohoo! Emile Your Profile has been updated
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-5">
        <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto ">
          {/* <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-[#000000] text-center py-5">
            Levels
          </h1>
          <div className="flex flex-row gap-1 justify-center">
            <img src="/images/star_1.png" alt="Acces" />
            <img src="/images/star_1.png" alt="Acces" />
            <img src="/images/star_1.png" alt="Acces" />
            <img src="/images/star_1.png" alt="Acces" />
            <img src="/images/star_2.png" alt="Acces" />
          </div>
          <img
            src="/images/quiz/stepper.png"
            alt="Acces"
            className="max-w-[60%] m-auto my-5"
          /> */}
          {/* <p className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000] text-center py-5">
            Current Level : 1
          </p>
          <div className="flex flex-row gap-1 justify-center items-center">
            <div className="border border-[#FE8840] rounded-xl py-2 px-5">
              <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000]">
                Choose Your Sections
              </h1>
              <div className="flex flex-row gap-2 justify-center mt-2">
                <button className="primary-btn bg-[#FE8840] text-white text-[16px] font-normal px-3 rounded-lg cursor-pointer transition">
                  Math
                </button>
                <button className="primary-btn text-[#FE8840] px-3 border text-[16px] font-normal border-[#FE8840] rounded-lg cursor-pointer transition">
                  French
                </button>
              </div>
            </div>
            <div className="border border-[#FE8840] rounded-xl py-2 px-5">
              <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000]">
                Choose Your Sections
              </h1>
              <div className="flex flex-row gap-2 justify-center mt-2">
                <button className="primary-btn bg-[#FE8840] text-white text-[16px] font-normal px-3 rounded-lg cursor-pointer transition">
                  Math
                </button>
                <button className="primary-btn text-[#FE8840] px-3 border text-[16px] font-normal border-[#FE8840] rounded-lg cursor-pointer transition">
                  French
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <p className="text-[14px] font-quicksand font-normal">
              Section Chosen : <span className="font-bold font-quicksand">Math</span>
            </p>
            <p className="text-[14px] font-quicksand font-normal">
              Subsection Chosen : <span className="font-bold"> Algebra</span>
            </p>
          </div> */}
          <div className="bg-white mx-5 md:mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px] rounded-lg text-center">
            {quizCompleted ? (
              <div>
                <h1 className="text-2xl font-bold">Quiz Completed!</h1>
                <p className="text-lg font-semibold">
                  Your Score: {score}/{questions.length}
                </p>
                <img
                  src="/images/quiz/good.png"
                  alt="Success"
                  className="m-auto mt-5"
                />
                <h1 className="text-[18px] md:text-[22px] font-poppins font-bold text-center mt-3">
                {score >= 7 ? "Congratulations, you did well!" : "You must try again, you can do it!"}
                </h1>
              </div>
            ) : (
              <>
                <p className="text-[18px] md:text-[22px] font-poppins font-bold text-[#000] py-5">
                  {questions[currentQuestion].question}
                </p>

                <div className="bg-white m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px] mt-5 rounded-lg mb-5 flex flex-col justify-center items-center">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={option}
                      onClick={() => setSelected(option)}
                      className={`flex flex-row gap-[50px] mt-1 rounded-md transition duration-300 cursor-pointer ${selected === option
                        ? "bg-[#cde3ee]"
                        : "hover:bg-[#cde3ee]"
                        } items-center p-3`}
                    >
                      <h1 className="text-[30px] font-bold">
                        {String.fromCharCode(65 + index)}.) {option}
                      </h1>
                    </div>
                  ))}
                </div>

                <div className="items-center flex flex-col justify-center">
                  <div className="flex items-center justify-center relative gap-[50px]">
                    <button
                      onClick={handleBack}
                      className="bg-black text-white px-4 py-1 rounded-[10px]"
                      disabled={currentQuestion === 0}
                    >
                      Back
                    </button>

                    <div className="relative">
                      <img
                        src="/images/quiz/timer.png"
                        alt="Timer"
                        className="w-auto h-auto"
                      />
                      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
                        {timer}
                      </p>
                    </div>

                    <button
                      onClick={handleNext}
                      className="bg-black text-white px-4 py-1 rounded-[10px]"
                    >
                      {currentQuestion === questions.length - 1
                        ? "Finish"
                        : "Next"}
                    </button>
                  </div>

                  <div className="mt-5">
                    <p className="text-[14px] font-quicksand font-semibold text-center">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// "use client";
// import React, { useState } from "react";

// export default function page() {
//   const [name, setName] = useState("");
//   const [selected, setSelected] = useState(null);
//   const avatars = [
//     "/images/choose-avatar/girl_11.png",
//     "/images/choose-avatar/girl_13.png",
//     "/images/choose-avatar/girl_12.png",
//     "/images/choose-avatar/girl_14.png",
//     "/images/choose-avatar/girl_15.png",
//     "/images/choose-avatar/boy_13.png",
//     "/images/choose-avatar/boy_14.png",
//     "/images/choose-avatar/boy_12.png",
//     "/images/choose-avatar/boy_13.png",
//     "/images/choose-avatar/boy_11.png",
//   ];
//   return (
//     <>
//       <section className="bg-[#f9f9f9] pb-5">
//         <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto ">
//           <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-[#000000] text-center py-5">
//             Choose your favorite Avatar
//           </h1>
//           <div className="bg-white mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px]">
//             <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-5">
//               Choose your favorite avatar
//             </p>
//             <div className="flex justify-center">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
//                 {avatars.map((avatar, index) => (
//                   <img
//                     key={index}
//                     src={avatar}
//                     alt={`Avatar ${index + 1}`}
//                     className="w-24 h-24 cursor-pointer hover:border-gray-500 transition"
//                   />
//                 ))}
//               </div>
//             </div>
//             <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-2 pt-5">
//               Choose your Nick Name
//             </p>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder={name ? "" : "Emile"}
//               className="w-full h-12 px-4 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] text-center placeholder:text-center focus:outline-none"
//             />
//             <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//               <img
//                 src="/images/choose-avatar/girl_14.png"
//                 alt="Farrukh"
//                 className=""
//               />
//               <p className="text-[14px] font-quicksand font-bold text-[#000000] text-center">
//                 Wohoo! Emile Your Profile has been updated
//               </p>
//             </div>
//           </div>
//           <h1 className="py-2 text-[40px] text-white"></h1>
//         </div>
//       </section>

//       <section className="bg-[#f9f9f9] pt-5">
//         <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto ">
//           {/* <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-[#000000] text-center py-5">
//             Levels
//           </h1>
//           <div className="flex flex-row gap-1 justify-center">
//             <img src="/images/star_1.png" alt="Acces" />
//             <img src="/images/star_1.png" alt="Acces" />
//             <img src="/images/star_1.png" alt="Acces" />
//             <img src="/images/star_1.png" alt="Acces" />
//             <img src="/images/star_2.png" alt="Acces" />
//           </div>
//           <img
//             src="/images/quiz/stepper.png"
//             alt="Acces"
//             className="max-w-[60%] m-auto my-5"
//           /> */}
//           {/* <p className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000] text-center py-5">
//             Current Level : 1
//           </p>
//           <div className="flex flex-row gap-1 justify-center items-center">
//             <div className="border border-[#FE8840] rounded-xl py-2 px-5">
//               <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000]">
//                 Choose Your Sections
//               </h1>
//               <div className="flex flex-row gap-2 justify-center mt-2">
//                 <button className="primary-btn bg-[#FE8840] text-white text-[16px] font-normal px-3 rounded-lg cursor-pointer transition">
//                   Math
//                 </button>
//                 <button className="primary-btn text-[#FE8840] px-3 border text-[16px] font-normal border-[#FE8840] rounded-lg cursor-pointer transition">
//                   French
//                 </button>
//               </div>
//             </div>
//             <div className="border border-[#FE8840] rounded-xl py-2 px-5">
//               <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000]">
//                 Choose Your Sections
//               </h1>
//               <div className="flex flex-row gap-2 justify-center mt-2">
//                 <button className="primary-btn bg-[#FE8840] text-white text-[16px] font-normal px-3 rounded-lg cursor-pointer transition">
//                   Math
//                 </button>
//                 <button className="primary-btn text-[#FE8840] px-3 border text-[16px] font-normal border-[#FE8840] rounded-lg cursor-pointer transition">
//                   French
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-center justify-center mt-2">
//             <p className="text-[14px] font-quicksand font-normal">
//               Section Chosen : <span className="font-bold font-quicksand">Math</span>
//             </p>
//             <p className="text-[14px] font-quicksand font-normal">
//               Subsection Chosen : <span className="font-bold"> Algebra</span>
//             </p>
//           </div> */}
//           <div className="bg-white mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px] rounded-lg">
//             <p className="text-[18px] md:text-[22px] font-poppins  font-bold text-[#000000] text-center py-5">
//               What comes after 2 and before 4?
//             </p>
//             <img
//               src="/images/quiz/question.png"
//               alt="Acces"
//               className="max-w-[60%] m-auto my-5"
//             />
//           </div>

//           <div className="bg-white mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px] mt-5 rounded-lg mb-5 flex flex-col justify-center items-center">
//             {[
//               { id: "A", text: "Zero", img: "image0.png", gap: "gap-[80px]" },
//               { id: "B", text: "Three", img: "image3.png", gap: "gap-[70px]" },
//               { id: "C", text: "One", img: "image1.png", gap: "gap-[90px]" },
//             ].map((option) => (
//               <div
//                 key={option.id}
//                 onClick={() => setSelected(option.id)}
//                 className={`flex flex-row ${
//                   option.gap
//                 } mt-1 rounded-md transition duration-300 cursor-pointer ${
//                   selected === option.id ? "bg-[#cde3ee]" : "hover:bg-[#cde3ee]"
//                 }`}
//               >
//                 <h1 className="text-[30px] font-bold">
//                   {option.id}.) {option.text}
//                 </h1>
//                 <img
//                   src={`/images/quiz/${option.img}`}
//                   alt="Acces"
//                   className="w-[35px]"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="items-center flex flex-col justify-center">
//             <img src="/images/quiz/good.png" alt="Acces" className="" />
//             <div className="flex items-center justify-center relative gap-[50px]">

//               <button className=" left-1 bg-black text-white px-4 py-1 rounded-[10px]">
//                 Back
//               </button>

//               <div className="relative">
//                 <img
//                   src="/images/quiz/timer.png"
//                   alt="Acces"
//                   className="w-auto h-auto"
//                 />
//                 <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-bold text-lg">
//                   60
//                 </p>
//               </div>

//               <button className=" right-0 bg-black text-white px-4 py-1 rounded-[10px]">
//                 Next
//               </button>
//             </div>
//             <div className="mt-5">
//               <p className="text-[14px] font-quicksand font-medium text-center">
//                 Questions Attempted 50/50
//               </p>
//               <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold text-center mb-[50px]">
//                 Congratulations Level 1 Completed
//               </h1>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
