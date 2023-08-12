function Footer() {
    return (
        <footer className="bg-secondary footerContent mas-menu-underline w-full fixed bottom-0 text-center py-8">
            <a
                href="https://github.com/massalabs/massa-sc-examples"
                target="_blank"
                rel="noreferrer"
                className="mx-8"
            >
                Repository
            </a>
            |
            <a
                href="https://massa.net/"
                target="_blank"
                rel="noreferrer"
                className="mx-8"
            >
                Massa Website
            </a>
            |
            <a
                href="https://docs.massa.net/"
                target="_blank"
                rel="noreferrer"
                className="mx-8"
            >
                Documentation
            </a>
        </footer>
    );
}

export default Footer;
