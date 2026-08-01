import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function AddProductModal({ show, handleClose, refreshProducts,selectedProduct }) {

    const token = localStorage.getItem("token");

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [image, setImage] = useState(null);

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        price: "",
        quantity: "",
        description: "",
        categoryId: "",
        supplierId: ""
    });

    useEffect(() => {
            loadData();
        }, []);

    useEffect(() => {

    if (selectedProduct) {

        setProduct({
            name: selectedProduct.name,
            brand: selectedProduct.brand,
            price: selectedProduct.price,
            quantity: selectedProduct.quantity,
            description: selectedProduct.description,
            categoryId: selectedProduct.categoryId,
            supplierId: selectedProduct.supplierId
        });

    } else {

        setProduct({
            name: "",
            brand: "",
            price: "",
            quantity: "",
            description: "",
            categoryId: "",
            supplierId: ""
        });

    }

}, [selectedProduct]);

    const loadData = async () => {

        try {

            const categoryRes = await axios.get("http://localhost:8080/categories");

            const supplierRes = await axios.get("http://localhost:8080/suppliers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCategories(categoryRes.data);
            setSuppliers(supplierRes.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async () => {

    try {

        if (selectedProduct) {

            await axios.put(
                `http://localhost:8080/products/update/${selectedProduct.id}`,
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Product Updated Successfully");

        } else {

            const productResponse = await axios.post(
                "http://localhost:8080/products/add",
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (image) {

                const formData = new FormData();

                formData.append("file", image);

                await axios.post(
                    `http://localhost:8080/products/${productResponse.data.id}/upload-image`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

            }

            toast.success("Product Added Successfully");

        }

        refreshProducts();
        handleClose();

    } catch (err) {

        console.log(err);

        toast.error("Unable to Save Product");

    }

};

    return (

        <Modal show={show} onHide={handleClose} size="lg">

            <Modal.Header closeButton>

                <Modal.Title>
                    {selectedProduct ? "Edit Product" : "Add Product"}
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Form.Group className="mb-3">

                        <Form.Label>Name</Form.Label>

                        <Form.Control
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Brand</Form.Label>

                        <Form.Control
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Price</Form.Label>

                        <Form.Control
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Quantity</Form.Label>

                        <Form.Control
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Description</Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Select
                        className="mb-3"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                    >

                         <option value="" disabled>
                                    Select Category
                                </option>

                        {

                            categories.map(category => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >

                                    {category.name}

                                </option>

                            ))

                        }

                    </Form.Select>

                    <Form.Select
                        className="mb-3"
                        name="supplierId"
                        value={product.supplierId}
                        onChange={handleChange}
                    >

                         <option value="" disabled>
                                Select Supplier
                            </option>

                        {

                            suppliers.map(supplier => (

                                <option
                                    key={supplier.id}
                                    value={supplier.id}
                                >

                                    {supplier.name}

                                </option>

                            ))

                        }

                    </Form.Select>

                    <Form.Group>

                        <Form.Label>

                            Product Image

                        </Form.Label>

                        <Form.Control
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >

                    Cancel

                </Button>

                <Button onClick={handleSubmit}>

                    {selectedProduct ? "Update Product" : "Save Product"}

                    </Button>

            </Modal.Footer>

        </Modal>

    );

}

export default AddProductModal;