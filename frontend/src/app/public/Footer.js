import React from 'react'

export const Footer = () => {
    return (
        <>
            <div className='bg-[#0772AA]'>
                <div className='flex flex-col items-center m-auto py-[50px] gap-5'>
                    <div className='flex flex-col md:flex-row gap-5 md:gap-[50px] '>
                        <button className="text-[18px] md:text-[26px] font-quicksand font-normal text-white ">
                            Free Simulator
                        </button>
                        <button className="text-[18px] md:text-[26px] font-quicksand font-normal text-white ">
                            Products
                        </button>
                        <button className="text-[18px] md:text-[26px] font-quicksand font-normal text-white ">
                            About Us
                        </button>
                        <button className="text-[18px] md:text-[26px] font-quicksand font-normal text-white ">
                            Contact Us
                        </button>
                    </div>
                    <div className='max-w-[500px] md:max-w-[700px] px-5 text-white font-light text-[16px] md:text-[20px] font-quicksand text-center'>Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde. </div>
                    <div className='flex flex-row gap-5'>
                        <img
                            src="/images/facebook.svg"
                            alt="facebook"
                        />
                        <img
                            src="/images/twitter.svg"
                            alt="twitter"
                        />
                        <img
                            src="/images/linkdin.svg"
                            alt="linkdin"
                        />
                        <img
                            src="/images/instragram.svg"
                            alt="instragram"
                        />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='rounded-tr-[50px] w-[45%] h-[52px] bg-[#FE8840]'></div>
                    <div className='rounded-tl-[50px] w-[45%] h-[52px] bg-[#FE8840]'></div>
                </div>
            </div>
        </>
    )
}
