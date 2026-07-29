import { Container, Card, Form, Button } from "react-bootstrap";
import { FaSave, FaUserEdit } from "react-icons/fa";
import "./EditProfile.css";

function EditProfile() {

    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    const role = localStorage.getItem("role") || "CUSTOMER";

    return (

        <Container className="mt-5">

            <Card className="edit-profile-card shadow">

                <Card.Body>

                    <div className="text-center mb-4">

                        <FaUserEdit size={70} color="#1565C0" />

                        <h2 className="mt-3">Edit Profile</h2>

                    </div>

                    <Form>

                        <Form.Group className="mb-3">

                            <Form.Label>Username</Form.Label>

                            <Form.Control
                                type="text"
                                defaultValue={username}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                defaultValue={email}
                            />

                        </Form.Group>

                        <Form.Group className="mb-4">

                            <Form.Label>Role</Form.Label>

                            <Form.Control
                                type="text"
                                defaultValue={role}
                                disabled
                            />

                        </Form.Group>

                        <Button className="save-btn w-100">

                            <FaSave className="me-2" />

                            Save Changes

                        </Button>

                    </Form>

                </Card.Body>

            </Card>

        </Container>

    );

}

export default EditProfile;