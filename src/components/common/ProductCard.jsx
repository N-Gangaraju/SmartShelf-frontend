import { Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/cartService";



function ProductCard({ product }) {

    const navigate = useNavigate();
    const handleAddToCart = async () => {

        try {

            const token = localStorage.getItem("token");

            await addToCart(
              {
                  productId: product.id,
                  quantity: 1
              },
              token
          );

            alert("Product added to cart");

        } catch (error) {

            console.log(error);

            alert("Please login first");

        }

    };

 const imageUrl = product.imageUrl
  ? product.imageUrl
  : "https://via.placeholder.com/300x250?text=No+Image";

  return (

    <Card className="product-card h-100">

      <div className="image-box">

        <Card.Img
          variant="top"
          src={imageUrl}
          className="product-image"
        />

      </div>

      <Card.Body>

        <small className="brand">
          {product.brand}
        </small>

        <h5 className="product-name">
          {product.name}
        </h5>

        <h4 className="price">
          ₹ {product.price}
        </h4>

        <p className="stock">

          Stock :
          <span>
            {" "}
            {product.quantity}
          </span>

        </p>

        <div className="action-buttons">

         <Button
             className="view-btn"
            onClick={() => navigate(`/products/${product.id}`)}
>
             <FaEye />
        </Button>

        <Button
             className="cart-btn"
             onClick={handleAddToCart}
>
         <FaShoppingCart />
        </Button>

          <Button className="wish-btn">

            <FaHeart />

          </Button>

        </div>

      </Card.Body>

    </Card>

  );

}

export default ProductCard;