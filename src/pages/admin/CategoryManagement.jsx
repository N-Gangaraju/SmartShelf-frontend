import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
    Container,
    Row,
    Col,
    Table,
    Button
} from "react-bootstrap";

import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    getAllCategories,
    deleteCategory
} from "../../services/categoryService";

import AddCategoryModal from "../../components/admin/AddCategoryModal";

import { toast } from "react-toastify";

function CategoryManagement() {

    const token = localStorage.getItem("token");

    const [categories, setCategories] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const response = await getAllCategories();

            setCategories(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this category?"))
            return;

        try {

            await deleteCategory(id, token);

            toast.success("Category Deleted");

            loadCategories();

        } catch (err) {

            console.log(err);

            toast.error("Unable to Delete Category");

        }

    };

    return (

        <div className="d-flex">

            <Sidebar/>

            <Container fluid className="p-4">

                <Row className="mb-4">

                    <Col>

                        <h2>Category Management</h2>

                    </Col>

                    <Col className="text-end">

                        <Button
                            onClick={() => {
                                console.log(category);
                                setSelectedCategory(category);
                                setShowModal(true);
                            }}
                        >
                            <FaPlus className="me-2"/>
                            Add Category
                        </Button>

                    </Col>

                </Row>

                <Table bordered hover>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            categories.map(category => (

                                <tr key={category.id}>

                                    <td>{category.id}</td>

                                    <td>{category.name}</td>

                                    <td>

                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => {

                                                setSelectedCategory(category);

                                                setShowModal(true);

                                            }}
                                        >

                                            <FaEdit/>

                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                        >

                                            <FaTrash/>

                                        </Button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </Table>

                <AddCategoryModal
                    show={showModal}
                    handleClose={() => {
                        setShowModal(false);
                        setSelectedCategory(null);
                    }}
                    refreshCategories={loadCategories}
                    selectedCategory={selectedCategory}
                />

            </Container>

        </div>

    );

}

export default CategoryManagement;