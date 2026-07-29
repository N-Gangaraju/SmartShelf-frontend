import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge,Card } from "react-bootstrap";

import {
    FaShoppingCart,
    FaHeart,
    FaBolt,
    FaMinus,
    FaPlus,
    FaArrowLeft
} from "react-icons/fa";

import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";

import { toast } from "react-toastify";

import "./ProductDetails.css";
import {
    addReview,
    getReviewsByProduct
} from "../../services/reviewService";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [selectedQuantity, setSelectedQuantity] = useState(1);




    useEffect(() => {

        loadProduct();
        loadReviews();

    }, [id]);


    const loadProduct = async () => {

        try {

            const response = await getProductById(id);

            setProduct(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load product");

        }

    };

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const loadReviews = async () => {

    try {

        const response =
            await getReviewsByProduct(id);

        setReviews(response.data);

    } catch (error) {

        console.log(error);

    }

};

    const handleReview = async () => {

         console.log(product);
    console.log(rating);
    console.log(comment);

    try {

        const token =
            localStorage.getItem("token");

        await addReview(
            {
                productId: product.id,
                rating: Number(rating),
                comment:comment
            },
            token
        );

        toast.success("Review Added");

        setComment("");

        setRating(5);

        loadReviews();

    }

   catch (error) {

    console.log(error);

     const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to submit review";

    toast.error(message);
   

}

};

    const increaseQuantity = () => {

        if (
            product &&
            selectedQuantity < product.quantity
        ) {

            setSelectedQuantity(
                selectedQuantity + 1
            );

        }

    };


    const decreaseQuantity = () => {

        if (selectedQuantity > 1) {

            setSelectedQuantity(
                selectedQuantity - 1
            );

        }

    };


    const handleAddToCart = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                toast.error(
                    "Please login first"
                );

                navigate("/login");

                return;

            }


            await addToCart(

                {
                    productId: product.id,

                    quantity: selectedQuantity
                },

                token

            );


            toast.success(
                "Product added to cart 🛒"
            );

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data ||

                "Unable to add product to cart"

            );

        }

    };

    const handleBuyNow = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        await addToCart(
            {
                productId: product.id,
                quantity: 1
            },
            token
        );

        toast.success("Product added! Proceeding to cart...");

        navigate("/cart");

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Unable to process your request"
        );

    }

};



    const handleWishlist = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                toast.error(
                    "Please login first"
                );

                navigate("/login");

                return;

            }


            await addToWishlist(

                {
                    productId: product.id
                },

                token

            );


            toast.success(
                "Added to Wishlist ❤️"
            );

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data ||

                "Unable to add to wishlist"

            );

        }

    };


  


    if (!product) {

        return (

            <div className="product-loading">

                Loading product...

            </div>

        );

    }


    const inStock =
        product.quantity > 0;


    return (

        <div className="product-details-page">

            <Container>


                {/* BACK BUTTON */}

                <button

                    className="back-button"

                    onClick={() =>
                        navigate(-1)
                    }

                >

                    <FaArrowLeft />

                    Back to Products

                </button>


                <div className="product-details-card">


                    <Row className="g-5">


                        {/* PRODUCT IMAGE */}

                        <Col lg={6}>


                            <div className="product-image-section">


                                <img

                                    src={
                                        product.imageUrl
                                    }

                                    alt={
                                        product.name
                                    }

                                    className="
                                    details-product-image
                                    "

                                />


                            </div>


                        </Col>


                        {/* PRODUCT INFORMATION */}

                        <Col lg={6}>


                            <div className="
                            product-information
                            ">


                                <Badge
                                    className="
                                    category-badge
                                    "
                                >

                                    {
                                        product.categoryname ||
                                        "Category"
                                    }

                                </Badge>


                                <h1>

                                    {
                                        product.name
                                    }

                                </h1>


                                <p className="
                                product-brand
                                ">

                                    Brand:

                                    <strong>

                                        {
                                            product.brand
                                        }

                                    </strong>

                                </p>


                                <div className="
                                price-section
                                ">

                                    ₹ {
                                        product.price
                                    }

                                </div>


                                <div className="
                                stock-section
                                ">

                                    {

                                        inStock ?

                                        <span className="
                                        in-stock
                                        ">

                                            ✓ In Stock

                                        </span>

                                        :

                                        <span className="
                                        out-stock
                                        ">

                                            ✕ Out of Stock

                                        </span>

                                    }

                                </div>


                                <div className="
                                details-divider
                                ">


                                </div>


                                <h5>

                                    Product Description

                                </h5>


                                <p className="
                                product-description
                                ">

                                    {

                                        product.description ||

                                        "No description available."

                                    }

                                </p>


                                <div className="
                                product-extra-info
                                ">


                                    <p>

                                        <strong>

                                            Category:

                                        </strong>

                                        {

                                            product.categoryname ||

                                            "Not Available"

                                        }

                                    </p>


                                    <p>

                                        <strong>

                                            Supplier:

                                        </strong>

                                        {

                                            product.suppliername ||

                                            "Not Available"

                                        }

                                    </p>


                                    <p>

                                        <strong>

                                            Available Stock:

                                        </strong>

                                        {
                                            product.quantity
                                        }

                                        {" "}items

                                    </p>


                                </div>


                                {

                                    inStock && (

                                        <div className="
                                        quantity-section
                                        ">


                                            <span>

                                                Quantity

                                            </span>


                                            <div className="
                                            quantity-control
                                            ">


                                                <button

                                                    onClick={
                                                        decreaseQuantity
                                                    }

                                                >

                                                    <FaMinus />

                                                </button>


                                                <span>

                                                    {
                                                        selectedQuantity
                                                    }

                                                </span>


                                                <button

                                                    onClick={
                                                        increaseQuantity
                                                    }

                                                >

                                                    <FaPlus />

                                                </button>


                                            </div>


                                        </div>

                                    )

                                }


                                {/* ACTION BUTTONS */}

                                <div className="
                                product-action-buttons
                                ">


                                    <Button

                                        className="
                                        add-cart-button
                                        "

                                        onClick={
                                            handleAddToCart
                                        }

                                        disabled={
                                            !inStock
                                        }

                                    >

                                        <FaShoppingCart />

                                        Add to Cart

                                    </Button>


                                  <Button
                                    variant="warning"
                                    onClick={handleBuyNow}
                                >
                                    <FaBolt className="me-2" />
                                    Buy Now
                                </Button>


                                    <Button

                                        className="
                                        wishlist-button
                                        "

                                        onClick={
                                            handleWishlist
                                        }

                                    >

                                        <FaHeart />

                                        Wishlist

                                    </Button>


                                </div>


                            </div>


                        </Col>


                    </Row>


                </div>


            </Container>
            <hr className="my-5"/>
            <div className="review-form">

    <h4 className="mb-4">
        Write a Review
    </h4>

    <label className="mb-2 fw-semibold">
        Rating
    </label>

    <select
        className="form-select review-select mb-3"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
    >
        <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
        <option value={4}>⭐⭐⭐⭐ Very Good</option>
        <option value={3}>⭐⭐⭐ Good</option>
        <option value={2}>⭐⭐ Fair</option>
        <option value={1}>⭐ Poor</option>
    </select>

    <label className="mb-2 fw-semibold">
        Your Review
    </label>

    <textarea
        className="form-control review-textarea"
        rows="5"
        placeholder="Share your experience with this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
    />

    <Button
        className="review-submit-btn mt-4"
        onClick={handleReview}
    >
        Submit Review
    </Button>

</div>
        <h3 className="review-title">
    Customer Reviews
</h3>

<div className="reviews-container">

    {reviews.length === 0 ? (

        <div className="no-review">
            No reviews yet.
            Be the first to review this product.
        </div>

    ) : (

        reviews.map((review) => (

            <div
                className="review-card"
                key={review.reviewId}
            >

                <div className="review-header">

                    <div className="review-user">

                        <div className="review-avatar">
                            {review.username.charAt(0).toUpperCase()}
                        </div>

                        <div>

                            <h6>{review.username}</h6>

                            <small>{review.reviewdAt}</small>

                        </div>

                    </div>

                    <div className="review-rating">

                        {"⭐".repeat(review.rating)}

                    </div>

                </div>

                <p className="review-comment">

                    {review.comment}

                </p>

            </div>

        ))

    )}

</div>

        </div>

    );

}


export default ProductDetails;