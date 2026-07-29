import { useEffect, useState } from "react";
import { Container, Card, Table, Button ,Badge,Row,Col} from "react-bootstrap";
import { toast } from "react-toastify";
import {
    getMyOrders,
    cancelOrder,
    downloadInvoice
} from "../../services/orderService";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await getMyOrders(token);

            setOrders(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load orders");

        }

    };

    const handleCancel = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const response = await cancelOrder(id, token);

            toast.success(response.data);

            loadOrders();

        } catch (error) {

            console.log(error);

            toast.error("Unable to cancel order");

        }

    };
    const handleInvoice = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await downloadInvoice(id, token);

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute("download", `Invoice_${id}.pdf`);

        document.body.appendChild(link);

        link.click();

        link.remove();

    } catch (error) {

        toast.error("Unable to download invoice");

    }

};
    const getStatusVariant = (status) => {

    switch (status?.toUpperCase()) {

        case "PENDING":
            return "warning";

        case "CONFIRMED":
            return "info";

        case "SHIPPED":
            return "primary";

        case "DELIVERED":
            return "success";

        case "CANCELLED":
            return "danger";

        default:
            return "secondary";

    }

};

    return (

        <Container className="py-5">

            <div className="orders-header">

                <div>

                    <h2>📦 My Orders</h2>

                    <p>
                        Track and manage all your purchases
                    </p>

                </div>

            </div>

            <Row className="mb-4">

                <Col md={4} className="mb-3">

                    <Card className="order-summary-card">

                        <Card.Body>

                            <p>Total Orders</p>

                            <h3>
                                {orders.length}
                            </h3>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={4} className="mb-3">

                    <Card className="order-summary-card">

                        <Card.Body>

                            <p>Active Orders</p>

                            <h3>

                                {
                                    orders.filter(
                                        order =>
                                            order.status !== "DELIVERED" &&
                                            order.status !== "CANCELLED"
                                    ).length
                                }

                            </h3>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={4} className="mb-3">

                    <Card className="order-summary-card">

                        <Card.Body>

                            <p>Delivered</p>

                            <h3>

                                {
                                    orders.filter(
                                        order =>
                                            order.status === "DELIVERED"
                                    ).length
                                }

                            </h3>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Card className="shadow">

               <Card.Body>

    {orders.length === 0 ? (

        <div className="text-center py-5">

            <h4>No Orders Yet</h4>

            <p>Looks like you haven't placed any orders.</p>

        </div>

    ) : (

        orders.map(order => (

            <Card
                key={order.orderId}
                className="mb-4 order-card"
            >

                <Card.Body>

                    <div className="d-flex justify-content-between">

                        <div>

                            <h5>{order.productName}</h5>

                            <p className="text-muted mb-1">
                                Order ID : #{order.orderId}
                            </p>

                            <p>
                                Qty : {order.quantity}
                            </p>

                        </div>

                        <div className="text-end">

                            <h4 className="text-success">

                                ₹ {order.amount}

                            </h4>

                            <p>

                                Ordered On

                                <br />

                                {order.orderedAt}

                            </p>

                        </div>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <strong>Status : </strong>

                           <Badge
                                bg={getStatusVariant(order.status)}
                                className="order-status-badge"
                            >

                                {order.status}

                            </Badge> 

                        </div>

                        <div className="d-flex gap-2">

                            {order.status === "PENDING" && (

                                <Button
                                    variant="danger"
                                    onClick={() => handleCancel(order.orderId)}
                                >

                                    Cancel Order

                                </Button>

                            )}

                            <Button
                                variant="outline-primary"
                                onClick={() => handleInvoice(order.orderId)}
                                >
                                Download Invoice

                            </Button>

                        </div>

                    </div>

                </Card.Body>

            </Card>

        ))

    )}

</Card.Body>

            </Card>

        </Container>

    );

}

export default Orders;