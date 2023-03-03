import React, { FC } from "react";
import bgImage from '../../assets/images/348x261.png'

const Row6: FC = () => {

    return (
        <div className="wrapper row2">
            <section className="hoc container clear">
                {/* <!-- ################################################################################################ --> */}
                <div className="sectiontitle">
                    <p className="nospace font-xs">Mollis eu commodo eu dui quisque</p>
                    <h6 className="heading">Ut ipsum vivamus tincidunt</h6>
                </div>
                <figure>
                    <figcaption className="center btmspace-50"><a href="#">Pharetra</a> / <a href="#">Imperdiet</a> / <a href="#">Suspendisse</a> / <a href="#">Potenti</a></figcaption>
                    <ul className="nospace group grid-3">
                        <li className="one_third"><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a></li>
                        <li className="one_third"><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a></li>
                        <li className="one_third"><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a></li>
                        <li className="one_third"><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a></li>
                        <li className="one_third"><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a></li>
                        <li className="one_third"><a className="imgover" href="#"><img src={bgImage.src} alt=""/></a></li>
                    </ul>
                </figure>
                {/* <!-- ################################################################################################ --> */}
            </section>
        </div>

    )
}
export default Row6