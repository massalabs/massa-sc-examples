import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import UseMassaStation from "./hooks/useMassaStation";
import { createContext } from "react";
import { ProviderService } from "./interfaces/ProviderService";

function App() {
    const massaStation = UseMassaStation();

    return (
        <div className="App theme-light">
            <Header />
            <MassaContext.Provider value={massaStation}>
                <Body />
            </MassaContext.Provider>
            <Footer />
        </div>
    );
}

export default App;

const MassaContext = createContext<ProviderService | null>(null);
export { MassaContext };
