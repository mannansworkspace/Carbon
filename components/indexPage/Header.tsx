import { FC } from 'react';
import Link from 'next/link';
import NavBar from './NavBar'

const Header: FC = () => {
	return (
    <div id='top'>
      <div className="video-background">
        <video playsInline autoPlay muted loop>
          <source src="/gaia-intro.mp4" type="video/mp4" />
        </video>
      </div>
      <div className='banner-bg' data-aos="fade-up" data-aos-delay="0" data-aos-duration="1500">
        <NavBar />
				<div className='px-[24px] lg:px-[70px] h-full my-auto'>
					<div className='container py-0 mx-auto h-full flex items-center'>
						<div id='pageBody' className='banner'>
							<h1 className='banner-title' data-aos="fade-up" data-aos-delay="0">
								<span>Carbon </span>
								<span>Offsets </span><br/>
								<span>On-Chain</span>
							</h1>
							<p data-aos="fade-in" data-aos-delay="300">
								A Web3 protocol that democratizes access to the Voluntary Carbon Market.
							</p>
							<p data-aos="fade-in" data-aos-delay="400">
							Purchase, hold and retire carbon credits generated from vetted projects that ensure reduction, avoidance, removal or sequestration of Greenhouse Gas emissions.</p>
							<p className="font-medium" data-aos="fade-in" data-aos-delay="500">Do well by doing good.
							</p>
							<div className='banner-bttns' data-aos="fade-up" data-aos-delay="500" data-aos-offset="0">
								<Link href='/offset'>
									<a>
										<button className='ca-primary-btn'>Buy GAIA</button>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;