import { FC, useEffect } from "react";
import Image from "next/image";
import Logo from 'assets/images/GAIA-token.svg';
import Close from 'assets/images/close.png'
import Link from 'next/link';
import ContactUs from './ContactUs/ContactUs';

interface Props {
    showNavBar: boolean;
    setShowNavBar: (param: boolean)=> void
}

const MobileNavbar: FC<Props> = (props) => {
  const { showNavBar, setShowNavBar } = props
  
  useEffect(() => {
    if (showNavBar) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      const navLinks = document.querySelectorAll('div.menu > a, button.contact-modal');
      navLinks.forEach((navLink, index) => {
        navLink?.classList.add('opacity-0');
        let animateLink = navLink?.animate([{ opacity: 0, transform: 'translateY(-80px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 500, easing: 'ease', delay: (index + 1) * 100 });
        animateLink.onfinish = event => { navLink?.classList.remove('opacity-0'); };
      });
    }
  
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  }, [showNavBar])
  

    return (
      <div className="mob-menu" style={{ opacity: showNavBar ? '1' : '0', visibility: showNavBar ? 'visible': 'hidden', height: showNavBar ? '100%' : '0%' }}>
        <div className='container py-0 mx-auto flex flex-col justify-between h-full'>
          <div className="mob-header">
            <div className="logo">
                <a href="/#top">
                  <Image src={Logo} alt="logo" width={40} height={40} unoptimized={true} />
                </a>
            </div>
            
            <Image src={Close} alt="close" width={40} height={40} unoptimized={true} onClick={() => setShowNavBar(false)} />
          </div>
          <div className="menu">
            <Link href="/#token"><a onClick={() => setShowNavBar(false)} >Why Gaia</a></Link>
            <Link href="/#whyNow"><a onClick={() => setShowNavBar(false)}>Why Now</a></Link>
            <Link href="/#impact"><a onClick={() => setShowNavBar(false)}>Positioning</a></Link>
            <Link href="/#projects"><a onClick={() => setShowNavBar(false)}>Projects</a></Link>
            <Link href="/insights"><a onClick={() => setShowNavBar(false)}>Insights</a></Link>
            <ContactUs hideNavbar={() => setShowNavBar(false)} />
            <Link href='/offset'>
                <a><button>Offset now</button></a>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default MobileNavbar;