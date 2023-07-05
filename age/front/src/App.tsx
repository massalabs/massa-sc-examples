import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import UseMassaStation from "./hooks/useMassaStation";

function App() {
    const massaStation = UseMassaStation();

    return (
        <div className="App theme-light">
            <Header />
            <Body {...massaStation} />
            <Footer />
        </div>
    );
}

export default App;
