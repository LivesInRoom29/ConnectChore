//export default connect(null)(Chore);
import React from "react";
import styles from "../componentStyles/ChoreList.css";
import { connect } from "react-redux";
import ChoreForm from "./ChoreForm";
import Chore from "./Chore";
import { Link } from "react-router-dom";
export class ChoreList extends React.Component {
  state = {
    formDisplay: false
  };
  toggleForm(event) {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
  render() {
    let formComponent;
    if (this.state.formDisplay) {
      formComponent = <ChoreForm toggleForm={this.toggleForm.bind(this)} />;
    }
    //if no chores in chart yet, show explanatory message so user knows how to interact with the tool
    let noChoresYet;
    if (this.props.chores.length === 0) {
      noChoresYet = (
        <div className={styles.chartExplainBox}>
          <div className={styles.iconContain}>
            <img
              className={styles.choreIcon}
              alt="Bucket and mop icon"
              src={require("../images/bucket.png")} />
          </div>
          <p className={styles.explainText}><b>Your household</b> hasn't created any chores yet! To begin your list, click the "Add Chore" button above.</p>
          <p className={styles.explainText}><b>Give the chore</b> a name, then decide how many times it should be done each week and how many points it should be worth (based on the difficulty or grodiness of the chore—you decide).</p>
          <p className={styles.explainText}><b>When you</b> complete a chore, get points by clicking on one of the circles inside the chore and selecting your name from the dropdown menu. Happy tidying!</p>
        </div>
      )
    }
    const choreKeys = Object.keys(this.props.chores)
    const chores = choreKeys.map((choreKey, index) => {
      return <Chore
        key={index}
        {...this.props.chores[choreKey]}
        completions={this.props.completions.filter(comp => comp.choreId === this.props.chores[choreKey].id)}
        members={this.props.members}
       />;
    });
    return (
      <div className={styles.choreListContainer}>
        <div className={styles.resetContainer}>
          This chart shows chore completions from the last 7 days. To see more a detailed chore history, check out the <Link className={styles.internalNavLink} to="/stats"> Household Stats</Link> page.
        </div>
        <div className={styles.listTop}>
          {formComponent}
          <div className={styles.choreButtonContainer}>
            <button
              className={styles.addChore}
              onClick={() => {
                this.toggleForm();
              }}
            >
              Add Chore
            </button>
          </div>
        </div>
        {noChoresYet}
        {chores}
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  members: state.chart.members,
  chores: state.chart.chores,
  completions: state.chart.completions
});
export default connect(mapStateToProps)(ChoreList);