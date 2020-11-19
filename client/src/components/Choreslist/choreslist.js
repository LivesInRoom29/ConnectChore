import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import moment from "./client/public/index";

const choreslist = () => {
    var currentDay = moment().format("LLLL");

    return (
        <div className="main">
            <Navbar />
            <form>
                <p>List of Chores</p>
                <div class="col-12">
                    <button class="btn btn-light">make baed</button>
                </div>
                <div class="col-12">
                    <button class="btn btn-light">mow the lawn</button>
                </div>
                <div class="col-12">
                    <button class="btn btn-light">do Homework</button>
                </div>
                <div class="col-12">
                    <button class="btn btn-light">make dinner</button>
                </div>
                <div class="col-12">
                    <button class="btn btn-light"></button>
                </div>
                <div class="col-12">
                    <button class="btn btn-light"></button>
                </div>
            </form>

        </div>
    )
}

export default choreslist;