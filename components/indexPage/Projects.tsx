import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SouthernBg from 'assets/images/southern-cardamon.jpg';
import MaiBg from 'assets/images/mai-ndombe.jpg';

const Projects: FC = () => {
	return (
		<div id='projects'>
			<div className='wildlife select-none'>
				<div className='southern'>
					<Image className='-z-10' src={SouthernBg} layout='fill' objectFit='cover' unoptimized={true} priority={true} />
					<div className='project-container'>
						<h1 className='ca-sec-heading'>
							Southern Cardamom <br/>REDD+ Wildlife Alliance
						</h1>
						<p>
							The Southern Cardamom REDD+ project has over 1,328,724 under its protection and has led more than 39,000 patrols across the landscape. It supports more than 50 species of IUCN Threatened or Near Threatened birds, mammals, and reptiles. There are also 29 communities in the area, with 3,841 families and a population of 16,319.
						</p>
						<p>
							The project is accredited under Voluntary Carbon (VCS) and Climate, Community & Biodiversity (CCB) Standards. The project produces genuine carbon emission reductions, supports local communities, and protects the biodiversity of the Cardamom Rainforest in Cambodia. Carbon credits purchased from this project are linked to some of the world's most spectacular forest landscapes and help protect the communities and wildlife that call them home.
						</p>
						<p>
						The REDD+ project is operated by Wildlife Alliance, considered a global leader in the Direct Protection of Forests and Wildlife. It has been implementing cutting-edge conservation programs in Russia, Southeast Asia, South America, and the Western Pacific since 1995. For example, it has been helping to conserve the Cardamom Rainforest in Cambodia for over 14 years.  <Link href='https://www.wildlifealliance.org/redd/'><a target="_blank" className='text-[#EF913A] hover:text-[#FFFFFF] z-0 transition-all'> Learn more &#8594;</a></Link>
						</p>
					</div>
					<div className='alliance'>
						<div className='hectares' data-aos="fade-up" data-aos-delay="100">
							<span className='number'>497</span>
							<span className='projects'>Thousand hectares</span>
						</div>
						<div className='hectares' data-aos="fade-up" data-aos-delay="200">
							<span className='number'>55</span>
							<span className='projects'>Threatened wildlife species</span>
						</div>
						<div className='hectares' data-aos="fade-up" data-aos-delay="300">
							<span className='number'>29</span>
							<span className='projects'>Forest communities</span>
						</div>
					</div>
					<div className='bttns'>
						<Link href='/offset'>
							<a>
								<button className='ca-primary-btn'>Buy GAIA</button>
							</a>
						</Link>
					</div>
				</div>
				<div className='mai'>
					<Image className='-z-10' src={MaiBg} layout='fill' objectFit='cover' unoptimized={true} priority={true} />
					<div className='project-container'>
						<h1 className='ca-sec-heading'>Mai Ndombe <br/>REDD+ Wildlife Works</h1>
						<p>
							The Mai Ndombe REDD+ Project protects 300,000 hectares of critical
							bonobo and forest elephant habitat within the world’s second-largest
							intact rainforest and some of the most important wetlands on the
							planet, the Congo Basin.
						</p>
						<p>
							This project reduces the principal drivers of forest and
							biodiversity loss and is charting a new pathway for community
							prosperity through comprehensive investments into some of the most
							impoverished communities in the world.
						</p>
						<p>
							Such investments include building schools, providing healthcare
							services, supporting food security, through agricultural
							diversification, and providing capacity building activities that
							empower local communities.  <Link href='https://www.wildlifeworks.com/dr-congo'><a target="_blank" className='text-[#EF913A] hover:text-[#FFFFFF] z-0 transition-all'> Learn more &#8594;</a></Link>
						</p>
					</div>
					<div className='alliance'>
						<div className='hectares' data-aos="fade-up" data-aos-delay="100">
							<span className='number'>300</span>
							<span className='projects'>Thousand hectares</span>
						</div>
						<div className='hectares' data-aos="fade-up" data-aos-delay="200">
							<span className='number'>
								2<sup style={{ verticalAlign: '-20px' }}>nd</sup>
							</span>
							<span className='projects'>Largest intact rainforest</span>
						</div>
						<div className='hectares' data-aos="fade-up" data-aos-delay="300">
							<span className='number'>2.4</span>
							<span className='projects'>Million TC02 avoided per year</span>
						</div>
					</div >
					<div className='flex md:hidden bttns'>
						<Link href='/offset'>
							<a>
								<button className='ca-primary-btn' data-aos="fade-up" data-aos-delay="300">Buy GAIA</button>
							</a>
						</Link>
					</div>
				</div >
			</div >
		</div >
	);
};

export default Projects;
