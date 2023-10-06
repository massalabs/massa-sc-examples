import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App theme-light h-screen">
      <Header />

      <Body />

      <Footer />
    </div>
  );
}

export default App;
