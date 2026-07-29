import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaLaptop,
    FaMobileAlt,
    FaTshirt,
    FaCouch,
    FaHome,
    FaGamepad
} from "react-icons/fa";

function Categories() {

    const navigate = useNavigate();

    const categories = [
        { name: "Electronics", icon: <FaLaptop /> },
        { name: "Mobiles", icon: <FaMobileAlt /> },
        { name: "Fashion", icon: <FaTshirt /> },
        { name: "Furniture", icon: <FaCouch /> },
        { name: "Home", icon: <FaHome /> },
        { name: "Gaming", icon: <FaGamepad /> }
    ];

    return (
        <Container className="py-5">

            <h2 className="text-center fw-bold mb-5">
                Shop by Categories
            </h2>

            <Row>

                {categories.map((category) => (

                    <Col lg={4} md={6} className="mb-4" key={category.name}>

                        <Card
                            className="shadow-sm border-0 text-center p-4"
                            style={{ cursor: "pointer", borderRadius: "15px" }}
                            onClick={() =>
                                navigate(`/products?category=${category.name}`)
                            }
                        >

                            <div style={{ fontSize: "50px", color: "#0d6efd" }}>
                                {category.icon}
                            </div>

                            <h4 className="mt-3">
                                {category.name}
                            </h4>

                        </Card>

                    </Col>

                ))}

            </Row>

        </Container>
    );
}

export default Categories;