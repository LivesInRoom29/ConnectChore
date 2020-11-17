import React, { Component } from "react";
import FlipMove from "react-flip-move";

class PrizeList extends Component {
    constructor(props) {
        super(props);
        this.createPrizes = this.createPrizes.bind(this);
    }

    createPrizes(item) {
        return <li onClick={() => this.delete(item.key)}
                    key={item.key}>{item.prize}</li>
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        var PrizeEntries = this.props.entries;
        var PrizeItems = PrizeEntries.map(this.createPrizes);

        return (
            <ul className="theList">
                <FlipMove duration={150} easing="ease-out">{/* this is to animate the earase effect */}
                    {PrizeItems}
                </FlipMove>
            </ul>
        );
    }

}

export default PrizeList;