import React from "react";
import "../css/styleSheet.css";

function Footer() {
    return (
        <footer className="footerContent">
            <a
                href="https://github.com/massalabs/massa-sc-examples"
                target="_blank"
                rel="noreferrer"
            >
                Repository
            </a>
            |
            <a href="https://massa.net/" target="_blank" rel="noreferrer">
                Massa Website
            </a>
            |
            <a
                href="https://docs.massa.net/en/latest/"
                target="_blank"
                rel="noreferrer"
            >
                Documentation
            </a>
        </footer>
    );
}

export default Footer;
