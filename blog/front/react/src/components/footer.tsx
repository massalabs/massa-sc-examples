function Footer() {
  return (
    <footer className="footerContent  text-center py-8 bg-tertiary mt-5 h-[10%] fixed bottom-0 w-full font-Urbane">
      <a
        href="https://github.com/massalabs/massa-sc-examples"
        target="_blank"
        rel="noreferrer"
        className="mx-8 mas-menu-underline underline-offset-4"
      >
        Repository
      </a>
      |
      <a
        href="https://massa.net/"
        target="_blank"
        rel="noreferrer"
        className="mx-8 mas-menu-underline underline-offset-4"
      >
        Massa Website
      </a>
      |
      <a
        href="https://docs.massa.net/"
        target="_blank"
        rel="noreferrer"
        className="mx-8 mas-menu-underline underline-offset-4"
      >
        Documentation
      </a>
    </footer>
  );
}

export default Footer;
