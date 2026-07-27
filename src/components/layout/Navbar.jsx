import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";

import "./Navbar.css";
import { Link } from "react-router-dom";

function CustomNavbar() {

  const role = "GUEST";

  return (

    <Navbar
      expand="lg"
      className="custom-navbar"
    >

      <Container>

        <Navbar.Brand className="logo">

          <span className="blue">Razz</span>

          <span className="gold">Stock</span>

        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          <Nav className="me-auto ms-5">

            <Nav.Link as={Link} to="/">
              Home
          </Nav.Link>

          <Nav.Link as={Link} to="/products">
              Products
          </Nav.Link>

          <Nav.Link as={Link} to="/categories">
              Categories
          </Nav.Link>

           

            <Nav.Link as={Link} to="/cart"> <FaShoppingCart /> Cart </Nav.Link>

            <Link to="/orders" className="nav-link">  My Orders </Link>

            <Nav.Link as={Link} to="/wishlist">  ❤️ Wishlist </Nav.Link>

          </Nav>

          <Form className="d-flex me-4">

            <FormControl
              className="search-box"
              placeholder="Search Products..."
            />

            <Button className="search-btn">

              <FaSearch />

            </Button>

          </Form>

          <Button
            variant="outline-primary"
            className="me-2 login-btn"
          >
            <Nav.Link as={Link} to="/login">
                Login
            </Nav.Link>
          </Button>

          <Button className="register-btn">

            <Nav.Link as={Link} to="/register">
                Register
            </Nav.Link>

          </Button>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  );

}

export default CustomNavbar;