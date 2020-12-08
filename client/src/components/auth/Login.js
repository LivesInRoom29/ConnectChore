import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import NavBar from "../layout/Navbar";
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

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/dashboard"); // push user to dashboard when they login
    //     }
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    // Reference to remove UNSAFE code: https://stackoverflow.com/questions/62722407/how-to-change-update-componentwillreceiveprops-to-getderivedstatefromprops-in-re

    componentDidUpdate(prevProps) {
        //console.log(prevProps.auth, this.props.auth, this.props.history);
        if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      
        //console.log(this.props.history);
        if (prevProps.errors !== this.props.errors) { // <-- Only update error state if value different
          this.setState({
            errors: this.props.errors,
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
            <>
                <NavBar />
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
                                className="loginform animation mt-5">
                                <Link to="/" className="text-dark">
                                    <i className="fas fa-arrow-left"></i> Back to Home</Link>
                                <br />
                                <br />
                                <h4 className="auth mt-2">Welcome Back!</h4>
                                <p className="text-body">
                                    Don't have an account? <Link to="/register" className="text-muted">Register</Link>
                                </p>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={12}></Form.Label>
                                    <Col sm={12}>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            // Previous
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors.email}
                                            id="email"
                                            className={classnames("", {
                                                invalid: errors.email || errors.emailnotfound
                                            })}
                                        />
                                        <span className="text-danger" key={errors.length}>
                                            {errors.email}
                                            {errors.emailnotfound}
                                        </span>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={12}></Form.Label>
                                    <Col sm={12}>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
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
                                        height: "50px",
                                        fontSize: "15px",
                                        textTransform: "uppercase",
                                        borderRadius: "30px",
                                        border: "none",
                                        padding: "12px",
                                        backgroundColor: "#42b984",
                                        color: "white",
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
            </>
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