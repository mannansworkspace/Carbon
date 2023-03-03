import React, { FC } from "react";
import bgImage from '../../assets/images/bg1.png'



const Row7 : FC = () => {

    return (
        <div className="bgded overlay" style = {{backgroundImage : `url(${bgImage.src})`}}>
            <section id="testimonials" className="hoc container clear">
                {/* <!-- ################################################################################################ --> */}
                <article>
                    <figure><img src="images/demo/100x100.png" alt="" /></figure>
                    <h6 className="heading font-x2">J. Doe</h6>
                    <em>Conubia nostra per inceptos</em>
                    <blockquote>Himenaeos curabitur feugiat etiam in enim sed felis interdum lobortis phasellus nec eros ut arcu sollicitudin pellentesque curabitur porta justo vitae molestie semper ligula enim sed felis interdum lobortis phasellus nec eros ut arcu sollicitudin pellentesque curabitur porta justo vitae molestie semper ligula.</blockquote>
                </article>
                {/* <!-- ################################################################################################ --> */}
            </section>
        </div>
    )

}
export default Row7