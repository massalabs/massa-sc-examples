// create a navbar component that will be used in the app.js file
import React from "react";
import "../css/styleSheet.css";

/**
 * This navbar contains:
 * - a generic title
 */
function Navbar() {
    return (
        <nav>
            <h1 className="title">Massa Smart contract example</h1>
        </nav>
    );
}

export default Navbar;
