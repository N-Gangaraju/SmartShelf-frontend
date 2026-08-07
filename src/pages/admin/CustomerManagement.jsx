import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Form,
    Card,
    Badge
} from "react-bootstrap";

import Sidebar from "../../components/admin/Sidebar";
import { getAllUsers } from "../../services/userService";

function CustomerManagement() {

    const token = localStorage.getItem("token");

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {

        try {

            const response = await getAllUsers(token);
            const onlyCustomers = response.data.filter(
                (user) => user.role === "CUSTOMER"
            );
            setCustomers(onlyCustomers);
            setFilteredCustomers(onlyCustomers);

        } catch (err) {

            console.log(err);

        }

    };

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        const result = customers.filter((customer) =>
            customer.username.toLowerCase().includes(value.toLowerCase()) ||
            customer.email.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredCustomers(result);

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <Container fluid className="p-4">

                <Row className="mb-4">

                    <Col>

                        <h2>Customer Management</h2>

                    </Col>

                    <Col md={4}>

                        <Form.Control
                            placeholder="Search Customer..."
                            value={search}
                            onChange={handleSearch}
                        />

                    </Col>

                </Row>

                <Row className="mb-3">

                    <Col md={3}>

                        <Card className="shadow-sm">

                            <Card.Body>

                                <h6>Total Customers</h6>

                                <h3>{filteredCustomers.length}</h3>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

                <Table bordered hover responsive>

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredCustomers.length > 0 ? (

                            filteredCustomers.map((customer) => (

                                <tr key={customer.id}>

                                    <td>{customer.id}</td>

                                    <td>{customer.username}</td>

                                    <td>{customer.email}</td>


                                    <td>

                                        {customer.role === "ADMIN" ? (

                                            <Badge bg="danger">

                                                Admin

                                            </Badge>

                                        ) : (

                                            <Badge bg="success">

                                                Customer

                                            </Badge>

                                        )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center"
                                >

                                    No Customers Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </Table>

            </Container>

        </div>

    );

}

export default CustomerManagement;