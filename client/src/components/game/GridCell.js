import React, { Component } from "react";
//import storeGame


class GridCell extends Component {
  handleClick(){
    console.log(`clicked on columns ${this.props.x}`)
  }
    render() {
      return (
        <div className="cell" onClick={() => this.handleClick()}>
          <p>{this.props.x}, {this.props.y}</p>
        </div>
      )
    }
};


export default GridCell;

