import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Timer = () => {

    const { user } = useSelector(state => state.auth);

    const [seconds, setSeconds] = useState(0); // value of timer
    const [isActive, setIsActive] = useState(false); // timing or paused

    function toggle() {
        setIsActive(!isActive);
      }
    
      function reset() {
        setSeconds(0);
        setIsActive(false);
      }
    
      useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);

    return (
        <Container>
            <Row>
                <Col>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                    <p className="text-body">
                        Use this timer to help keep tasks on track! <br />
                        <br />
                    </p>

                    <div className="app">
                        <div className="time">
                            {seconds}s
                        </div>
                        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                            {isActive ? 'Pause' : 'Start'}
                        </button>
                        <button className="button-secondary" onClick={reset}>
                            Reset
                        </button>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default Timer;

// Tutorial
// https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

// The array at the end of that particular useEffect function is what’s called the dependency array. Whenever any of the values passed into that array change, that useEffect function will execute again. It’s the equivalent to the componentDidUpdate method in a React Class Component. It’s also good practice to put any variables that you use inside of the useEffect function into the dependency array.