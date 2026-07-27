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
    FaTrash
} from "react-icons/fa";

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

            toast.success("Removed Successfully");

            loadWishlist();

        } catch (error) {

            toast.error("Unable to remove");

        }

    };

    const handleMove = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await moveToCart(id, token);

            toast.success("Moved to Cart");

            loadWishlist();

        } catch (error) {

            toast.error("Unable to move");

        }

    };

    return (

        <Container className="py-5">

            <h2 className="mb-4">

                ❤️ My Wishlist

            </h2>

            <Row>

                {

                    wishlist.length === 0 ?

                    (

                        <Col>

                            <Card className="text-center p-5">

                                <h4>

                                    Wishlist is Empty

                                </h4>

                            </Card>

                        </Col>

                    )

                    :

                    wishlist.map(item => (

                        <Col
                            md={4}
                            key={item.wishlistid}
                            className="mb-4"
                        >

                            <Card className="wishlist-card">

                                <Card.Body>

                                    <h5>

                                        {item.productName}

                                    </h5>

                                    <h4 className="text-primary">

                                        ₹ {item.price}

                                    </h4>

                                    <div className="d-grid gap-2 mt-4">

                                        <Button

                                            variant="warning"

                                            onClick={() => handleMove(item.wishlistid)}

                                        >

                                            <FaShoppingCart className="me-2"/>

                                            Move To Cart

                                        </Button>

                                        <Button

                                            variant="outline-danger"

                                            onClick={() => handleDelete(item.wishlistid)}

                                        >

                                            <FaTrash className="me-2"/>

                                            Remove

                                        </Button>

                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))

                }

            </Row>

        </Container>

    );

}

export default Wishlist;