import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
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

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: ""
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    // Reference to remove UNSAFE code: https://stackoverflow.com/questions/62722407/how-to-change-update-componentwillreceiveprops-to-getderivedstatefromprops-in-re

    componentDidUpdate(prevProps) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <>
                <NavBar />
                <Container fluid style={{ height: "110vh" }} className="auth-container">
                    <Row className="justify-content-center">
                        <br />
                        <br />
                        <br />
                        <Col md={5}>
                            {/* Register Form */}
                            <Form
                                noValidate
                                onSubmit={this.onSubmit}
                                className="loginform animation mt-5"
                            >
                                <Link to="/" className="text-dark">
                                    <i className="fas fa-arrow-left"></i> Back to Home</Link>
                                <br />
                                <br />
                                <h4 className="auth mt-2">Create An Account</h4>
                                <p className="text-body">
                                    Already have an account? <Link to="/login" className="text-muted">Log In</Link>
                                </p>
                                <br />
                                {/* Form Group Name */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm={12}></Form.Label>
                                    <Col sm={12}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            // Previous
                                            onChange={this.onChange}
                                            value={this.state.name}
                                            error={errors.name}
                                            id="name"
                                            className={classnames("", {
                                                invalid: errors.name
                                            })}
                                        />
                                        <span className="text-danger">{errors.name}</span>
                                    </Col>
                                </Form.Group>
                                {/* Form Group Email */}
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
                                                invalid: errors.email
                                            })}
                                        />
                                        <span className="text-danger">{errors.email}</span>
                                    </Col>
                                </Form.Group>
                                {/* Form Group Password */}
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
                                                invalid: errors.password
                                            })}
                                        />
                                        <span className="text-danger">{errors.password}</span>
                                    </Col>
                                </Form.Group>
                                {/* Form Group Password Confirm */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm={12}></Form.Label>
                                    <Col sm={12}>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            // Previous
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                            error={errors.password2}
                                            id="password2"
                                            className={classnames("", {
                                                invalid: errors.password2
                                            })}
                                        />
                                        <span className="text-danger">{errors.password2}</span>
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
                                    Sign up
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default Register;
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
