import React , {FC} from "react"
import Bgimage from '../../assets/images/348x220.png'

const Row3 : FC = () => {
    return (
        <div className="wrapper row3">
            <main className="hoc container clear">
                {/* <!-- main body --> */}
                {/* <!-- ################################################################################################ --> */}
                <section id="introblocks">
                    <ul className="nospace group grid-3">
                        <li className="one_third">
                            <figure><a className="imgover" href="#"><img src={Bgimage.src} alt="" /></a>
                                <figcaption><a href="#">Aliquam faucibus</a></figcaption>
                            </figure>
                        </li>
                        <li className="one_third">
                            <figure><a className="imgover" href="#"><img src={Bgimage.src} alt="" /></a>
                                <figcaption><a href="#">Aliquam faucibus</a></figcaption>
                            </figure>
                        </li>
                        <li className="one_third">
                            <figure><a className="imgover" href="#"><img src={Bgimage.src} alt="" /></a>
                                <figcaption><a href="#">Aliquam faucibus</a></figcaption>
                            </figure>
                        </li>
                    </ul>
                </section>
                {/* <!-- ################################################################################################ --> */}
                {/* <!-- / main body --> */}
                <div className="clear"></div>
            </main>
        </div>
        
    )
}
export default Row3