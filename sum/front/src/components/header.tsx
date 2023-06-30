// create a header component that will be used in the app.js file
import React from "react";
import "../css/styleSheet.css";

/**
 * This header contains:
 * - a generic title
 */
function Header() {
    return (
        <header>
            <h1 className="title">Massa Smart contract example</h1>
        </header>
    );
}

export default Header;
