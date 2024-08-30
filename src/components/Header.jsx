import React from "react";
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Navigate,
// } from 'react-router-dom';
import './header.css'
// import Home from "./Home";

function Header() {
    return (
        <div className="header">
            {/* <a href="#default" class="logo">ENLIGHTENER</a> */}
            <h1 className="name">ENLIGHTENER</h1>
            <div className="header-right">
                <a href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
                {/* <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />

                        <Route
                            path="*"
                            element={<Navigate to="/" />}
                        />
                    </Routes>
                </Router> */}
            </div>
        </div>
    )
}

export default Header;