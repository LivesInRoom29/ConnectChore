import React from "react";
import "./footer.css";

const Footer = () => (
  <footer>
    <h4>ConnectChore © 2020</h4>
        <br />
        <div className="social">
            <a href="https://www.facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
            <a href="https://github.com/LivesInRoom29/ConnectChore" target="_blank"><i className="fab fa-github"></i></a>
            <a href="#"><i className="far fa-envelope"></i></a>
            <a href="#"><i className="fas fa-mobile-alt"></i></a>
        </div>
  </footer>
);

export default Footer;