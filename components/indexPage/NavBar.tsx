import { FC, useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Logo from 'assets/images/GAIA-token.svg';
import NavbarBtn from 'assets/images/navbar-btn.png';
import MobileNavbar from './MobileNavbar';
import Link from 'next/link';
import ContactUs from './ContactUs/ContactUs';

const NavBar: FC = () => {
	const [showNavBar, setShowNavBar] = useState(false);
	const [y, setY] = useState(0);
  const debouce = useRef<boolean>(false);

	useEffect(() => {
		if (!showNavBar) {
			debouce.current = true;

			setTimeout(function () {
				debouce.current = false;
			}, 1000);

		} else {
			const header = document.querySelector<HTMLElement>('#myHeader');
			const pageBody = document.querySelector('#pageBody');

			header?.classList.remove('sticky-header');
			header?.parentElement?.classList.remove('bg-sticky');
			header?.parentElement?.parentElement?.classList.remove('sticky-container');
			pageBody?.classList.remove('body-content');
		}
	}, [showNavBar])

	const stickyHeader = useCallback((event: any) => {
		if (debouce.current || y === event.currentTarget.scrollY)
			return

		const header = document.querySelector<HTMLElement>('#myHeader');
		const pageBody = document.querySelector('#pageBody');

		const isScrollUp = y > event.currentTarget.scrollY

		if (isScrollUp && window.pageYOffset > 150) {
			header?.parentElement?.classList.add('bg-sticky');
			header?.parentElement?.parentElement?.classList.add('sticky-container');

			header?.classList.add('sticky-header');
			pageBody?.classList.add('body-content');
		} else {
			header?.classList.remove('sticky-header');
			header?.parentElement?.classList.remove('bg-sticky');
			header?.parentElement?.parentElement?.classList.remove('sticky-container');
			pageBody?.classList.remove('body-content');
		}

		setY(window.scrollY)
	}, [y]);

	useEffect(() => {

		window.addEventListener('scroll', stickyHeader);

		return () => {
			window.removeEventListener('scroll', stickyHeader);
		};
	}, [stickyHeader]);

	useEffect(() => {
		setY(window.scrollY);
	}, []);

	return (
		<div className="pt-8">
			<MobileNavbar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
			{/* <div className='pt-[36px] pr-[16px] pl-[24px]'>
				<div className='container py-0 mx-auto'> */}
			<div id='myHeader' className='header select-none'>
				<div className='logo'>
          <Link href='/#top' scroll={false}>
					<a className='site-logo'>
            <Image src={Logo} width={40} height={40} unoptimized={true} alt='Logo' />
            <span className="logo-text">Gaia</span>
					</a>
					</Link>
				</div>
				<div className='menu select-none'>
					<Link href='/#token'><a>Why Gaia</a></Link>
					<Link href='/#whyNow'><a>Why Now</a></Link>
					<Link href='/#impact'><a>Positioning</a></Link>
					<Link href='/#projects'><a>Projects</a></Link>
					<Link href='/insights'><a>Insights</a></Link>
          <ContactUs />
					<Link href='/offset'>
						<a className='header-offset'>
							<button>Offset now</button>
						</a>
					</Link>
				</div>
				<a className='navbar-btn' onClick={() => setShowNavBar(true)}>
					<Image src={NavbarBtn} alt='navbar button' width={40} height={40} unoptimized={true} />
				</a>
			</div>
			{/* </div>
			</div> */}
		</div>
	)
}

export default NavBar;