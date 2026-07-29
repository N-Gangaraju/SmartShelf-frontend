import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import hero from "../assets/images/hero.svg";
import "./Home.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryService";
import CategoryCard from "../components/customer/CategoryCard";
import CustomNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Home() {
  const [categories, setCategories] = useState([]);

useEffect(() => {

    loadCategories();

}, []);

const loadCategories = async () => {

    try{

        const response = await getAllCategories();

        setCategories(response.data);

    }

    catch(error){

        console.log(error);

    }

};
  return (
    <>
    <CustomNavbar />
    
    <section className="hero-section">

      <Container>

        <Row className="align-items-center">

          {/* LEFT */}

          <Col lg={6}>

           

            <h1 className="hero-title">
              Shop Smarter with
              <br />
              <span>RazzStock</span>
            </h1>

            <p className="hero-description">
              Discover premium products from trusted brands.
              Experience fast delivery, secure shopping, and unbeatable offers—
              all in one place.
            </p>

            <div className="hero-buttons">

              <Button className="shop-btn">
                Shop Now
              </Button>

              <Button className="explore-btn">
                Explore
                <FaArrowRight className="ms-2"/>
              </Button>

            </div>

            <div className="hero-stats">

              <div>
                <h3>10K+</h3>
                <p>Products</p>
              </div>

              <div>
                <h3>5K+</h3>
                <p>Customers</p>
              </div>

              <div>
                <h3>99%</h3>
                <p>Satisfaction</p>
              </div>

            </div>

          </Col>

          {/* RIGHT */}

          <Col lg={6} className="text-center">

            <img
              src={hero}
              alt="Shopping"
              className="hero-image"
            />

          </Col>

        </Row>

      </Container>
      
    </section>
    
    <section  id="categories" className="py-5 bg-white">

    <Container>

        <h2
        className="text-center mb-5 fw-bold">

            Shop By Categories

        </h2>

        <Row>

            {

                categories.map(category=>(

                    <Col
                    lg={3}
                    md={6}
                    className="mb-4"
                    key={category.id}>

                        <CategoryCard
                        category={category}/>

                    </Col>

                ))

            }

        </Row>

    </Container>

</section>


</>



  );
}

export default Home;