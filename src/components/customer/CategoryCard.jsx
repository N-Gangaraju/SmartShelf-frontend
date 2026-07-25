import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";


function CategoryCard({ category }) {

    const navigate = useNavigate();

    const openCategory = () => {

        navigate(
            `/products?category=${encodeURIComponent(category.name)}`
        );

    };

    return (

        <Card
            className="category-card"
            onClick={openCategory}
        >

            <Card.Body>

                <h4>{category.name}</h4>

                <p>
                    Explore {category.name}
                </p>

            </Card.Body>

        </Card>

    );

}

export default CategoryCard;