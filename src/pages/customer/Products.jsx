import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getAllProducts, getProductsByCategory } from "../../services/productService";
import ProductCard from "../../components/common/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");

    useEffect(() => {

        loadProducts();

    }, [category]);

    const loadProducts = async () => {

        try{

            let response;

            if(category){

                response = await getProductsByCategory(category);

            }else{

                response = await getAllProducts();

            }

            setProducts(response.data);

        }catch(error){

            console.log(error);

        }

    };

    return (

        <Container className="mt-5">

            <h2 className="mb-4">

                Products

            </h2>

            <Row>

                {

                    products.map(product=>(

                        <Col lg={3} md={6} key={product.id} className="mb-4">


                                <ProductCard product={product} />

                        </Col>

                    ))

                }

            </Row>

        </Container>

    );

}

export default Products;