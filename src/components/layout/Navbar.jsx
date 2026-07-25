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

            <Nav.Link>Home</Nav.Link>

            <Nav.Link>Products</Nav.Link>

            <Nav.Link>Categories</Nav.Link>

            <Nav.Link>About</Nav.Link>

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
            Login
          </Button>

          <Button className="register-btn">

            Register

          </Button>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  );

}

export default CustomNavbar;