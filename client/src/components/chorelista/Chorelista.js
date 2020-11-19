import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
//import React-Redux from "react-redux";
//import Chorelista from "./components/chorelista/chorelista";


export class Chorelista extends React.Component {
state = {
  formDisplay: false,
  warnDisplay: false
}
toggleForm(event, id) {
  this.setState({
    formDisplay: !this.state.formDisplay
  });
}
toggleWarn(event) {
  this.setState({
    warnDisplay: !this.state.warnDisplay
  });
}

  render() {
    const { id, choreName, pointValue, timesPerWeek, completions, members } = this.props;
    const complete = completions.find(c => c.choreId === id)
    let memberResponsible
    if (complete) {
      memberResponsible = members.find(m => complete.memberId === m.id)
    }
    let pointPlural;
    pointValue !== 1 ? (pointPlural = "points") : (pointPlural = "point");
    let timeDescript;
     if (timesPerWeek === 1) {
       timeDescript = "Once"
     } else if (timesPerWeek === 2) {
        timeDescript = "Twice"
     } else timeDescript = `${timesPerWeek} times`
    let choreBubbles = this.bubbleMaker(memberResponsible);
    let formComponent;
    // if (this.state.formDisplay) {
    //   formComponent = <EditChore
    //     {...this.props}
    //     toggleForm={this.toggleForm.bind(this)} />;
    // }
    let warnComponent;
    // if (this.state.warnDisplay) {
    //   warnComponent = (
    //     <ChoreDeleteWarn
    //       removeChore={e => {
    //         this.removeChore(e, id);
    //       }}
    //       toggleWarn={this.toggleWarn.bind(this)}
    //     />
    //   );
    // }
    let infoBox;
    if (!this.state.formDisplay) {
      infoBox =
      <div>
                <div>{choreName}<span>    ({timeDescript} a week)</span></div>
                <div>
                  Worth {pointValue} {pointPlural}
                </div>
                <div>
                  <div
                    onClick={e => this.toggleForm(e)}
                  >
                    <img
                      alt="Edit"
                      src={require("../images/edit.png")}
                    />
                  </div>
                  <div
                    onClick={e => this.toggleWarn(e)}
                    >
                    <img
                      alt="Delete"
                      src={require("../images/trash.png")}
                    />
                  </div>
                </div>
              </div>
    }
    return (
      <div key={id}>
        <div>
          {infoBox}
          {formComponent}
          {warnComponent}
          {choreBubbles}
        </div>
      </div>
    );
  }
}
