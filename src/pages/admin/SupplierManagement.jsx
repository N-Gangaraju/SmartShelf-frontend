import { useEffect, useState } from "react";
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

import Sidebar from "../../components/admin/Sidebar";
import AddSupplierModal from "../../components/admin/AddSupplierModal";

import {
    getAllSuppliers,
    deleteSupplier
} from "../../services/supplierService";

import { toast } from "react-toastify";

function SupplierManagement() {

    const [suppliers, setSuppliers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {

        try {

            const response = await getAllSuppliers();

            setSuppliers(response.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to Load Suppliers");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this supplier?")) return;

        try {

            await deleteSupplier(id);

            toast.success("Supplier Deleted Successfully");

            loadSuppliers();

        } catch (err) {

            console.log(err);

            toast.error("Unable to Delete Supplier");

        }

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <Container fluid className="p-4">

                <Row className="mb-4">

                    <Col>

                        <h2>Supplier Management</h2>

                    </Col>

                    <Col className="text-end">

                        <Button
                            onClick={() => {

                                setSelectedSupplier(null);

                                setShowModal(true);

                            }}
                        >

                            <FaPlus className="me-2" />

                            Add Supplier

                        </Button>

                    </Col>

                </Row>

                <Table bordered hover responsive>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Address</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {suppliers.map((supplier) => (

                            <tr key={supplier.id}>

                                <td>{supplier.id}</td>

                                <td>{supplier.name}</td>

                                <td>{supplier.email}</td>

                                <td>{supplier.phone}</td>

                                <td>{supplier.address}</td>

                                <td>

                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => {

                                            setSelectedSupplier(supplier);

                                            setShowModal(true);

                                        }}
                                    >

                                        <FaEdit />

                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(supplier.id)}
                                    >

                                        <FaTrash />

                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </Table>

                <AddSupplierModal
                    show={showModal}
                    handleClose={() => {

                        setShowModal(false);

                        setSelectedSupplier(null);

                    }}
                    selectedSupplier={selectedSupplier}
                    refreshSuppliers={loadSuppliers}
                />

            </Container>

        </div>

    );

}

export default SupplierManagement;