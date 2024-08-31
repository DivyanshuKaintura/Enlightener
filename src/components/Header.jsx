import React from "react";
import './header.css'

function Header() {

    return (
        <div className="header">
            <h1 className="name">ENLIGHTENER</h1>
            <div className="header-right">
                <a href="#home" onClick={()=> window.scrollTo(0, 0)}>Home</a> 
                <a href="#contact" onClick={()=> window.scrollTo(0, 1522)}>Contact</a>
                <a href="#about" onClick={()=> window.scrollTo(0, 1522)}>About</a>
            </div>
        </div>
    )
}

export default Header;
