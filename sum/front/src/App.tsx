import "./App.css";

import React from "react";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import UseMassaStation from "./hooks/useMassaStation";

function App() {
    const massaStation = UseMassaStation();

    return (
        <div className="App">
            <Header />
            <Body {...massaStation} />
            <Footer />
        </div>
    );
}

export default App;
