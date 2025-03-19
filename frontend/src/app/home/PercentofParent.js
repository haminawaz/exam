import React from 'react'

export const PercentofParent = () => {
  return (
    <section className='flex flex-col items-center bg-[#398EBB] py-[50px]'>
      <div className='py-5 md:max-w-[60%] m-auto'>
        <h1 className='text-[25px] md:text-[40px] font-poppins font-bold text-white text-center'>95% of parents said their children enjoy using Acces-Sec</h1>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center m-auto gap-5 py-5'>
        <div className='max-w-[90%] md:max-w-[30%] bg-white rounded-3xl py-5 px-5 flex flex-col '>
          <img
            className='w-[40px] h-[30px]'
            src="/images/percentage_parent.png"
            alt="Acces"
          />
          <p className='text-[16px] md:text-[20px] font-quicksand font-normal text-[#0D1216] py-5'>Acces-Sec has been a game-changer for my 7-year-old! The adaptive games make learning enjoyable, and the personalized practice sheets are a lifesaver. </p>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-[16px] md:text-[20px] font-quicksand font-bold'>Emily Halter</h1>
            <img
              className='w-[106px] h-[18px] object-contain'
              src="/images/rating.png"
              alt="Acces"
            />
          </div>
        </div>

        <div className='max-w-[90%] md:max-w-[30%] bg-white rounded-3xl py-5 px-5 flex flex-col '>
          <img
            className='w-[40px] h-[30px]'
            src="/images/percentage_parent.png"
            alt="Acces"
          />
          <p className='text-[16px] md:text-[20px] font-quicksand font-normal text-[#0D1216] py-5'>Acces-Sec has been a game-changer for my 7-year-old! The adaptive games make learning enjoyable, and the personalized practice sheets are a lifesaver. </p>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-[16px] md:text-[20px] font-quicksand font-bold'>Emily Halter</h1>
            <img
              className='w-[106px] h-[18px] object-contain'
              src="/images/rating.png"
              alt="Acces"
            />
          </div>
        </div>

        <div className='max-w-[90%] md:max-w-[30%] bg-white rounded-3xl py-5 px-5 flex flex-col '>
          <img
            className='w-[40px] h-[30px]'
            src="/images/percentage_parent.png"
            alt="Acces"
          />
          <p className='text-[16px] md:text-[20px] font-quicksand font-normal text-[#0D1216] py-5'>Acces-Sec has been a game-changer for my 7-year-old! The adaptive games make learning enjoyable, and the personalized practice sheets are a lifesaver. </p>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-[16px] md:text-[20px] font-quicksand font-bold'>Emily Halter</h1>
            <img
              className='w-[106px] h-[18px] object-contain'
              src="/images/rating.png"
              alt="Acces"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
