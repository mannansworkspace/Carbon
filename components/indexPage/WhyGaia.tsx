import { FC } from 'react';
import Image from 'next/image';
import Union1 from 'assets/images/markets.svg';
import Union2 from 'assets/images/impact-outlined.svg';
import Union3 from 'assets/images/carbon.svg';
import Union4 from 'assets/images/future-ready.svg';
import Union5 from 'assets/images/two-way.svg';
import Union6 from 'assets/images/attest.svg';
import Link from 'next/link';

const WhyGaia: FC = () => {
	return (
    <div id="impact" className='why-gaia'>
      <div className='union-bg'>
        <div className='pt-[48px] pb-[32px] px-[24px] md:pt-[96px] md:pb-[64px] md:px-[70px]'>
          <div className='container py-0 mx-auto'>
						<h1 className='ca-sec-heading'>Why Gaia?</h1>
						<div className='union'>
							<div className='union-left'>
								<div className='union-box'>
									<p>
										Open and permissionless access to carbon markets which
										permits collective coordination of climate-positive action
									</p>
									<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
                    <Image
											src={Union1}
											alt='Access Carbon'
                      unoptimized={true}
                      draggable={false}
										/>
									</div>
								</div>
								<div className='union-box'>
									<p>
										Stronger sustainability credentials by leveraging Polygon’s
										L2 scaling solution and avoiding resource-intensive
										traditional proof-of-work consensus mechanisms.
									</p>
									<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
										<Image
											src={Union2}
											alt='Access Carbon'
											unoptimized={true}
                      draggable={false}
										/>
									</div>
								</div>
								<div className='union-box'>
									<p>
										High-quality carbon credits with only N-GEO equivalent
										specifications or better, creating trust and positioning for
										maximum planet impact
									</p>
									<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
										<Image
											src={Union3}
											alt='Access Carbon'
											unoptimized={true}
                      draggable={false}
										/>
									</div>
								</div>
							</div>
							<div className='union-right'>
								<div className='union-box'>
									<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
										<Image
											src={Union4}
											alt='Access Carbon'
											unoptimized={true}
                      draggable={false}
										/>
									</div>
									<p>
										Future-ready carbon trading mechanism which renders all
										emission reductions traceable and transparent on the
										Ethereum ledger.
									</p>
								</div>
								<div className='union-box'>
									<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
										<Image
											src={Union5}
											alt='Access Carbon'
											unoptimized={true}
                      draggable={false}
										/>
									</div>
									<p>
										Differentiated 2-way functionality which provides a credible
										price backstop off-chain and synergistically attracts more
										on-chain activity
									</p>
								</div>
								<div className='union-box'>
									<div className='w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] overflow-hidden'>
										<Image
											src={Union6}
											alt='Access Carbon'
											unoptimized={true}
                      draggable={false}
										/>
									</div>
									<p>
										Rigorous real-time attestation provides a trust layer
										addressing reliability concerns stemming from existing
										market infrastructure characteristics
									</p>
								</div>
							</div>
						</div>
						<div className='banner-bttns'>
							<Link href='/buy'>
								<a>
									<button className='ca-primary-btn'>Buy GAIA</button>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhyGaia;
