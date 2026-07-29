import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCart, removeFromCart ,updateQuantity,checkout} from "../../services/cartService";
import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        loadCart();

    }, []);

    const loadCart = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await getCart(token);

            setCartItems(response.data);

            const cartTotal = response.data.reduce(
                (sum, item) => sum + item.amount,
                0
            );

            setTotal(cartTotal);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load cart");

        }

    };

    const deleteItem = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await removeFromCart(id, token);

            toast.success("Item removed successfully");

            loadCart();

        } catch (error) {

            console.log(error);

            toast.error("Unable to remove item");

        }

    };

  const handleCheckout = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        const response = await checkout(token);

        toast.success(
            response.data || "Order placed successfully"
        );

        setTimeout(() => {

            navigate("/orders");

        }, 1200);

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Checkout failed"
        );

    }


};

const changeQuantity = async (cartId, quantity) => {

    try {

        const token = localStorage.getItem("token");

        await updateQuantity(cartId, quantity, token);

        loadCart(); // Refresh the cart after updating

    } catch (error) {

        console.log(error);

        toast.error("Unable to update quantity");

    }

};

    return (

        <Container className="py-5">

            <h2 className="fw-bold mb-4">
                🛒 My Shopping Cart
            </h2>

            <Row>

                <Col lg={8}>

                    <Card className="shadow-sm border-0">

                        <Card.Body>

                            {cartItems.length === 0 ? (

                                <div className="text-center py-5">

                                    <h4>Your cart is empty.</h4>

                                    <Link
                                        to="/products"
                                        className="btn btn-primary mt-3"
                                    >
                                        Continue Shopping
                                    </Link>

                                </div>

                            ) : (

                                <Table responsive>

                                    <thead>

                                        <tr>

                                            <th>Product</th>

                                            <th>Price</th>

                                            <th>Qty</th>

                                            <th>Total</th>

                                            <th></th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {cartItems.map((item) => (

                                            <tr key={item.cartId}>

                                                <td>

                                                    <div className="d-flex align-items-center">

                                                        

                                                        <div>

                                                            <h6 className="mb-1">
                                                                {item.productName}
                                                            </h6>

                                                            

                                                        </div>

                                                    </div>

                                                </td>

                                                    <td>
                                                        ₹ {item.price}
                                                    </td>

                                                    <td>

                                                        <div className="quantity-box">

                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() => changeQuantity(item.cartId, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </Button>

                                                            <span className="mx-3 fw-bold">
                                                                {item.quantity}
                                                            </span>

                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() => changeQuantity(item.cartId, item.quantity + 1)}
                                                            >
                                                                +
                                                            </Button>

                                                        </div>

                                                    </td>

                                                <td>
                                                    ₹ {item.amount}
                                                </td>

                                                <td>

                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => deleteItem(item.cartId)}
                                                    >
                                                        <FaTrash />
                                                    </Button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </Table>

                            )}

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <h4 className="mb-4">
                                Price Details
                            </h4>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Total</span>

                                <strong>
                                    ₹ {total}
                                </strong>

                            </div>

                            <hr />

                            <Button
                                className="w-100 mb-3"
                                variant="warning"
                                onClick={handleCheckout}
                            >
                                <FaShoppingBag className="me-2" />
                                Proceed to Checkout
                            </Button>

                            <Link
                                to="/products"
                                className="btn btn-outline-primary w-100"
                            >
                                <FaArrowLeft className="me-2" />
                                Continue Shopping
                            </Link>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}

export default Cart;