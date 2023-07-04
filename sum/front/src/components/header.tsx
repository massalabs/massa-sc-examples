import { MASSA_EXEMPLE } from "../const";
import "../css/styleSheet.css";

function Header() {
    return (
        <header>
            <h1 className="headerTitle">{MASSA_EXEMPLE.TITLE}</h1>
            <p className="headerSubTitle">{MASSA_EXEMPLE.DESCRIPTION}</p>
        </header>
    );
}

export default Header;
