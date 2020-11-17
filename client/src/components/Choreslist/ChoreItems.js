import React, { Component } from "react";

class ChoreItems extends Component {
    constructor(props) {
        super(props);
        this.createChores = this.createChores.bind(this);
    }

    makeChores(item) {
        return <li onClick={() => this.delete(item.key)}
                style={{color: item.color}}
                key={item.key}>{item.name} - {item.text}
                </li>
    }

    // render() {
    //     var ChoreEntries = this.props.entries;
    //     var ChoreItems = ChoreEntries.map(this.createChores);
    //     return (
    //         //make code here
    //     );
    // }
}

export default ChoreItems;

// Chore List
// Suggestions on page (just text) but input box to add their own
// On Submit API call to append chores to list
// Add more button
// Creating list
// Adding chores
// Choose a frequency - 1x or 2x per week? Daily?
// Completed on is null = done (taskjs)
// Change the color for the status, strikethrough, some way to tell the task has been completed. Conditional formatting.
// Saving chores to database and list at same time
// Save button?
// Rewards: when you’re done with chores or get bingo, here’s the reward list
