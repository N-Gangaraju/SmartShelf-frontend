import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import shoppingImage from "../assets/images/shoping4.svg";
import "./customer/Login.css";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loginData, setLoginData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(loginData);

             console.log("Response:", response);
        console.log("Response Data:", response.data);


            toast.success(response.data);

                navigate("/verify-otp", {
                        state: {
                            email: loginData.email,
                            username: loginData.username
                        }
                    });

        } catch (error) {

            console.log(error);

            toast.error("Invalid Username or Password");

        }

    };

    return (

        <div className="login-page">

            <Container>

                <Row className="justify-content-center">

                    <Col lg={10}>

                        <Card className="login-card">

                            <Row className="g-0">

                                <Col lg={6} className="login-left">

                                    <img
                                        src={shoppingImage}
                                        alt="Shopping"
                                        className="shopping-image"
                                    />

                                    <h2><strong>Welcome to
                                         RazzStock</strong>
                                        
                                    </h2>

                                    <p><strong>India's smartest shopping destination.</strong></p>

                                   <div className="feature-list">

                                        <p>🛒 <strong>Premium Products</strong></p>

                                        <p>🚚 <strong>Fast Delivery</strong></p>

                                        <p>🔒 <strong>100% Secure Payments</strong></p>

                                        <p>⭐ <strong>Exclusive Daily Deals</strong></p>

                                    </div>

                                </Col>

                                <Col lg={5} className="login-right">

                                    <h2 className="mb-4">

                                        Welcome Back

                                    </h2>

                                    <Form onSubmit={handleSubmit}>

                                        <Form.Group className="mb-3">

                                            <Form.Label>Username</Form.Label>

                                            <Form.Control
                                                type="text"
                                                name="username"
                                                placeholder="Enter your username"
                                                value={loginData.username}
                                                onChange={handleChange}
                                                required
                                            />

                                        </Form.Group>
                                        <Form.Group className="mb-3">

                                            <Form.Label>Email</Form.Label>

                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={loginData.email}
                                                onChange={handleChange}
                                                required
                                            />

                                        </Form.Group>

                                        <Form.Group className="mb-4">

                                            <Form.Label>Password</Form.Label>

                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Enter password"
                                                value={loginData.password}
                                                onChange={handleChange}
                                                required
                                            />

                                        </Form.Group>

                                        <Form.Check
                                            type="checkbox"
                                            label="Show Password"
                                            className="mb-3"
                                            onChange={() => setShowPassword(!showPassword)}
                                        />

                                        <Button
                                            type="submit"
                                            className="login-btn"
                                        >
                                            Login
                                        </Button>

                                    </Form>

                                    <div className="text-center mt-4">

                                        <Link to="/forgot-password">

                                            Forgot Password?

                                        </Link>

                                    </div>

                                    <div className="text-center mt-3">

                                        New User?

                                        <Link
                                            to="/register"
                                            className="ms-2"
                                        >

                                            Register

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

export default Login;