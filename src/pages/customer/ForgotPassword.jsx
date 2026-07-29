import { useState } from "react";

import {
Container,
Row,
Col,
Card,
Form,
Button
} from "react-bootstrap";

import {
useNavigate
} from "react-router-dom";

import {
toast
} from "react-toastify";

import {
forgotPassword
} from "../../services/userService";

import "./ForgotPassword.css";

function ForgotPassword() {


const navigate = useNavigate();

const [email, setEmail] = useState("");

const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        const response = await forgotPassword(email);

        toast.success(
            response.data || "OTP sent successfully"
        );

        navigate(
            "/reset-password",
            {
                state: {
                    email: email
                }
            }
        );

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Unable to send OTP"
        );

    } finally {

        setLoading(false);

    }

};


return (

    <div className="forgot-password-page">

        <Container>

            <Row className="justify-content-center">

                <Col lg={5} md={7}>

                    <Card className="forgot-password-card">

                        <Card.Body>

                            <div className="forgot-icon">

                                🔐

                            </div>

                            <h2>

                                Forgot Password?

                            </h2>

                            <p>

                                Enter your registered email.
                                We will send an OTP to reset
                                your password.

                            </p>


                            <Form onSubmit={handleSubmit}>

                                <Form.Group>

                                    <Form.Label>

                                        Email Address

                                    </Form.Label>

                                    <Form.Control

                                        type="email"

                                        placeholder="Enter your email"

                                        value={email}

                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }

                                        required

                                    />

                                </Form.Group>


                                <Button

                                    type="submit"

                                    className="forgot-btn"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ?

                                            "Sending OTP..."

                                            :

                                            "Send OTP"

                                    }

                                </Button>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    </div>

);


}

export default ForgotPassword;
