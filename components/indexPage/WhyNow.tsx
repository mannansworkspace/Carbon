import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';

import WhyNowBg from 'assets/images/why-now.jpg';

const WhyNow: FC = () => {

	return (
		<div
			id='whyNow'
			className='why-now-bg min-h-screen pt-[48px] pb-[32px] px-[24px] md:pt-[96px] md:pb-[64px] md:px-[70px] text-[#E4EEE4] relative flex flex-col justify-center'
      data-aos="fade-up" data-aos-delay="0" data-aos-offset="80" data-aos-duration="1800"
    >
      {/* <Image className='-z-10 select-none' src={WhyNowBg} layout='fill' objectFit='cover' unoptimized={true} /> */}
      <div>
        <div className='container py-0 mx-auto'>
          <h1 className='ca-sec-heading text-[#E4EEE4] mb-[20px]' data-aos="fade-in" data-aos-delay="100">
            Why Now?
          </h1>
          <div className='max-w-4xl select-none'>
            <p className='font-[satoshi] font-normal text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px]'
             data-aos="fade-in" data-aos-delay="100"
             >
              The changing market landscape and the evolution of climate policy reinforce the VCM as a viable investment opportunity today.
            </p>
            <p className='font-[satoshi] font-normal text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px]'
             data-aos="fade-in" data-aos-delay="150"
             >
              Carbon pricing systems have now become a cornerstone of energy transition policies.
            </p>
            <p className='font-[satoshi] font-normal text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px]'
             data-aos="fade-in" data-aos-delay="200"
             >
              Robust and future-ready infrastructure is needed for the VCM to realize its growth potential.
            </p>
            <p className='font-[satoshi] font-normal text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px]'
             data-aos="fade-in" data-aos-delay="250"
             >
              Various actors have started developing new solutions; however, these remain inaccessible to a broad spectrum of willing participants.
            </p>
            <p className='font-[satoshi] font-normal text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px]'
             data-aos="fade-in" data-aos-delay="300"
             >
              The Gaia protocol harnesses the power of decentralized consensus to reduce barriers to entry, improve market efficiency, and increase transparency on carbon credit provenance and pricing.
            </p>
          </div>
          <div className='md:flex mt-[48px] select-none'>
            <div className='flex flex-col md:mr-[24px]' data-aos="fade-up" data-aos-delay="100">
              <span className='text-[64px] lg:text-[96px] font-[iskry]'>98mt</span>
              <span
                className='text-[14px] lg:text-[16px] font-[satoshi] max-w-[16rem] md:max-w-[20rem]'
                style={{ color: 'rgba(228, 238, 228, 0.8)' }}
              >
                VCCs retired, of the 178mt issued in 2020, more than twice as much as in 2017.
              </span>
            </div>
            <div className='flex flex-col md:mr-[24px] mt-[24px] md:mt-0'  data-aos="fade-up" data-aos-delay="200">
              <span className='text-[64px] lg:text-[96px] font-[iskry]'>3&times;</span>
              <span
                className='text-[14px] lg:text-[16px] font-[satoshi] max-w-[16rem] md:max-w-[13rem]'
                style={{ color: 'rgba(228, 238, 228, 0.8)' }}
              >
                Growth of the VCM in 2021, now over $1bn in market value.
              </span>
            </div>
            <div className='flex flex-col mt-[24px] md:mt-0' data-aos="fade-up" data-aos-delay="300">
              <span className='text-[64px] lg:text-[96px] font-[iskry]'>$180bn</span>
              <span
                className='text-[14px] lg:text-[16px] font-[satoshi] max-w-[16rem] md:max-w-[20rem]'
                style={{ color: 'rgba(228, 238, 228, 0.8)' }}
              >
                2030 VCM value as forecasted by the Taskforce on Scaling Voluntary Carbon Markets.
              </span>
            </div>
          </div>
          <div className='banner-bttns'>
            <Link href='/offset'>
              <a>
                <button className='ca-primary-btn'  data-aos="fade-up" data-aos-delay="300">Buy GAIA</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
		</div>
	);
};

export default WhyNow;
