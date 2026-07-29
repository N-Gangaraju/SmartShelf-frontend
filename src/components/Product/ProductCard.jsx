import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaHeart,
    FaShoppingCart,
    FaEye,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import { toast } from "react-toastify";

import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";

import "./ProductCard.css";


function ProductCard({ product }) {


    const navigate = useNavigate();


    const [cartLoading, setCartLoading] = useState(false);

    const [wishlistLoading, setWishlistLoading] = useState(false);



    const handleProductClick = () => {

        navigate(`/products/${product.id}`);

    };



    const handleAddToCart = async (event) => {
          console.log("ADD CART CLICKED");

        event.stopPropagation();


        const token = localStorage.getItem("token");


        if (!token) {

            toast.error("Please login to add products to your cart");

            navigate("/login");

            return;

        }


        try {

            setCartLoading(true);


            await addToCart(
                {
                    productId: product.id,
                    quantity: 1
                },
                token
            );


            toast.success(`${product.name} added to cart`);


        } catch (error) {


            console.log(error);


            toast.error(
                error.response?.data ||
                "Unable to add product to cart"
            );


        } finally {

            setCartLoading(false);

        }

    };





    const handleWishlist = async (event) => {

          console.log("WISHLIST CLICKED");

        event.stopPropagation();


        const token = localStorage.getItem("token");


        if (!token) {


            toast.error("Please login to add products to your wishlist");

            navigate("/login");

            return;

        }



        try {


            setWishlistLoading(true);



            await addToWishlist(
                {
                    productId: product.id
                },
                token
            );


            toast.success(`${product.name} added to wishlist ❤️`);



        } catch(error) {


            console.log(error);


            toast.error(
                error.response?.data ||
                "Unable to add product to wishlist"
            );


        } finally {

            setWishlistLoading(false);

        }


    };



    const isInStock = product.quantity > 0;



    return (


        <article
            className="product-card"
            onClick={handleProductClick}
        >


            <div className="product-image-wrapper">


                <div className="discount-badge">

                    15% OFF

                </div>



                <img

                    src={
                        product.imageUrl
                        ?
                        `http://localhost:8080/uploads/${product.imageUrl}`
                        :
                        "/images/no-product.png"
                    }

                    alt={product.name}

                    className="product-image"

                />


            </div>




            <div className="product-details">


                <span className="product-brand">

                    {product.brand || "Premium Brand"}

                </span>



                <h3 className="product-name">

                    {product.name}

                </h3>




                <div className="rating-row">

                    ⭐⭐⭐⭐⭐

                    <span>
                        (4.8)
                    </span>

                </div>




                <div className="price-row">

                    <h2>

                        ₹{Number(product.price).toLocaleString("en-IN")}

                    </h2>

                </div>




                <div className="stock-row">


                    {
                        isInStock

                        ?

                        <span className="in-stock">

                            <FaCheckCircle />

                            In Stock

                        </span>


                        :


                        <span className="out-of-stock">

                            <FaTimesCircle />

                            Out of Stock

                        </span>

                    }


                </div>





                <div className="card-buttons">


                    <button

                        className="view-btn"

                        onClick={(e)=>{

                            e.stopPropagation();

                            navigate(`/products/${product.id}`);

                        }}

                    >

                        <FaEye />

                        View

                    </button>





                    <button

                        className="add-cart-btn"

                        onClick={handleAddToCart}

                        disabled={!isInStock || cartLoading}

                    >

                        <FaShoppingCart />


                        {
                            cartLoading
                            ?
                            "Adding..."
                            :
                            "Cart"
                        }


                    </button>





                    <button

                        className="card-wishlist-btn"

                        onClick={handleWishlist}

                        disabled={wishlistLoading}

                    >

                        <FaHeart />

                    </button>



                </div>



            </div>


        </article>


    );

}


export default ProductCard;