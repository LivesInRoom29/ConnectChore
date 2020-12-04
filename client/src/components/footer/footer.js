import React, { Component } from "react";
import "../../App.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        {/* <br /> */}
        <div>ConnectChore © 2020<a href="https://github.com/LivesInRoom29/ConnectChore" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a></div>
            <a rel="nonreferrer" href="https://github.com/hilbug">Hilary Ferraro</a>&nbsp;&#124;&nbsp;
            <a rel="nonreferrer" href="https://github.com/LivesInRoom29">Molly Kizer</a>&nbsp;&#124;&nbsp;
            <a rel="nonreferrer" href="https://github.com/kdunphe">Kayla Dunphe</a>&nbsp;&#124;&nbsp;
            <a rel="nonreferrer" href="https://github.com/ARam2142">Andres Ramirez</a>&nbsp;&#124;&nbsp;
            <a rel="nonreferrer" href="https://github.com/ASheikh-io">Ahmed Sheikh</a>&nbsp;&#124;&nbsp;
            <a rel="nonreferrer" href="https://github.com/Bremah-mvp">Bremah Lwanga</a>
      </footer>
    );
  }
}

export default Footer;