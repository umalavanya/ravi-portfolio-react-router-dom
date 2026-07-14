import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-copyright">
                    &copy; {new Date().getFullYear()} - Ravi Kumar Bandapelli. All rights reserved.
                </p>
                <p className="footer-developer">
                    Developed by - <a href="https://umalavanya.github.io/ski-kru-simple/" className="footer-link" target="_blank" rel="noopener noreferrer">SkiKruDevs.com</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;