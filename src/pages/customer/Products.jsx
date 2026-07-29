import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";

import {
Container,
Row,
Col
} from "react-bootstrap";

import {
useSearchParams
} from "react-router-dom";

import {
getProductsByCategory,
searchByBrand,
searchByPrice,
sortPriceHighToLow,
sortPriceLowToHigh,
getProductsPage,
getAllProducts
} from "../../services/productService";

import {
FaFilter,
FaBoxOpen,
FaArrowLeft,
FaArrowRight,
FaTimes
} from "react-icons/fa";

import ProductCard from "../../components/Product/ProductCard";

import "../Products.css";

function Products() {


const [products, setProducts] = useState([]);

const [allProducts, setAllProducts] = useState([]);

const [searchParams] = useSearchParams();

const category =
    searchParams.get("category");


const [selectedBrand, setSelectedBrand] =
    useState("");

const [sortOption, setSortOption] =
    useState("");

const [minPrice, setMinPrice] =
    useState("");

const [maxPrice, setMaxPrice] =
    useState("");

const [inStockOnly, setInStockOnly] =
    useState(false);

const [page, setPage] =
    useState(0);

const [totalPages, setTotalPages] =
    useState(0);

const [loading, setLoading] =
    useState(true);


const size = 8;


/*
Load all products once.

This is used only to create the complete
brand list. Your existing backend API is used.
*/

useEffect(() => {

    loadAllProducts();

}, []);


/*
Load products whenever a filter,
category, sort option, or page changes.
*/

useEffect(() => {

    loadProducts();

}, [
    category,
    page,
    selectedBrand,
    sortOption,
    minPrice,
    maxPrice
]);


const loadAllProducts = async () => {

    try {

        const response =
            await getAllProducts();

        setAllProducts(
            response.data
        );

    } catch (error) {

        console.log(error);

    }

};


const loadProducts = async () => {

    try {

        setLoading(true);

        let response;


        const noFiltersApplied =

            category === null &&

            selectedBrand === "" &&

            sortOption === "" &&

            minPrice === "" &&

            maxPrice === "";


        /*
        Default product pagination
        */

        if (noFiltersApplied) {

            response =
                await getProductsPage(
                    page,
                    size
                );

            setProducts(
                response.data.content
            );

            setTotalPages(
                response.data.totalPages
            );

            return;

        }


        /*
        Price sorting
        */

        if (sortOption === "asc") {

            response =
                await sortPriceLowToHigh();

        }

        else if (sortOption === "desc") {

            response =
                await sortPriceHighToLow();

        }


        /*
        Price range
        */

        else if (

            minPrice !== "" &&

            maxPrice !== ""

        ) {

            response =
                await searchByPrice(

                    minPrice,

                    maxPrice

                );

        }


        /*
        Brand
        */

        else if (

            selectedBrand !== ""

        ) {

            response =
                await searchByBrand(

                    selectedBrand

                );

        }


        /*
        Category
        */

        else if (category) {

            response =
                await getProductsByCategory(

                    category

                );

        }


        else {

            response =
                await getAllProducts();

        }


        setProducts(
            response.data
        );


        /*
        Pagination is only used
        on the default product view.
        */

        setTotalPages(0);


    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

};


/*
Complete brand list
*/

const brands = [

    ...new Set(

        allProducts

            .map(

                product =>

                    product.brand

            )

            .filter(Boolean)

    )

];


/*
In-stock filter
*/

const displayedProducts =

    inStockOnly

        ?

        products.filter(

            product =>

                product.quantity > 0

        )

        :

        products;


const clearFilters = () => {

    setSelectedBrand("");

    setSortOption("");

    setMinPrice("");

    setMaxPrice("");

    setInStockOnly(false);

    setPage(0);

};


const filtersActive =

    selectedBrand !== "" ||

    sortOption !== "" ||

    minPrice !== "" ||

    maxPrice !== "" ||

    inStockOnly ||

    category !== null;


return (

    <div className="products-page">


        <Container>


            {/* PAGE HEADER */}

            <div className="products-hero">


                <div>


                    <span className="products-label">

                        RAZZSTOCK COLLECTION

                    </span>


                    <h1>

                        Explore Products

                    </h1>


                    <p>

                        Find quality products
                        at the best prices.

                    </p>


                </div>


                <div className="products-hero-icon">

                    <FaBoxOpen />

                </div>


            </div>


            <Row>


                {/* FILTER SIDEBAR */}

                <Col
                    lg={3}
                    className="mb-4"
                >


                    <div className="filter-box">


                        <div className="filter-heading">


                            <div>

                                <FaFilter />

                                <span>

                                    Filters

                                </span>

                            </div>


                            {

                                filtersActive &&

                                <button

                                    className="clear-text-btn"

                                    onClick={
                                        clearFilters
                                    }

                                >

                                    Clear

                                </button>

                            }


                        </div>


                        <hr />


                        {/* BRAND */}


                        <div className="filter-section">


                            <label>

                                Brand

                            </label>


                            <select

                                className="form-select"

                                value={
                                    selectedBrand
                                }

                                onChange={(e) => {

                                    setSelectedBrand(

                                        e.target.value

                                    );

                                    setPage(0);

                                }}

                            >


                                <option value="">

                                    All Brands

                                </option>


                                {

                                    brands.map(

                                        brand => (

                                            <option

                                                key={brand}

                                                value={brand}

                                            >

                                                {brand}

                                            </option>

                                        )

                                    )

                                }


                            </select>


                        </div>


                        {/* SORT */}


                        <div className="filter-section">


                            <label>

                                Sort By Price

                            </label>


                            <select

                                className="form-select"

                                value={
                                    sortOption
                                }

                                onChange={(e) => {

                                    setSortOption(

                                        e.target.value

                                    );

                                    setPage(0);

                                }}

                            >


                                <option value="">

                                    Default

                                </option>


                                <option value="asc">

                                    Low to High

                                </option>


                                <option value="desc">

                                    High to Low

                                </option>


                            </select>


                        </div>


                        {/* PRICE */}


                        <div className="filter-section">


                            <label>

                                Price Range

                            </label>


                            <input

                                type="number"

                                className="form-control mb-2"

                                placeholder="Minimum price"

                                min="0"

                                value={
                                    minPrice
                                }

                                onChange={(e) => {

                                    setMinPrice(

                                        e.target.value

                                    );

                                    setPage(0);

                                }}

                            />


                            <input

                                type="number"

                                className="form-control"

                                placeholder="Maximum price"

                                min="0"

                                value={
                                    maxPrice
                                }

                                onChange={(e) => {

                                    setMaxPrice(

                                        e.target.value

                                    );

                                    setPage(0);

                                }}

                            />


                        </div>


                        {/* STOCK */}


                        <div className="stock-filter">


                            <input

                                type="checkbox"

                                id="stockCheck"

                                checked={
                                    inStockOnly
                                }

                                onChange={() =>

                                    setInStockOnly(

                                        !inStockOnly

                                    )

                                }

                            />


                            <label

                                htmlFor="stockCheck"

                            >

                                In Stock Only

                            </label>


                        </div>


                        <button

                            className="clear-filter-btn"

                            onClick={
                                clearFilters
                            }

                        >

                            <FaTimes />

                            Reset All Filters

                        </button>


                    </div>


                </Col>


                {/* PRODUCTS */}


                <Col lg={9}>

                    <div className="products-toolbar">

                        <div>

                            <span className="toolbar-label">
                                RAZZSTOCK STORE
                            </span>

                            <h3 className="toolbar-title">
                                Featured Products
                            </h3>

                            <p className="toolbar-subtitle">

                                Showing

                                <strong> {displayedProducts.length} </strong>

                                premium products

                            </p>

                        </div>

                        <div className="toolbar-right">

                            <span className="product-count-badge">

                                {displayedProducts.length} Items

                            </span>

                            {
                                filtersActive &&

                                <span className="active-filter">

                                    Filters Active

                                </span>

                            }

                        </div>

                    </div>

                    


                    {

                        loading

                            ?

                            <div className="products-loading">

                                Loading products...

                            </div>

                            :

                            displayedProducts.length > 0

                                ?

                                <Row>


                                    {

                                        displayedProducts.map(

                                            product => (

                                                <Col

                                                    xl={4}

                                                    md={6}

                                                    key={
                                                        product.id
                                                    }

                                                    className="mb-4"

                                                >

                                                    <ProductCard

                                                        product={
                                                            product
                                                        }

                                                    />

                                                </Col>

                                            )

                                        )

                                    }


                                </Row>


                                :

                                <div className="no-products">


                                    <div>

                                        <FaBoxOpen />

                                    </div>


                                    <h4>

                                        No Products Found

                                    </h4>


                                    <p>

                                        Try changing or
                                        clearing your filters.

                                    </p>


                                    <button

                                        className="btn btn-primary"

                                        onClick={
                                            clearFilters
                                        }

                                    >

                                        Clear Filters

                                    </button>


                                </div>

                    }


                    {/* PAGINATION */}


                    {

                        totalPages > 1 &&

                        !filtersActive &&

                        <div className="products-pagination">


                            <button

                                disabled={
                                    page === 0
                                }

                                onClick={() =>

                                    setPage(

                                        page - 1

                                    )

                                }

                            >

                                <FaArrowLeft />

                                Previous

                            </button>


                            <span>

                                Page

                                <strong>

                                    {" "}

                                    {page + 1}

                                </strong>

                                {" "}of{" "}

                                <strong>

                                    {totalPages}

                                </strong>

                            </span>


                            <button

                                disabled={

                                    page + 1 ===

                                    totalPages

                                }

                                onClick={() =>

                                    setPage(

                                        page + 1

                                    )

                                }

                            >

                                Next

                                <FaArrowRight />

                            </button>


                        </div>

                    }


                </Col>


            </Row>


        </Container>


    </div>
    

);


}

export default Products;
