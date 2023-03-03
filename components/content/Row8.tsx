import React from "react";
import bgImage from '../../assets/images/348x261.png'


const Row8 = () => {

    return (
        <div className="wrapper row2">
            <section className="hoc container clear">
                <div className="sectiontitle">
                    <p className="nospace font-xs">Mollis eu commodo eu dui quisque</p>
                    <h6 className="heading">Ut ipsum vivamus tincidunt</h6>
                </div>
                <ul id="latest" className="nospace group sd-third">
                    <li className="one_third first">
                        <article>
                            <figure><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a>
                                <figcaption>
                                    <h6 className="heading">Nisl nullam odio justo pharetra</h6>
                                    <ul className="nospace meta clear">
                                        <li><i className="fas fa-user"></i> <a href="#">Admin</a></li>
                                        <li>
                                            {/* <time datetime="2045-04-06T08:15+00:00">06 Apr 2045</time> */}
                                        </li>
                                    </ul>
                                </figcaption>
                            </figure>
                            <p>Et sagittis ac dignissim nec metus proin nunc maecenas vel nulla vivamus mattis massa vitae metus proin nunc maecenas vel nulla vivamus mattis massa vitae.</p>
                            <footer><a href="#">Read More</a></footer>
                        </article>
                    </li>
                    <li className="one_third">
                        <article>
                            <figure><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a>
                                <figcaption>
                                    <h6 className="heading">Nisl nullam odio justo pharetra</h6>
                                    <ul className="nospace meta clear">
                                        <li><i className="fas fa-user"></i> <a href="#">Admin</a></li>
                                        <li>
                                            {/* <time datetime="2045-04-05T08:15+00:00">05 Apr 2045</time> */}
                                        </li>
                                    </ul>
                                </figcaption>
                            </figure>
                            <p>Et sagittis ac dignissim nec metus proin nunc maecenas vel nulla vivamus mattis massa vitae metus proin nunc maecenas vel nulla vivamus mattis massa vitae.</p>
                            <footer><a href="#">Read More</a></footer>
                        </article>
                    </li>
                    <li className="one_third">
                        <article>
                            <figure><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a>
                                <figcaption>
                                    <h6 className="heading">Nisl nullam odio justo pharetra</h6>
                                    <ul className="nospace meta clear">
                                        <li><i className="fas fa-user"></i> <a href="#">Admin</a></li>
                                        <li>
                                            {/* <time datetime="2045-04-04T08:15+00:00">04 Apr 2045</time> */}
                                        </li>
                                    </ul>
                                </figcaption>
                            </figure>
                            <p>Et sagittis ac dignissim nec metus proin nunc maecenas vel nulla vivamus mattis massa vitae metus proin nunc maecenas vel nulla vivamus mattis massa vitae.</p>
                            <footer><a href="#">Read More</a></footer>
                        </article>
                    </li>
                </ul>
                {/* <!-- ################################################################################################ --> */}
            </section>
        </div>
    )

}
export default Row8