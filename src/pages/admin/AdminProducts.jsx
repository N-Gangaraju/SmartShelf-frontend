import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
    Table,
    Button,
    Container,
    Row,
    Col,
    Form
} from "react-bootstrap";

import {
    FaEdit,
    FaTrash,
    FaPlus
} from "react-icons/fa";

import { getAllProducts,deleteProduct } from "../../services/productService";
import AddProductModal from "../../components/admin/AddProductModal";
import { toast } from "react-toastify";

function AdminProducts() {

    const token = localStorage.getItem("token");

    const [showModal, setShowModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await getAllProducts();

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }

    };
   
    const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
    }

    try {

        await deleteProduct(id, token);

        toast.success("Product Deleted Successfully");

        loadProducts();

    } catch (err) {

        console.log(err);

        toast.error("Unable to delete product");

    }

};
    return (

        <div className="d-flex">

            <Sidebar />

            <Container fluid className="p-4">

                <Row className="mb-4">

                    <Col>

                        <h2>

                            Product Management

                        </h2>

                    </Col>

                    <Col className="text-end">

                        <Button
                            onClick={()=>{
                                setSelectedProduct(null);
                                setShowModal(true);
                            }}
                            >
                                <FaPlus className="me-2"/>
                                Add Product
                            </Button>

                    </Col>

                </Row>

                <Table bordered hover responsive>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Image</th>

                            <th>Name</th>

                            <th>Brand</th>

                            <th>Category</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map(product => (

                                <tr key={product.id}>

                                    <td>{product.id}</td>

                                    <td>

                                        <img

                                            src={product.imageUrl}

                                            width="60"

                                            alt="product"

                                        />

                                    </td>

                                    <td>{product.name}</td>

                                    <td>{product.brand}</td>

                                    <td>{product.categoryname}</td>

                                    <td>₹{product.price}</td>

                                    <td>{product.quantity}</td>

                                    <td>

                                       <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={()=>{
                                                setSelectedProduct(product);
                                                setShowModal(true);
                                                 console.log(product);
                                            }}
                                            >
                                               
                                                <FaEdit/>
                                            </Button>
                                                

                                      <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <FaTrash/>
                                    </Button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </Table>
                <AddProductModal
                    show={showModal}
                    handleClose={() => {
                        setShowModal(false);
                        setSelectedProduct(null);
                    }}
                    refreshProducts={loadProducts}
                    selectedProduct={selectedProduct}
                />

            </Container>
          

        </div>

    );

}

export default AdminProducts;