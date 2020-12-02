import React from "react";
import { Link } from "react-router-dom";
// import "./footer.css";
import "../../App.css";

const Footer = () => (
  <footer>
    <br />
    <h4><Link to="https://github.com/LivesInRoom29/ConnectChore" className="footer-style">ConnectChore <i className="fab fa-github"></i></Link></h4>
    {/* <h4>ConnectChore <a href="https://github.com/LivesInRoom29/ConnectChore" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a></h4> */}
  </footer>
);

export default Footer;