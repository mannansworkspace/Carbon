import { FC } from "react";
import ContactUsFooter from "./ContactUs/Footer";

import Link from 'next/link';


const Cta: FC = () => {


    return (
        <div  className="contact cta">
            <div className="home-container">
                <div className="container-padding">
                    <div className="sec-contact">
                        <div className="involved">
                            <div className="involved-padding">
                              <h1 className="ca-sec-heading normal-case">Take climate positive action today</h1>
                              <div className='my-8'>
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
            </div>
            <ContactUsFooter />
        </div>
    )
}

export default Cta