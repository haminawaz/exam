"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function page() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [testId, setTestId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (quizStarted) {
      if (timer > 0) {
        const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(countdown);
      } else {
        handleNext();
      }
    }
  }, [timer]);

  const handleNext = () => {
    if (!questions[currentQuestion]) return;
    const response = {
      question: questions[currentQuestion]?._id,
      selectedAnswer: selected,
      isCorrect: selected === questions[currentQuestion]?.correct,
    };
    setUserResponses((prevResponses) => [...prevResponses, response]);
    if (selected === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
    }
    if (currentQuestion < questions.length - 1) {
      setSelected(null);
      setTimer(60);
    }
  };

  useEffect(() => {
    if (quizCompleted) {
      sendResults(userResponses);
    }
  }, [quizCompleted, userResponses]);

  const sendResults = async () => {
    try {
      const requestBody = {
        responses: userResponses,
        testId,
      };
      const response = await fetch(`${serverBaseUrl}/user/question/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      if (response.ok) {
        setTestId(null);
      } else {
        console.error("Failed to save results:", responseData.error);
      }
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return router.push("/access-simulator");
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authorization token found");
          return;
        }

        const response = await fetch(`${serverBaseUrl}/user/question/paid`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          const questions = responseData?.response?.data?.questions || [];
          setUserResponses([]);
          setTestId(responseData?.response?.data?.testId);
          setQuestions(questions);
          setTimer(60);
          setQuizStarted(true);
        } else if (response.status === 404) {
          setQuestions([]);
        } else {
          console.error("Failed to fetch question");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/access-simulator");
      }
    };

    document.body.onclick = checkToken;
    document.body.onscroll = checkToken;

    return () => {
      document.body.onclick = null;
      document.body.onscroll = null;
    };
  }, []);

  return (
    <>
      <section className="bg-[#f9f9f9] py-5">
        <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto ">
          <div className="bg-white mx-5 md:mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px] rounded-lg text-center">
            {questions && questions.length > 1 ? (
              quizCompleted ? (
                <div>
                  <h1 className="text-2xl font-bold">Test complété</h1>
                  <p className="text-lg font-semibold">
                    Ton score: {score}/{questions.length}
                  </p>
                  {(score / questions.length) * 100 >= 70 ? (
                    <>
                      <img
                        src="/images/quiz/good.png"
                        alt="Success"
                        className="m-auto mt-5"
                      />
                      <h1 className="text-[18px] md:text-[22px] font-poppins font-bold text-center mt-3">
                        Congratulations, you did well!
                      </h1>
                    </>
                  ) : (
                    <>
                      <img
                        src="/images/quiz/bad.png"
                        alt="Success"
                        className="m-auto mt-5"
                      />
                      <h1 className="text-[18px] md:text-[22px] font-poppins font-bold text-center mt-3">
                        Tu dois t'exercer encore. Tu es capable!
                      </h1>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center relative gap-[50px]">
                    <img
                      src="/images/quiz/timer.png"
                      alt="Timer"
                      className="w-auto h-auto"
                    />
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
                      {timer}
                    </p>
                  </div>

                  <p className="text-[18px] md:text-[22px] font-poppins font-bold text-[#000] py-5">
                    {questions[currentQuestion]?.question}
                  </p>

                  {questions[currentQuestion]?.image && (
                    <div className="flex items-center justify-center relative gap-[50px]">
                      <img
                        src={questions[currentQuestion]?.image}
                        alt={`${questions[currentQuestion]?.image}`}
                        className=""
                      />
                    </div>
                  )}

                  <div className="bg-white m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px] mt-5 rounded-lg mb-5 flex flex-col justify-center items-center">
                    {questions[currentQuestion]?.options?.map(
                      (option, index) => (
                        <div
                          key={option}
                          onClick={() => setSelected(option)}
                          className={`flex flex-row gap-[50px] mt-1 rounded-md transition duration-300 cursor-pointer ${
                            selected === option
                              ? "bg-[#cde3ee]"
                              : "hover:bg-[#cde3ee]"
                          } items-center p-3`}
                        >
                          <h1 className="text-[18px] md:text-[22px] font-poppins font-bold text-[#000]">
                            {String.fromCharCode(
                              65 + index
                            ).toLocaleLowerCase()}
                            ) {option}
                          </h1>
                        </div>
                      )
                    )}
                  </div>

                  <div className="items-center flex flex-col justify-center">
                    <div className="flex items-center justify-center relative gap-[50px]">
                      <button
                        onClick={handleNext}
                        className="bg-black text-white px-4 py-1 rounded-[10px] cursor-pointer"
                        disabled={!selected}
                      >
                        {currentQuestion === questions.length - 1
                          ? "Finish"
                          : "suivant"}
                      </button>
                    </div>

                    <div className="mt-5">
                      <p className="text-[14px] font-quicksand font-semibold text-center">
                        Question {currentQuestion + 1} of {questions.length}
                      </p>
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="my-5">
                <h1 className="text-2xl font-bold">No Questions Found</h1>
                <p className="text-lg font-semibold">Please try again later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
