import { FC } from "react";
import Link from 'next/link';
import ContactUs from './ContactUs';

const Footer: FC = () => {
    
    return (
        <footer className="challenges select-none">
                <div className="p-[24px] md:pt-[48px] md:pb-[48px] md:px-[70px]">
                    <div className="container py-0 mx-auto">
                        <div className="footer-container w-full">
                            <div className="all-rights">
                              {/* <p>©2022 Amber Group</p> */}
                            </div>
                            <div className="footer-links max-w-[62%] sm:max-w-[40%] md:max-w-[30%] lg:max-w-none flex-wrap justify-end text-right">
                                <span className="link-item mr-5"><Link href="/#token" ><a>Why Gaia</a></Link></span>
                                <span className="link-item mr-5"><Link href="/#whyNow" ><a>Why Now</a></Link></span>
                                <span className="link-item mr-5"><Link href="/#impact" ><a>Positioning</a></Link></span>
                                <span className="link-item mr-5"><Link href="/#projects"><a>Projects</a></Link></span>
                                <span className="link-item mr-5"><Link href='/insights'><a>Insights</a></Link></span>
                                <ContactUs />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    )
}

export default Footer