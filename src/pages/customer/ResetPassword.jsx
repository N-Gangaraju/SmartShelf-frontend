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
useLocation,
useNavigate
} from "react-router-dom";

import {
toast
} from "react-toastify";

import {
resetPassword
} from "../../services/userService";

import "./ResetPassword.css";

function ResetPassword() {


const navigate = useNavigate();

const location = useLocation();

const email = location.state?.email || "";


const [otp, setOtp] = useState("");

const [newPassword, setNewPassword] =
    useState("");

const [confirmPassword, setConfirmPassword] =
    useState("");

const [loading, setLoading] =
    useState(false);


const handleSubmit = async (e) => {

    e.preventDefault();


    if (newPassword !== confirmPassword) {

        toast.error(
            "New password and confirm password do not match"
        );

        return;

    }


    try {

        setLoading(true);


        const response = await resetPassword({

            email: email,

            otp: otp,

            newPassword: newPassword

        });


        toast.success(
            response.data ||
            "Password reset successfully"
        );


        navigate("/login");


    } catch (error) {

        console.log(error);


        toast.error(

            error.response?.data ||

            "Unable to reset password"

        );


    } finally {

        setLoading(false);

    }

};


return (

    <div className="reset-password-page">

        <Container>

            <Row className="justify-content-center">

                <Col
                    lg={5}
                    md={7}
                >

                    <Card className="reset-password-card">

                        <Card.Body>

                            <div className="reset-icon">

                                🔑

                            </div>


                            <h2>

                                Reset Password

                            </h2>


                            <p>

                                Enter the OTP sent to

                                <br />

                                <strong>

                                    {email}

                                </strong>

                            </p>


                            <Form
                                onSubmit={handleSubmit}
                            >


                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        OTP

                                    </Form.Label>


                                    <Form.Control

                                        type="text"

                                        placeholder="Enter OTP"

                                        value={otp}

                                        onChange={(e) =>
                                            setOtp(
                                                e.target.value
                                            )
                                        }

                                        maxLength="6"

                                        required

                                    />

                                </Form.Group>


                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        New Password

                                    </Form.Label>


                                    <Form.Control

                                        type="password"

                                        placeholder="Enter new password"

                                        value={newPassword}

                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }

                                        required

                                    />

                                </Form.Group>


                                <Form.Group className="mb-4">

                                    <Form.Label>

                                        Confirm New Password

                                    </Form.Label>


                                    <Form.Control

                                        type="password"

                                        placeholder="Confirm new password"

                                        value={confirmPassword}

                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }

                                        required

                                    />

                                </Form.Group>


                                <Button

                                    type="submit"

                                    className="reset-btn"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ?

                                            "Resetting..."

                                            :

                                            "Reset Password"

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

export default ResetPassword;
