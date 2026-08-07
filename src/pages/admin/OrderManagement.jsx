import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Form,
    Badge
} from "react-bootstrap";

import Sidebar from "../../components/admin/Sidebar";
import {
    getAllOrders,
    updateOrderStatus
} from "../../services/orderService";

import { toast } from "react-toastify";

function OrderManagement() {

    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await getAllOrders(token);

            console.log(response.data);

            setOrders(response.data);

        } catch (err) {
            console.log(err);
            toast.error("Unable to Load Orders");
        }
    };

    const changeStatus = async (id, status) => {
        try {

            await updateOrderStatus(id, status, token);

            toast.success("Order Updated Successfully");

            loadOrders();

        } catch (err) {

            console.log(err);

            toast.error("Unable to Update Order");
        }
    };

    const getBadge = (status) => {
        switch (status) {
            case "PENDING":
                return <Badge bg="warning">Pending</Badge>;

            case "SHIPPED":
                return <Badge bg="primary">Shipped</Badge>;

            case "DELIVERED":
                return <Badge bg="success">Delivered</Badge>;

            case "CANCELLED":
                return <Badge bg="danger">Cancelled</Badge>;

            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (

        <div className="d-flex">

            <Sidebar />

            <Container fluid className="p-4">

                <Row className="mb-4">

                    <Col>

                        <h2>Order Management</h2>

                    </Col>

                </Row>

                <Table bordered hover responsive>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Change Status</th>
                            <th>Ordered At</th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.length > 0 ? (

                            orders.map((order) => (

                                <tr key={order.orderId}>

                                    <td>{order.orderId}</td>

                                    <td>{order.username}</td>

                                    <td>{order.productName}</td>

                                    <td>{order.quantity}</td>

                                    <td>₹{order.price}</td>

                                    <td>₹{order.amount}</td>

                                    <td>
                                        {getBadge(order.status)}
                                    </td>

                                    <td>

                                       <Form.Select
                                        value={order.status}
                                        disabled={
                                            order.status === "DELIVERED" ||
                                            order.status === "CANCELLED"
                                        }
                                        onChange={(e) =>
                                            changeStatus(order.orderId, e.target.value)
                                        }
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </Form.Select>

                                    </td>

                                    <td>{order.orderedAt}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="9" className="text-center">
                                    No Orders Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </Table>

            </Container>

        </div>
    );
}

export default OrderManagement;