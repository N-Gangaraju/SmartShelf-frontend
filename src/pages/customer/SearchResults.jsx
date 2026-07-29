import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../../services/productService";
import "./SearchResults.css";
import ProductCard from "../../components/Product/ProductCard";



function SearchResults() {

    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword");

    const [products, setProducts] = useState([]);


    useEffect(() => {

        if(keyword) {

            searchProducts(keyword)
                .then((response) => {

                    setProducts(response.data);

                })
                .catch((error) => {

                    console.log("Search Error:", error);

                });

        }

    }, [keyword]);


    return (

        <div className="search-results-container">

            <h2>
                Search Results for "{keyword}"
            </h2>


            <div className="product-grid">

                {
                    products.length > 0 ?

                    products.map((product) => (

                        
                        <ProductCard key={product.id} product={product} />

                    ))

                    :

                    <h3>
                        No Products Found
                    </h3>
                }


            </div>


        </div>

    );

}


export default SearchResults;