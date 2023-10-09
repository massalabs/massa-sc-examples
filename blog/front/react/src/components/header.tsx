import { MASSA_EXEMPLE } from "../const";

function Header() {
  return (
    <header className="font-mono p-4 font-extrabold flex justify-center">
      <h1 className="text-5xl">{MASSA_EXEMPLE.TITLE}</h1>
    </header>
  );
}

export default Header;
