import React from "react";
import './details.css'

function Details() {

    return (
        <div className="details_box">
            <div className="outer_box">
                <div className="boxxy box1">
                    <h3>What are deepfakes?</h3>
                    <p>Deepfakes are AI-generated synthetic media where someone's likeness or voice is digitally manipulated to create realistic but fake videos, images, or audio. They are often used to impersonate individuals or create misleading content.</p>
                </div>
                <div className="boxxy box2">
                    <h3>How to save yourself from deepfakes?</h3>
                    <p>To protect yourself from deepfakes, limit the amount of personal photos and videos shared online and use deepfake detection tools to verify media authenticity. Stay informed about the latest AI security practices and privacy settings.</p>
                </div>
                <div className="boxxy box3">
                    <h3>Spreading Awareness About Deepfake</h3>
                    <p>Spreading awareness about deepfakes is crucial to prevent misinformation, protect privacy, and maintain public trust. Informed individuals are better equipped to identify fake content and mitigate potential harms.</p>
                </div>
            </div>
        </div>
    )
}

export default Details;