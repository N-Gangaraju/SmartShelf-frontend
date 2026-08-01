import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
    Container,
    Row,
    Col,
    Table,
    Button
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import {
    getAllCategories
} from "../../services/categoryService";

function AdminCategories() {

    const [categories, setCategories] = useState([]);

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

    return (

        <div className="d-flex">

            <Sidebar />

            <Container fluid className="p-4">

                <Row className="mb-4">

                    <Col>

                        <h2>Category Management</h2>

                    </Col>

                    <Col className="text-end">

                        <Button>

                            <FaPlus className="me-2"/>

                            Add Category

                        </Button>

                    </Col>

                </Row>

                <Table bordered hover>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Category Name</th>

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
                                            className="me-2">

                                            <FaEdit/>

                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm">

                                            <FaTrash/>

                                        </Button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </Table>

            </Container>

        </div>

    );

}

export default AdminCategories;