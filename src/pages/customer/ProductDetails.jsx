import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FaShoppingCart, FaHeart, FaBolt } from "react-icons/fa";
import { getProductById } from "../../services/productService";
import "./ProductDetails.css";
import { addToCart } from "../../services/cartService";
import { toast } from "react-toastify";



function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const handleAddToCart = async () => {

    try {

        const token = localStorage.getItem("token");

        await addToCart({ productId: product.id, quantity: 1 }, token);

        toast.success("Product added to cart");

    } catch (error) {

        console.log(error);

        toast.error("Please login first");

    }

};

    useEffect(() => {

        loadProduct();

    }, []);

    const loadProduct = async () => {

        try {

            const response = await getProductById(id);

            setProduct(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!product) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <Container className="mt-5">

            <Row>

                <Col md={5}>

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-detail-image"
                    />

                </Col>

                <Col md={7}>

                    <Badge bg="primary" className="mb-2">

                        {product.category?.name}

                    </Badge>

                    <h2>{product.name}</h2>

                    <h5 className="text-secondary">

                        {product.brand}

                    </h5>

                    <h3 className="text-warning mt-3">

                        ₹ {product.price}

                    </h3>

                    <p className="mt-4">

                        {product.description}

                    </p>

                    <h6>

                        Supplier :

                        <span className="text-primary">

                            {" "}
                            {product.supplier?.name}

                        </span>

                    </h6>

                    <h6>

                        Available Stock :

                        <span className="text-success">

                            {" "}
                            {product.quantity}

                        </span>

                    </h6>

                    <div className="mt-4 d-flex gap-3">

                     <Button
                        variant="primary"
                        onClick={handleAddToCart} >
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                    </Button>
                    

                        <Button variant="warning">

                            <FaBolt /> Buy Now

                        </Button>

                        <Button variant="danger">

                            <FaHeart /> Wishlist

                        </Button>

                    </div>

                </Col>

            </Row>

        </Container>

    );

}

export default ProductDetails;