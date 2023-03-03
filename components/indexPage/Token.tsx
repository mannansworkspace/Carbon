import { FC } from 'react';
import Image from 'next/image';
import Tokenize from 'assets/images/tokenize.svg';
import Participate from 'assets/images/participate.svg';
import Offset from 'assets/images/offset.svg';
import Impact from 'assets/images/impact.svg';
import Link from 'next/link';

import Brace from 'assets/images/brace.svg';
import Union1 from 'assets/images/coordination.svg';
import Union2 from 'assets/images/polygon.svg';
import Union3 from 'assets/images/forest.svg';
import Union4 from 'assets/images/future-ready.svg';
import Union5 from 'assets/images/bridge.svg';
import Union6 from 'assets/images/attest.svg';
import TokenBg from 'assets/images/token.jpg';

const Token: FC = () => {

	return (
		<div id='token' className='token-bg' data-aos="fade-up" data-aos-delay="0" data-aos-offset="50" data-aos-duration="1800">
			{/* <Image className='-z-10 select-none' src={TokenBg} layout='fill' objectFit='cover' unoptimized={true} /> */}
			<div className='pt-[48px] pb-[32px] px-[24px] md:pt-[96px] md:pb-[64px] md:px-[70px]'>
				<div className='container py-0 mx-auto flex-shrink-0'>
					<div className='content'>
						<h1 className='ca-sec-heading' data-aos="fade-in" data-aos-delay="0">Why Gaia Protocol</h1>
						<div className='flex flex-row items-center' data-aos="fade-in" data-aos-delay="0">
							<div className='flex flex-col justify-center flex-auto flex-shrink-1 lg:flex-shrink-0'>
								{/* <p className='block lg:hidden'>The Gaia protocol is positioned at the strategic intersection where carbon markets meet blockchain technology, enabling the tokenization of Voluntary Carbon Credits ( VCCs ).</p>
								<p className='block lg:hidden'>The Gaia protocol is developing innovative solutions to support, build and scale the VCC market.</p> */}
								<p className='lead-copy'> The Gaia protocol </p>
							</div>
							<div className='mx-4 lg:mx-8 w-[48px] sm:w-[24px]  md:w-[16px] lg:w-auto justify-center flex-grow-0  flex-shrink-1 lg:flex-shrink-0'>
								<Image src={Brace} width={18} height={121} alt='' unoptimized={true} draggable={false} />
							</div>
							<div className='flex flex-col justify-center flex-grow-0'>
								<p className='lead-copy'>
									is strategically positioned at the intersection where carbon markets meet blockchain technology, enabling the tokenization of voluntary carbon offset credits (VCCs) to deliver scalable impact.
								</p>
								<p className='lead-copy '>
									is developing innovative solutions to support, build and scale the VCC market.
								</p>
							</div>
						</div>
					</div>
					<div className='union'>
						<div className='union-left'>
							<div className='union-box' data-aos="fade-up" data-aos-delay="0">
								<p>
									Open, trustless, and permissionless networks allow for the opportunity to coordinate collective climate action, optimize incentives, and transact value and information without trusted intermediaries.
								</p>
								<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
									<Image src={Union1} alt='Coordination' unoptimized={true} draggable={false} />
								</div>
							</div>
							<div className='union-box' data-aos="fade-up" data-aos-delay="50">
								<p>
									By leveraging Polygon's Layer 2 solution, Gaia avoids resource-intensive traditional proof-of-work consensus mechanisms, bolsters its sustainability credentials and provides users with a scalable and cost-efficient means to access carbon markets.
								</p>
								<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
									<Image src={Union2} alt='Polygon L2 scaling solution' unoptimized={true} draggable={false} />
								</div>
							</div>
							<div className='union-box' data-aos="fade-up" data-aos-delay="100">
								<p>
									Initially only presenting high-quality carbon credits with N-GEO equivalent specification or better to elicit a strong sense of community trust. We are confident that high quality will outperform low quality.
								</p>
								<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
									<Image src={Union3} alt='High-quality VCCs' unoptimized={true} draggable={false} />
								</div>
							</div>
						</div>
						<div className='union-right'>
							<div className='union-box' data-aos="fade-up" data-aos-delay="150">
								<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
									<Image src={Union4} alt='Blockchain' unoptimized={true} draggable={false} />
								</div>
								<p>
									Future-ready voluntary carbon trading mechanism renders all metadata <span className='hidden 2xl:inline'> (including origin and ownership)</span> traceable and transparent on the Ethereum ledger via ERC20 tokens.
								</p>
							</div>
							<div className='union-box' data-aos="fade-up" data-aos-delay="200">
								<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
									<Image src={Union5} alt='Bridging on-chain market and the relevant off-chain anchor' unoptimized={true} draggable={false} />
								</div>
								<p>
									Delivers seamless intra-protocol bridging between the on-chain market and an off-chain tether, targeting to anchor benchmark pricing in traditional markets with our on-chain anchor.
								</p>
							</div>
							<div className='union-box' data-aos="fade-up" data-aos-delay="250">
								<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
									<Image src={Union6} alt='Attestation' unoptimized={true} draggable={false} />
								</div>
								<p>
									Real-time attestation acts as a trust layer; market infrastructure does not yet allow fully trustless, decentralized consensus-based validation.
								</p>
							</div>
						</div>
					</div>
					<div className='how-works'>
						<div className='box' data-aos="fade-in" data-aos-delay="100">
							<div className='method-logo'>
								<Image src={Tokenize} width={128} height={128} unoptimized={true} draggable={false} />
							</div>
							<div className='box-content'>
								<h3>Tokenize</h3>
								<p>
									GAIA tokens are fungible and tradable on centralized exchanges and naturally eligible to seed liquidity pools across AMMs. The GAIA token is asset-backed by independent third-party certified high-quality VCCs.
								</p>
							</div>
						</div>
						<div className='box' data-aos="fade-in" data-aos-delay="150">
							<div className='method-logo'>
								<Image src={Participate} width={128} height={128} unoptimized={true} draggable={false} />
							</div>
							<div className='box-content'>
								<h3>Participate</h3>
								<p>
									Willing participants in carbon markets will be able to purchase and hold GAIA tokens without barriers to entry.  Gain ccess to the VCM’s significant growth potential, forecasted by McKinsey at 180x by 2030.
								</p>
							</div>
						</div>
						<div className='box' data-aos="fade-in" data-aos-delay="200">
							<div className='method-logo'>
								<Image src={Offset} width={128} height={128} unoptimized={true} draggable={false} />
							</div>
							<div className='box-content'>
								<h3>Offset</h3>
								<p>
									Offset GHG emissions by retiring VCCs. This powerfully drives, via an unmistakable price signal, climate action by increasing incentives for high-quality carbon offset generating projects.
								</p>
							</div>
						</div>
						<div className='box' data-aos="fade-in" data-aos-delay="250">
							<div className='method-logo'>
								<Image src={Impact} width={128} height={128} unoptimized={true} draggable={false} />
							</div>
							<div className='box-content'>
								<h3>Impact</h3>
								<p>
									Accessible carbon markets acts as a demand driver for carbon credits. Hence, funding for climate-positive projects becomes ampler, with individuals and companies becoming agents of the most reliable solution to societal coordination problems with externalities.
								</p>
							</div>
						</div>
					</div>
					<div className='banner-bttns'>
						<Link href='/offset'>
							<a>
								<button className='ca-primary-btn'>Buy GAIA</button>
							</a>
						</Link>
						{/* <button className="ca-secondary-btn-inverted" >Begin journey</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Token;
