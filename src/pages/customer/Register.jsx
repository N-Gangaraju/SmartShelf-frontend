import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/userService";
import "./Register.css";
import shoppingImage from "../../assets/images/shoping3.svg";
function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CUSTOMER"
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (user.password !== user.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const payload = {
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            };

            await registerUser(payload);

            toast.success("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

             if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Registration Failed");
            }

        }

    };

       return (

    <div className="register-page">

        <Container>

            <Row className="justify-content-center align-items-center">

                <Col lg={10}>

                    <Card className="register-card">

                        <Row className="g-0">

                            <Col lg={6} className="left-panel">

                                <img
                                    src={shoppingImage}
                                    alt="Shopping"
                                    className="shopping-image"
                                />

                                <h2 className="brand-title">
                                     <strong>RazzStock</strong> 
                                </h2>

                                <p className="brand-subtitle">

                                    <strong>Your one-stop destination for
                                    premium shopping experience.</strong>

                                </p>

                                <div className="feature-box">

                                    <div className="feature">

                                        <strong>🛒 Smart Shopping</strong>

                                    </div>

                                    <div className="feature">
                                        <strong>🚚 Fast Delivery</strong>
                                    

                                    </div>

                                    <div className="feature">

                                        <strong>🔒 Secure Payments</strong>

                                    </div>

                                    <div className="feature">

                                        <strong>⭐ Trusted Products</strong>

                                    </div>

                                </div>

                            </Col>

                            <Col lg={5} className="right-panel">

                                <h2 className="text-center mb-4 fw-bold">
                                    Create Account
                                </h2>

                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>Username</Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            placeholder="Enter username"
                                            required
                                        />

                                    </Form.Group>

                                    <Form.Group className="mb-3">

                                        <Form.Label>Email</Form.Label>

                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            required
                                        />

                                    </Form.Group>

                                    <Form.Group className="mb-3">

                                        <Form.Label>Password</Form.Label>

                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Enter password"
                                            required
                                        />

                                    </Form.Group>

                                    <Form.Group className="mb-4">

                                        <Form.Label>Confirm Password</Form.Label>

                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm password"
                                            required
                                        />

                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="register-btn"
                                    >
                                        Register
                                    </Button>

                                </Form>

                                <div className="text-center mt-4">

                                    Already have an account?

                                    <Link
                                        to="/login"
                                        className="login-link ms-2"
                                    >
                                        Login
                                    </Link>

                                </div>

                            </Col>

                        </Row>

                    </Card>

                </Col>

            </Row>

        </Container>

    </div>

);

    

}

export default Register;