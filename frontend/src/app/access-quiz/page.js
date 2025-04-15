"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function page() {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [testId, setTestId] = useState(null);
  const [token, setToken] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
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

  const fetchQuestions = async () => {
    setErrors({});
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

      const requestBody = {
        name,
        avatarId: selectedAvatar?._id,
      };

      const response = await fetch(`${serverBaseUrl}/user/question/paid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      if (response.ok) {
        const questions = responseData?.response?.data?.questions || [];
        setUserResponses([]);
        setTestId(responseData?.response?.data?.testId);
        setQuestions(questions);
        setTimer(60);
        setQuizStarted(true);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        }
      } else if (response.status === 404) {
        setQuestions([]);
      } else {
        console.error("Failed to fetch question");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch(`${serverBaseUrl}/user/avatar`);
        const responseData = await response.json();
        if (response.ok) {
          const avatars = responseData?.response?.data || [];
          setAvatars(avatars);
          setSelectedAvatar(avatars[0]);
        } else if (response.status === 404) {
          setAvatars([]);
        } else {
          console.error("Failed to fetch avatars");
        }
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };
    fetchAvatars();
  }, []);

  const handleStartQuiz = () => {
    if (!token) {
      router.push("/access-simulator");
    }
    if (!name || !selectedAvatar || !token) {
      return;
    }
    fetchQuestions();
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/access-simulator");
        setToken(null);
      } else {
        setToken(token);
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
      {!quizStarted ? (
        <section className="bg-[#f9f9f9] py-5">
          <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto py-5">
            <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-[#000000] text-center pb-5">
              Bienvenue!
            </h1>
            <div className="bg-white mx-[40px] md:mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px]">
              <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-5">
                Choisis ton avatar préféré
              </p>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
                  {avatars?.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar?.avatarUrl}
                      alt={`Avatar ${index + 1}`}
                      className="cursor-pointer  hover:border-gray-500 transition w-25"
                      onClick={() => setSelectedAvatar(avatar)}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-2 pt-5">
                Choisis ton pseudonyme
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Emile"
                className="w-full h-12 px-4 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] text-center placeholder:text-center focus:outline-none"
              />
              {!name && (
                <p className="joi-error-message mt-0 mb-3 text-center">
                  Veuillez saisir votre nom
                </p>
              )}
              {errors?.name && (
                <p className="joi-error-message mt-0 mb-3 text-center">
                  {errors?.name[0]}
                </p>
              )}
              {errors?.avatarId && (
                <p className="joi-error-message mt-0 mb-3 text-center">
                  {errors?.avatarId[0]}
                </p>
              )}
              <div className="flex flex-col md:flex-row items-center gap-2">
                <img
                  src={selectedAvatar?.avatarUrl}
                  alt="avtar"
                  className="w-24 h-24"
                />
                <p className="text-[14px] font-quicksand font-bold text-[#000000] text-">
                  Super! {name ? name : "Emile"} Ton profil est mis à jour.
                </p>
              </div>
            </div>
            <button
              onClick={handleStartQuiz}
              className="bg-black text-white px-4 py-2 rounded-[10px] mt-4 mx-auto block cursor-pointer"
            >
              Démarrer le test
            </button>
          </div>
        </section>
      ) : (
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
                          src="/images/quiz/good.gif"
                          alt="Success"
                          className="m-auto mt-5 w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                        />
                        <h1 className="text-[18px] md:text-[22px] font-poppins font-bold text-center mt-3">
                          Félicitaoon, tu as bien réussi ton test. Tu es
                          vraiment bien préparé(e)
                        </h1>
                      </>
                    ) : (
                      <>
                        <img
                          src="/images/quiz/bad.gif"
                          alt="Success"
                          className="m-auto mt-5 w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                        />
                        <h1 className="text-[18px] md:text-[22px] font-poppins font-bold text-center mt-3">
                          Tu dois t'exercer encore. Tu es capable!
                        </h1>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 font-semibold">
                      Niveau : {questions[currentQuestion]?.level}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Matière : {questions[currentQuestion]?.subjectName}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold mb-4">
                      Chapitre : {questions[currentQuestion]?.topicName}
                    </p>

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
                  <h1 className="text-2xl font-bold">
                    Aucune question trouvée
                  </h1>
                  <p className="text-lg font-semibold">
                    Please try again later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
