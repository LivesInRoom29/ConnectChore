import React, { Component, useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RewardsForm from "../../components/rewards/RewardsForm";
import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import Game from "../../components/gamecard/gameCard";

function Dashboard(props) {
    const [user, setUser] = useState([])

    return (
        <div>
            <Navbar />
            <Profile />

            <RewardsForm />
            <Game />
        </div>
    )
};

export default Dashboard;