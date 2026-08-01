import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBox,
    FaTags,
    FaTruck,
    FaShoppingCart,
    FaUsers,
    FaStar,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    const location = useLocation();

    return (

        <div className="admin-sidebar">

            <h3 className="logo">
                RazzStock
            </h3>

            <Nav className="flex-column">

                <Nav.Link
                    as={Link}
                    to="/admin/dashboard"
                    active={location.pathname === "/admin/dashboard"}
                >
                    <FaTachometerAlt /> Dashboard
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/products">
                    <FaBox className="me-2" /> Products
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/categories">
                    <FaTags /> Categories
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/suppliers">
                    <FaTruck /> Suppliers
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/orders">
                    <FaShoppingCart /> Orders
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/customers">
                    <FaUsers /> Customers
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/reviews">
                    <FaStar /> Reviews
                </Nav.Link>

                <Nav.Link as={Link} to="/login">
                    <FaSignOutAlt /> Logout
                </Nav.Link>

            </Nav>

        </div>

    );
}

export default Sidebar;