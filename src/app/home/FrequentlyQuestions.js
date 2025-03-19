"use client";
import React, { useState } from 'react'

export const FrequentlyQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqData = [
    {
      question: "What is Acces-Sec, and how does it work?",
      answer:
        "Acces-Sec is a gamified learning app designed for children. It transforms educational content into engaging games across various subjects. The app adapts to each child's learning style, providing a personalized and interactive learning experience.",
    },
    {
      question: "Is Acces-Sec suitable for all age groups?",
      answer:
        "The subscription model offers monthly and yearly plans. Users get unlimited access to all educational content with personalized recommendations.",
    },
    {
      question: "How does Acces-Sec ensure my child's safety while using the app?",
      answer:
        "The subscription model offers monthly and yearly plans. Users get unlimited access to all educational content with personalized recommendations.",
    },
    {
      question: "Can parents track their child's progress on Acces-Sec?",
      answer:
        "The subscription model offers monthly and yearly plans. Users get unlimited access to all educational content with personalized recommendations.",
    },
    {
      question: "Are there any costs associated with using Acces-Sec?",
      answer:
        "The subscription model offers monthly and yearly plans. Users get unlimited access to all educational content with personalized recommendations.",
    },
  ];

  return (
    <section className='py-5 px-5 md:px-[200px] flex flex-col md:flex-row'>
      <div className='md:w-[35%]'>
        <h1 className='text-[25px] md:text-[40px] font-poppins  font-bold'>Frequently Asked Questions</h1>
      </div>
      <div className='flex flex-col md:w-[65%]'>
        {faqData.map((item, index) => (
          <div key={index} className="md:ml-[100px]  mb-4">
            <div className="border-b border-[#e7e9eb] py-5">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-[18px] md:text-[22px] font-poppins  font-bold flex-grow pr-4">{item.question}</h1>
                <img
                  onClick={() => toggleFAQ(index)}
                  src={openIndex === index ? "/images/minus_btn.png" : "/images/plus_btn.png"}
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
  )
}
