import "../styles/footer.scss";

function Footer() {
  const currentYear= new Date().getFullYear(); 
  return (
    <div className="footer">
      <ul className="links">
        <li>About</li>
        <li>Help</li>
        <li>Privacy</li>
      </ul>
      <div className="copyright">@{currentYear} Created by <a style={{color: "white", fontWeight:"bold"}} href="https://github.com/felix1251" rel="noopener noreferrer" target="_blank">SOGK</a></div>
    </div>
  );
}

export default Footer;
