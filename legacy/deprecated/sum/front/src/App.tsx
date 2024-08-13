import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";

function App() {

    return (
        <div className="App theme-light">
            <Header />
                <Body />
            <Footer />
        </div>
    );
}

export default App;
