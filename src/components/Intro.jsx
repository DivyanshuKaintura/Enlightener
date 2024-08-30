import React from "react";
import './intro.css'

function IntroPage() {

    const scrollDown = () => {
        window.scrollTo(0, 522);
    }


    return (
        <div className="intro_page">
            <div className="details">
                <h1 className="intro_head">Identify and Stay Safe from Deep Fake</h1>
                <p className="intro_detail">Enlightener allows you to upload an image and will detect whether the image is deepfaked or real</p>
                <button className="intro_start" onClick={scrollDown}>Get Started</button>
            </div>
        </div>
    );
}

export default IntroPage;