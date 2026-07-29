import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaFacebook,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
} from "react-icons/fa";
import "./Footer.css";


function Footer() {

    return (

        <footer className="footer">

            <Container>

                <Row>

                    <Col lg={4}>

                        <h3 className="footer-logo">

                            <span>Razz</span>Stock

                        </h3>

                        <p>

                            Shop smarter with premium products
                            at affordable prices.

                        </p>

                    </Col>

                    <Col lg={2}>

                        <h5>Quick Links</h5>

                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><a href="/#categories">Categories</a></li>
                            <li><Link to="/profile">Contact</Link></li>
                        </ul>

                    </Col>

                    <Col lg={3}>

                        <h5>Customer</h5>

                       <ul>
                            <li><Link to="/wishlist">Wishlist</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/orders">Orders</Link></li>
                            <li><Link to="/profile">My Profile</Link></li>
                        </ul>

                    </Col>

                    <Col lg={3}>

                        <h5>Contact</h5>

                        <p><FaEnvelope /> support@razzstock.com</p>

                        <p><FaPhoneAlt /> +91 8464091858</p>

                        <p><FaMapMarkerAlt /> Hyderabad, India</p>

                    </Col>

                </Row>

                <hr />

                <div className="footer-bottom">

                    <div>

                        © 2026 RazzStock. All Rights Reserved.

                    </div>

                    <div className="social-icons">

                        <FaGithub />

                        <FaLinkedin />

                        <FaInstagram />

                        <FaFacebook />

                    </div>

                </div>

            </Container>

        </footer>

    );

}

export default Footer;