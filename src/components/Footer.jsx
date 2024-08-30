import React from "react";
import './footer.css'
import addrs_icon from '../assets/gps.png'
import email_icon from '../assets/email.png'
import phone_icon from '../assets/phone-call.png'
import github_icon from '../assets/github.png'
import ldn_icon from '../assets/linkedin.png'

function Footer() {

    return (
        <div className="footer">
            <div className="footer_left">
                <div className="addrs">
                    <img src={addrs_icon} alt="" className="addrs_img" />
                    <p>Dehradun, Uttarakhand</p>
                </div>
                <div className="phone">
                    <img src={phone_icon} alt="" className="phone_icon" />
                    <p>+91 9368152845</p>
                </div>
                <div className="email">
                    <img src={email_icon} alt="" className="email_icon" />
                    <p>enlightener@gmail.com</p>
                </div>
            </div>
            <div className="footer_right">
                <h1 className="about_the_company">About the Project</h1>
                <p className="detail_company">Enlightener is an application that is used to identify whether an image is deepfaked or real.</p>
                <div className="icons_links">
                    <a href="https://github.com/DivyanshuKaintura" target="_blank" rel="noreferrer"><img src={github_icon} alt="this is github" className="github_icon" /></a>
                    <a href="https://www.linkedin.com/in/divyanshu-kaintura-0b54b4258/" target="_blank" rel="noreferrer"><img src={ldn_icon} alt="" className="link_icon" /></a>
                    <img src={ldn_icon} alt="" className="link_icon" />
                </div>
            </div>
        </div>
    )
}

export default Footer;