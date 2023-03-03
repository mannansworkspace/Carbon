import React, { FC } from 'react'
import BgImage from '../../assets/images/bg1.png'

const Row2 : FC =  () =>{

    return (
        <div className="bgded overlay padtop" style={{backgroundImage : `url(${BgImage.src})`}}>
            
            {/* <!-- ################################################################################################ --> */}
            <div id="pageintro" className="hoc clear">
                {/* <!-- ################################################################################################ --> */}
                <article>
                    <h3 className="heading">Senectus et netus</h3>
                    <p>Et malesuada fames ac turpis egestas duis rutrum eros ut sapien in hac habitasse platea dictumst aliquam venenatis leo et orci ut pretium odio eu nisi nulla at.</p>
                    <footer>
                        <ul className="nospace inline pushright">
                            <li><a className="btn" href="#">Egestas</a></li>
                            <li><a className="btn inverse" href="#">Tristique</a></li>
                        </ul>
                    </footer>
                </article>
                {/* <!-- ################################################################################################ --> */}
            </div>
            {/* <!-- ################################################################################################ --> */}
        </div>
    )
}

export default Row2