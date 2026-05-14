import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Nigel Battee - My Weather App. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
