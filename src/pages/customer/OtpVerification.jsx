import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { verifyOtp } from "../../services/userService";
import "./OtpVerification.css";

function OtpVerification() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";
    const username = location.state?.username || "";

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

        const response = await verifyOtp({
            email,
            otp
        });

        console.log("Response:", response);
        console.log("Response Data:", response.data);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);

        toast.success("Login Successful");

        if (response.data.role === "ADMIN") {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }

     } catch (error) {

        console.log(error);

        toast.error("Invalid or Expired OTP");
    }
        };

    return (

        <div className="otp-page">

            <Container>

                <Row className="justify-content-center">

                    <Col md={5}>

                        <Card className="otp-card shadow">

                            <Card.Body>

                                <h2 className="text-center mb-4">

                                    Verify OTP

                                </h2>

                                <p className="text-center text-muted">

                                    OTP has been sent to

                                    <br />

                                    <strong>{email}</strong>

                                </p>

                                <Form onSubmit={handleSubmit}>

                                    <Form.Group>

                                        <Form.Label>Enter OTP</Form.Label>

                                        <Form.Control
                                            type="text"
                                            maxLength={6}
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) =>
                                                setOtp(e.target.value)
                                            }
                                            required
                                        />

                                    </Form.Group>

                                    <Button
                                        className="otp-btn mt-4"
                                        type="submit"
                                    >

                                        Verify OTP

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

export default OtpVerification;