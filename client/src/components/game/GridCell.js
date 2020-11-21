import React, { Component } from "react";

class GridCell extends Component {
    constructor(props) {
        super(props) 
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        console.log(`Clicked on column ${this.props.x}`)
    }

    render() {
        return (
            <div onClick={this.handleClick()}>
                <p>{this.props.x}, {this.props.y}</p>
            </div>
        )
    }
}

export default GridCell;

//x is column, y is row