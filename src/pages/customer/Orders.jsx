import { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
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

    return (

        <Container className="py-5">

            <h2 className="mb-4">
                📦 My Orders
            </h2>

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

                            <span className={`status ${order.status.toLowerCase()}`}>

                                {order.status}

                            </span>

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