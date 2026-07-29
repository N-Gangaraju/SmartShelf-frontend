import { useEffect, useState } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Button
} from "react-bootstrap";

import {
    FaHeart,
    FaShoppingCart,
    FaTrash,
    FaArrowRight
} from "react-icons/fa";

import { Link } from "react-router-dom";

import {
    getWishlist,
    removeWishlist,
    moveToCart
} from "../../services/wishlistService";

import { toast } from "react-toastify";

import "./Wishlist.css";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {

        loadWishlist();

    }, []);

    const loadWishlist = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await getWishlist(token);

            setWishlist(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load wishlist");

        }

    };

    const handleDelete = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await removeWishlist(id, token);

            toast.success("Removed from wishlist");

            loadWishlist();

        } catch (error) {

            console.log(error);

            toast.error("Unable to remove product");

        }

    };

    const handleMove = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await moveToCart(id, token);

            toast.success("Product moved to cart");

            loadWishlist();

        } catch (error) {

            console.log(error);

            toast.error("Unable to move product");

        }

    };

    return (

        <div className="wishlist-page">

            <Container className="py-5">

                {/* HEADER */}

                <div className="wishlist-header">

                    <div>

                        <h2>

                            <FaHeart className="wishlist-title-icon" />

                            My Wishlist

                        </h2>

                        <p>

                            Keep your favorite products saved for later

                        </p>

                    </div>

                    <div className="wishlist-count">

                        {wishlist.length}

                        <span>

                            {wishlist.length === 1
                                ? " Product"
                                : " Products"}

                        </span>

                    </div>

                </div>

                {/* EMPTY WISHLIST */}

                {

                    wishlist.length === 0

                        ?

                        (

                            <Card className="empty-wishlist">

                                <Card.Body>

                                    <div className="empty-heart">

                                        <FaHeart />

                                    </div>

                                    <h3>

                                        Your wishlist is empty

                                    </h3>

                                    <p>

                                        Save products you like and
                                        come back to them anytime.

                                    </p>

                                    <Link
                                        to="/products"
                                        className="btn browse-products-btn"
                                    >

                                        Browse Products

                                        <FaArrowRight className="ms-2" />

                                    </Link>

                                </Card.Body>

                            </Card>

                        )

                        :

                        (

                            <Row>

                                {

                                    wishlist.map(item => (

                                        <Col
                                            lg={4}
                                            md={6}
                                            key={item.wishlistid}
                                            className="mb-4"
                                        >

                                            <Card className="wishlist-card">

                                                <Card.Body>

                                                    <div className="wishlist-product-icon">

                                                        <FaHeart />

                                                    </div>

                                                    <h5>

                                                        {item.productName}

                                                    </h5>

                                                    <p className="wishlist-label">

                                                        Saved Product

                                                    </p>

                                                    <h3 className="wishlist-price">

                                                        ₹ {item.price}

                                                    </h3>

                                                    <div className="wishlist-divider">

                                                    </div>

                                                    <div className="d-grid gap-2">

                                                        <Button

                                                            className="move-cart-btn"

                                                            onClick={() =>
                                                                handleMove(
                                                                    item.wishlistid
                                                                )
                                                            }

                                                        >

                                                            <FaShoppingCart className="me-2" />

                                                            Move to Cart

                                                        </Button>

                                                        <Button

                                                            className="remove-wishlist-btn"

                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.wishlistid
                                                                )
                                                            }

                                                        >

                                                            <FaTrash className="me-2" />

                                                            Remove

                                                        </Button>

                                                    </div>

                                                </Card.Body>

                                            </Card>

                                        </Col>

                                    ))

                                }

                            </Row>

                        )

                }

            </Container>

        </div>

    );

}

export default Wishlist;