import Image from 'next/image';
import { FC, useState } from 'react';
import Link from 'next/link';

import Arrow from 'assets/images/arrow.svg';
import ImpactBg from 'assets/images/gaia-project-posiotioning.jpg';
import { Transition } from '@headlessui/react';

const Impact: FC = () => {
	const [tab, setTab] = useState(true);

	return (
		<div
			id="impact"
			className="pt-[48px] md:pt-[96px] pb-[64px] md:pb-[128px] px-[24px] md:px-[70px] text-[#e4eee4] relative min-h-screen flex impact-bg"
     		data-aos="fade-up"
			data-aos-delay="0"
			data-aos-offset="80"
			data-aos-duration="1800"
		>
			{/* <Image className="-z-10 object-cover impact-bg select-none" src={ImpactBg} layout="fill" objectFit="cover" unoptimized={true} /> */}
			<div className="container py-0 mx-auto flex flex-col lg:flex-row lg:gap-12">
				<div className="flex-1 lg:max-w-[595px] select-none">
					<h1 className="ca-sec-heading mb-[10px] text-[#e4eee4]" data-aos="fade-in" data-aos-delay="100">
						Gaia Project Positioning
					</h1>
					<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px] lg:mb-[10px]" data-aos="fade-in" data-aos-delay="100">
						Open, trustless, permissionless networks allow for the opportunity to coordinate collective climate action, optimize incentives, and transact value and information without trusted intermediaries.
					</p>
					<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px] lg:mb-[10px]" data-aos="fade-in" data-aos-delay="150">
						Various protocols, prima facie, aim to tackle a similar set of challenges to Gaia.
					</p>
					<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[21.6px] mb-[20px] lg:mb-[10px]" data-aos="fade-in" data-aos-delay="200">
						We recognize 2 categories of entwined issues plaguing current approaches; while one should commend the motivation to be part of the solution, misaligned incentives hamper adoption, engender suspicion about motives and create unhelpful publicity.
          </p>
          <div className="mt-[32px] lg:mt-[42px]">
						<Link href="/whitepaper">
							<a>
								<button className="py-[12px] px-[24px] rounded-[45px] text-[#EF913A] font-[Satoshi] text-[18px] md:text-[24px] leading-[23px] md:leading-[28.8px]" style={{background: 'rgba(38, 44, 38, 0.8)'}} data-aos="fade-up" data-aos-delay="100">
                  View whitepaper
								</button>
							</a>
						</Link>
					</div>
					<div className="my-[18px] lg:mt-[24px] lg:mb-0">
						<Link href="/offset">
							<a>
								<button className="ca-primary-btn" data-aos="fade-up" data-aos-delay="100">
									Buy GAIA
								</button>
							</a>
						</Link>
					</div>
				</div>
				<div className="flex-1 lg:overflow-hidden flex flex-col lg:flex-row border-t-2 lg:border-t-0 lg:border-l-2 border-[#ffffff87] select-none" data-aos="fade-up" data-aos-delay="400">
					<div className={`${tab ? 'is-expanded' : 'min-h-[77px] h-[77px] lg:h-auto lg:w-[96px]'} font-[satoshi] flex flex-col lg:flex-row border-b-2 lg:border-b-0 lg:border-r-2 border-[#ffffff87] relative lg:overflow-hidden transition-all duration-500 ease-out project-info-section`}>
						<div
							className="flex flex-row-reverse justify-between items-center cursor-pointer py-[24px] lg:py-[48px] lg:px-[48px] lg:flex-row lg:justify-start vertical-text lg:w-[96px] lg-max-w-[96px]"
							onClick={() => setTab(!tab)}
						>
							<div className={`${tab ? '-rotate-90 lg:rotate-180 lg:pt-[48px]' : 'rotate-90 lg:rotate-0 lg:pb-[48px]'} flex justify-center items-center`}>
								<Image src={Arrow} alt="Arrow" width={24} height={24} unoptimized={true} />
							</div>
							<h3 className="text-[24px] leading-[28.8px] font-[satoshi]">2-way functionality</h3>
						</div>
						{tab && (
							<div className={`${tab ? 'pb-[24px] lg:pr-[48px] lg:w-full' : 'h-0 lg:h-auto lg:w-0  lg:pr-[0px]'} lg:pb-0 lg:pt-[96px] overflow-hidden transition-all duration-500 ease-out lg:max-h-[1800px]`}>
								<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[21.6px] mb-[10px]">
									There has been no effort to create fungibility and interoperability between on-chain and off-chain expressions of, at times, identical asset backing. Gaia will deliver seamless intra-protocol bridging between the on-chain market and an off-chain tether, targeting to anchor benchmark pricing in traditional markets with our on-chain anchor.
								</p>
								<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[21.6px] mb-[10px]">
									Gaia token holders will eventually be able to deliver the TCO2e underlying the GAIA tokens into contracts trading in the off-chain world. Concurrently, any holder of credits satisfying specific specs (and we are purposefully teasing a DAO) shall be able to have tokens minted and delivered on-chain.
								</p>
								<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[21.6px] mb-[10px]">
									The difference with existing efforts will lie in the 2-way functionality of Gaia. We view that off-chain fungibility will create a credible price backstop and synergistically attract more on-chain activity, strengthening our eventually decentralized protocol.
								</p>
							</div>
						)}
					</div>
					<div className={`${!tab ? 'is-expanded' : 'min-h-[77px] h-[77px] lg:h-auto lg:w-[96px]'} font-[satoshi] flex flex-col lg:flex-row border-b-2 lg:border-b-0 lg:border-r-2 border-[#ffffff87] relative lg:overflow-hidden transition-all duration-500 ease-out`}>
						<div
							className="flex flex-row-reverse justify-between items-center cursor-pointer py-[24px] lg:py-[48px] lg:px-[48px] lg:flex-row lg:justify-start vertical-text lg:w-[96px] lg-max-w-[96px]"
							onClick={() => setTab(!tab)}
						>
							<div className={`${!tab ? '-rotate-90 lg:rotate-180 lg:pt-[48px]' : 'rotate-90 lg:rotate-0 lg:pb-[48px]'} flex justify-center items-center`}>
								<Image src={Arrow} alt="Arrow" width={24} height={24} unoptimized={true} />
							</div>
							<h3 className="text-[24px] leading-[28.8px] font-[satoshi]">High quality credits</h3>
						</div>
						{!tab && (
							<div className={`${!tab ? 'pb-[24px] lg:pr-[48px] lg:w-full' : 'h-0 lg:h-auto lg:w-0 lg:pr-[0px]'} lg:pb-0 lg:pt-[96px] overflow-hidden transition-all duration-500 ease-out lg:max-h-[1800px]`}>
								<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[21.6px] mb-[10px]">
									1-way flow has allowed protocols to take advantage of the community’s willingness to embrace well-marketed, optically well-intentioned efforts by pre-positioning in
									substandard quality VCCs.
								</p>
								<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[21.6px] mb-[10px]">
									Pools with a wide range of acceptable VCC specifications, enforce Gresham’s law (low quality assets crowding out high quality assets), by causing warped price
									signals for exactly the projects that should not be scaled. Low quality VCCs outperform with windfall profits for unscrupulous actors while a wary public experience
									its desire for climate positive action being taken advantage of.
								</p>
								<p className="font-[satoshi] text-[16px] lg:text-[18px] leading-[21.6px] mb-[10px]">
									Gaia will initially present high-quality carbon credits with N-GEO equivalent specification or better, so as to elicit a strong sense of community trust, position
									in the market segment where maximum impact is expected and anticipate the standards according to which ESG focused corporates will commence buying activity.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Impact;
