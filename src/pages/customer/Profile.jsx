import { Container, Card, Button } from "react-bootstrap";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import{useNavigate} from "react-router-dom";

function Profile() {

    const username = localStorage.getItem("username") || "User";

    const email = localStorage.getItem("email") || "Not Available";

    const role = localStorage.getItem("role") || "Customer";

    const navigate = useNavigate();

    return (

        <Container className="mt-5">

            <Card className="shadow border-0 profile-card">

                <Card.Body className="text-center">

                    <FaUserCircle
                        size={120}
                        color="#1565C0"
                    />

                    <h2 className="mt-3">
                        {username}
                    </h2>

                    <p className="text-muted">
                        {email}
                    </p>

                    <hr />

                    <div className="text-start mt-4">

                        <h6>
                            Username
                        </h6>

                        <p>{username}</p>

                        <h6>Email</h6>

                        <p>{email}</p>

                        <h6>Role</h6>

                        <p>{role}</p>

                    </div>

                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => navigate("/edit-profile")}
                    >
                        <FaEdit className="me-2" />
                        Edit Profile
                    </Button>

                </Card.Body>

            </Card>

        </Container>

    );

}

export default Profile;