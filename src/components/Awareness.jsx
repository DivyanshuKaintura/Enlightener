import React from "react";
import './awareness.css'

function Awareness() {

    let msg = "Preventing yourself from falling victim to deepfakes involves a combination of digital literacy, skepticism, and utilizing available tools. Here are some strategies:"
    let h1 = "1. Verify Sources: "
    let p1 = "Always check the credibility of the source. If a video or image seems suspicious, try to verify it through reliable news outlets or fact-checking websites."

    let h2 = "2. Cross-Check Information: "
    let p2 = "Look for multiple sources confirming the same information. Deepfakes often spread quickly, so seeing if other reputable sources cover the same event can help confirm its authenticity."

    let h3 = "3. Use Deepfake Detection Tools: "
    let p3 = "There are several tools and software designed to detect deepfakes. Tools like Deepware Scanner or Microsoft's Video Authenticator can help identify manipulated media."

    let h4 = "4. Be Critical of Emotional Responses: "
    let p4 = "Deepfakes are often designed to elicit strong emotional reactions. If a piece of media is making you feel strongly, take a step back and question its authenticity."

    let h6 = "6. Educate Yourself:"
    let p6 = "Stay informed about the latest deepfake technology and techniques. Understanding how these technologies work can help you better identify potential deepfakes."

    let h5 = "5. Secure Personal Information:"
    let p5 = "Be cautious about sharing personal information online that could be used to create convincing deepfakes of yourself."

    return (
        <div className="awareness">
            <p>{msg}</p>
            <table>
                <tr>
                    <td>{h1}{p1}</td>
                    <td>{h2}{p2}</td>
                </tr>
                <tr>
                    <td>{h3}{p3}</td>
                    <td>{h4}{p4}</td>
                </tr>
                <tr>
                    <td>{h5}{p5}</td>
                    <td>{h6}{p6}</td>
                </tr>
            </table>
            
        </div>
    )
}

export default Awareness;