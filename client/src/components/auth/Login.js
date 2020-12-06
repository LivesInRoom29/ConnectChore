import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Local CSS
import "./auth.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: ""
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    // Every form element has an onChange event that ties its value to our components state
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    // In our onSubmit event, we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked
    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const { errors } = this.state;

        return (
            <Container fluid style={{ height: "90vh" }} className="auth-container">
                <Row className="justify-content-center">
                    <br />
                    <br />
                    <br />
                    <Col md={5}>
                        {/* Login Form */}
                        <Form
                            noValidate
                            onSubmit={this.onSubmit}
                            className="loginform animation mt-5"
                        >
                            <Link to="/" className="btn button-hover text-dark">
                                <i className="fas fa-arrow-left"></i> Back to Home</Link>
                            <br />
                            <h4 className="auth mt-2">Welcome Back!</h4>
                            <p className="text-body">
                                Don't have an account? <Link to="/register" className=" button-hover text-muted">Register</Link>
                            </p>
                            <Form.Group as={Row} controlId="loginForm.email">
                                <Form.Label column sm={2}>Email</Form.Label>
                                <Col sm={10}>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        // Previous
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        className={classnames("", {
                                            invalid: errors.email || errors.emailnotfound
                                        })}
                                    />
                                    <span className="text-danger">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="loginForm.password">
                                <Form.Label column sm={2}>Password</Form.Label>
                                <Col sm={10}>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="enter password" 
                                        // Previous
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        className={classnames("", {
                                            invalid: errors.password || errors.passwordincorrect
                                        })}
                                    />
                                    <span className="text-danger">
                                        {errors.password}
                                        {errors.passwordincorrect}
                                    </span>
                                </Col>
                            </Form.Group>
                            <br />
                            <Button
                                style={{
                                    width: "150px",
                                    fontSize: "15px",
                                    borderRadius: "30px",
                                    backgroundColor: "#42b984",
                                    padding: "14px",
                                    color: "#fff",
                                    letterSpacing: "1.5px"
                                }}
                                type="submit"
                                className="btn btn-lg button-hover"
                            >
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

//export default Login;
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);