import React, { FC } from "react";
import bgImage from '../../../assets/images/bg1.png'

const Footer: FC = () => {
  return (
    <div className="bgded overlay" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* <!-- ################################################################################################ --> */}
      <div className="wrapper row4">
        <footer id="footer" className="hoc clear">
          {/* <!-- ################################################################################################ --> */}
          <div className="group btmspace-50">
            <div className="one_quarter first">
              <h6 className="heading">Lorem proin volutpat</h6>
              <p>Ligula quis sapien nam molestie massa quis pede maecenas quis lacus nunc sed lectus quis lectus tristique tincidunt sed varius nisl tincidunt lectus pellentesque sagittis mauris ut leo ullamcorper tortor morbi accumsan [<a href="#">&hellip;</a>]</p>
              <ul className="faico clear">
                <li><a className="faicon-facebook" href="#"><i className="fab fa-facebook"></i></a></li>
                <li><a className="faicon-google-plus" href="#"><i className="fab fa-google-plus-g"></i></a></li>
                <li><a className="faicon-linkedin" href="#"><i className="fab fa-linkedin"></i></a></li>
                <li><a className="faicon-twitter" href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a className="faicon-vk" href="#"><i className="fab fa-vk"></i></a></li>
              </ul>
            </div>
            <div className="one_quarter">
              <h6 className="heading">Nascetur ridiculus mus</h6>
              <ul className="nospace linklist">
                <li><a href="#">Aliquam eget leo praesent</a></li>
                <li><a href="#">Vel urna nunc ultricies</a></li>
                <li><a href="#">Faucibus nunc cum sociis</a></li>
                <li><a href="#">Natoque penatibus et magnis</a></li>
                <li><a href="#">Dis parturient montes</a></li>
              </ul>
            </div>
            <div className="one_quarter">
              <h6 className="heading">Vestibulum sed quam</h6>
              <p className="nospace btmspace-15">Ante dapibus luctus sed quis diam vitae ipsum ultrices vehicula.</p>
              <form action="#" method="post">
                <fieldset>
                  <legend>Newsletter:</legend>
                  <input className="btmspace-15" type="text" placeholder="Name" />
                  <input className="btmspace-15" type="text"  placeholder="Email" />
                  <button className="btn" type="submit" value="submit">Submit</button>
                </fieldset>
              </form>
            </div>
            <div className="one_quarter">
              <h6 className="heading">Aenean diam euismod</h6>
              <ul className="nospace clear latestimg">
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
                <li><a className="imgover" href="#"><img src="images/demo/100x100.png" alt="" /></a></li>
              </ul>
            </div>
          </div>
          {/* <!-- ################################################################################################ --> */}
          <hr className="btmspace-50" />
          {/* <!-- ################################################################################################ --> */}
          <nav>
            <ul className="nospace">
              <li><a href="index.html"><i className="fas fa-lg fa-home"></i></a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </nav>
        </footer>
      </div>
      <div className="wrapper row5">
        <div id="copyright" className="hoc clear">
          {/* <!-- ################################################################################################ --> */}
          <p className="fl_left">Copyright &copy; 2018 - All Rights Reserved - <a href="#">Domain Name</a></p>
          <p className="fl_right">Template by <a target="_blank" href="https://www.os-templates.com/" title="Free Website Templates">OS Templates</a></p>
          {/* <!-- ################################################################################################ --> */}
        </div>
      </div>
      {/* <!-- ################################################################################################ --> */}
    </div>
  )


}

export default Footer