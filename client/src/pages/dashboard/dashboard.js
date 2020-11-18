import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import RewardsForm from "../../components/rewards/RewardsForm";

function Dashboard(props) {
    const [user, setUser] = useState([])

    return (
        <div>
            <Navbar />
            <Profile />
            <RewardsForm />
            
            
        </div>
        
    )
};

export default Dashboard;