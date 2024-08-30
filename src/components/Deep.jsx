import React, { useState } from "react";
import './deep.css'
import axios from "axios";
import IntroPage from "./Intro";
import manIcon from '../assets/man.png'
import Tick from '../assets/tick.png'
import Cross from '../assets/cancel.png'

function Deep() {

    const [isUploaded, updateIsUploaded] = useState(false);
    const [isResultGenerated, updateIsResultGenerated] = useState(false);
    const [isDeepFake, updateIsDeepFake] = useState(false);
    // const photo = null;
    const [addrs, updateAddrs] = useState("default");
    const [df_accuracy, updateDFAccuracy] = useState(0);
    const [r_accuracy, updateRAccuracy] = useState(0);

    const handleUpload = (e) => {
        let image = document.getElementById("defaultImg");
        let inputImg = document.getElementById("input-file");
        image.src = URL.createObjectURL(inputImg.files[0]);
        image = e.target.files[0];

        console.log(image.name);


        updateAddrs(image.name)
        // console.log(addrs)
        var delayInMilliseconds = 50; //1 second
        setTimeout(function () {
            updateIsUploaded(true);
        }, delayInMilliseconds);

    }

    let handleDF = async (e) => {
        console.log("deep.jsx: Handled")
        console.log("deep.jsx: ", addrs);
        console.log("type of addrs = ", typeof (addrs))
        let res;
        try {
            const getResponse = await axios.post('http://127.0.0.1:8012/deep', {
                addrs: addrs
            });
            res = getResponse.data.accuracy;
            console.log("Deep.jsx: Accuracy = ", res);
            console.log("HOLA");
        } catch (error) {
            // console.error('Error:', error);
            // console.log("Error handled");
        }
        return res;
    };

    const checkForDF = async (e) => {
        if (!isUploaded) {
            alert("Please upload an image.");
            return;
        }
        console.log("Reached here only after uploading image")
        let res = await handleDF();
        // res = res.toUpperCase();
        console.log(res)

        let df = 100-res;
        let r = res;
        updateRAccuracy(r);
        updateDFAccuracy(df);
        // res = 200
        if (res < 50) {
            updateIsDeepFake(true);
        } else {
            updateIsDeepFake(false);
        }
        updateIsResultGenerated(true);
    }

    return (
        <div className="page">
            <IntroPage />
            <div className="main">
                {/* <img src={icon} alt="" className="icon" /> */}
                <h3 className="intro">Stop Getting Tricked by Deep Fakes</h3>
                <h3 className="detail">Enlightener is an online platform where you can identify whether an image is Deepfaked or Real.</h3>
                {/* <h3 className="detail">Upload the image and see the magic.  </h3> */}
                <div className="dropBox">
                    <img className={isUploaded ? "scrollImg inpImg" : "scrollImg notUploaded"} src={manIcon} id="defaultImg" alt="Input" />
                    <label className="importBtn" htmlFor="input-file">Import Image</label>
                    <input className="inpImgBtn" type="file" accept="image/jpg, image/png, image/jpeg" id="input-file" onChange={handleUpload} />
                </div>
                <div className="lowerBody">
                    <button className="check" onClick={checkForDF}>Check for Deepfake</button>
                    {/* {isResultGenerated ? <div className={isDeepFake ? "caseDF result" : "caseNDF result"}>
                        <div className="resultDF">
                            <p className="resultHead">Prediction Result</p>
                            <p>Image Status: {isDeepFake ? "Deep Faked" : "Real"}</p>
                            <p>Accuracy: {accuracy}</p>
                        </div>
                    </div> : <p></p>} */}
                    {isResultGenerated && 
                        <div className="newResult">
                            <p className="newResultHead">Prediction Result</p>
                            <div className="status">
                                {isDeepFake? <img className="cross" src={Cross} alt="" />:
                                    <img className="tick" src={Tick} alt=""/>
                                }
                                {isDeepFake? <p className="deeppara">Deepfaked</p>:
                                    <p className="realpara">Real</p>    
                                }
                            </div>
                            <p className="description">Image is {r_accuracy}% real and {df_accuracy}% deepfaked</p>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default Deep;