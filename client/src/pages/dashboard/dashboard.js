import React, { Component, useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/Profile/Profile";
<<<<<<< HEAD
import RewardsForm from "../../components/rewards/RewardsForm";
=======
import Game from "../../components/gamecard/gameCard";
>>>>>>> d538186e3424de317bf7748729501a32cd2f99c7

function Dashboard(props) {
    const [user, setUser] = useState([])

    return (
        <div>
            <Navbar />
            <Profile />
<<<<<<< HEAD
            <RewardsForm />
=======
            <Game />
>>>>>>> d538186e3424de317bf7748729501a32cd2f99c7
            
            
        </div>
        
    )
};

export default Dashboard;