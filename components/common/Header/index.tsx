import React, { FC } from "react";
import Link from "next/link";

const Header1: FC = () => {

    return (
        <>
            <div className="wrapper row0">
                <div id="topbar" className="hoc clear">
                    <div className="fl_left">
                        <ul className="nospace">
                            <li><i className="fas fa-mobile-alt rgtspace-5"></i> +00 (123) 456 7890</li>
                            <li><i className="far fa-envelope rgtspace-5"></i> info@domain.com</li>
                        </ul>
                    </div>
                    <div className="fl_right">
                        <ul className="nospace">
                            <li><a href="#"><i className="fas fa-home"></i></a></li>
                            <li><a href="#" title="Help Centre"><i className="far fa-life-ring"></i></a></li>
                            <li><Link href="/login" ><i className="fas fa-sign-in-alt"></i></Link></li>
                            <li><Link href="/register" ><i className="fas fa-edit"></i></Link></li>
                            <li id="searchform">
                                <div>
                                    <form action="#" method="post">
                                        <fieldset>
                                            <legend>Quick Search:</legend>
                                            <input type="text" placeholder="Enter search term&hellip;" />
                                            <button type="submit"><i className="fas fa-search"></i></button>
                                        </fieldset>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="wrapper row1">
                <section id="ctdetails" className="hoc clear">
                    <ul className="nospace clear">
                        <li className="one_quarter first">
                            <div className="block clear"><a href="#"><i className="fas fa-phone"></i></a> <span><strong>Give us a call:</strong> +00 (123) 456 7890</span></div>
                        </li>
                        <li className="one_quarter">
                            <div className="block clear"><a href="#"><i className="fas fa-envelope"></i></a> <span><strong>Send us a mail:</strong> support@domain.com</span></div>
                        </li>
                        <li className="one_quarter">
                            <div className="block clear"><a href="#"><i className="fas fa-clock"></i></a> <span><strong> Mon. - Sat.:</strong> 08.00am - 18.00pm</span></div>
                        </li>
                        <li className="one_quarter">
                            <div className="block clear"><a href="#"><i className="fas fa-map-marker-alt"></i></a> <span><strong>Come visit us:</strong> Directions to <a href="#">our location</a></span></div>
                        </li>
                    </ul>
                </section>
            </div>
        </>
    )

}


export default Header1