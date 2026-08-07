import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardCard from "../../components/admin/DashboardCard";

import {
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaRupeeSign,
    FaExclamationTriangle
} from "react-icons/fa";

import {
    Container,
    Row,
    Col,
    Card,
    Table,
    ListGroup
} from "react-bootstrap";

import {
    getDashboard,
    getRecentOrders,
    getTopSellingProducts,
    getTopCustomers
} from "../../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {

    const token = localStorage.getItem("token");

    const [dashboard, setDashboard] = useState({});
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [topCustomers, setTopCustomers] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const [
                dashboardRes,
                recentRes,
                productRes,
                customerRes
            ] = await Promise.all([

                getDashboard(token),
                getRecentOrders(token),
                getTopSellingProducts(token),
                getTopCustomers(token)

            ]);

            setDashboard(dashboardRes.data);
            setRecentOrders(recentRes.data);
            setTopProducts(productRes.data);
            setTopCustomers(customerRes.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <Container fluid className="dashboard-container">

                <h2 className="mb-4 fw-bold">
                    Admin Dashboard
                </h2>

                <Row>

                    <Col lg={2} md={4} sm={6}>
                        <DashboardCard
                            title="Products"
                            value={dashboard.totalProducts || 0}
                            icon={<FaBox />}
                        />
                    </Col>

                    <Col lg={2} md={4} sm={6}>
                        <DashboardCard
                            title="Users"
                            value={dashboard.totalUsers || 0}
                            icon={<FaUsers />}
                        />
                    </Col>

                    <Col lg={2} md={4} sm={6}>
                        <DashboardCard
                            title="Orders"
                            value={dashboard.totalOrders || 0}
                            icon={<FaShoppingCart />}
                        />
                    </Col>

                    <Col lg={3} md={6}>
                        <DashboardCard
                            title="Revenue"
                            value={`₹${dashboard.totalRevenue || 0}`}
                            icon={<FaRupeeSign />}
                        />
                    </Col>

                    <Col lg={3} md={6}>
                        <DashboardCard
                            title="Low Stock"
                            value={dashboard.lowStockProducts || 0}
                            icon={<FaExclamationTriangle />}
                        />
                    </Col>

                </Row>

                <Row className="mt-4">

                    <Col lg={6}>

                        <Card className="shadow">

                            <Card.Header className="fw-bold">
                                Recent Orders
                            </Card.Header>

                            <Card.Body>

                                <Table hover responsive>

                                    <thead>

                                    <tr>

                                        <th>Customer</th>

                                        <th>Product</th>

                                        <th>Qty</th>

                                        <th>Status</th>

                                    </tr>

                                    </thead>

                                    <tbody>

                                    {

                                        recentOrders.map(order => (

                                            <tr key={order.orderId}>

                                                <td>{order.customerName}</td>

                                                <td>{order.productName}</td>

                                                <td>{order.quantity}</td>

                                                <td>{order.status}</td>

                                            </tr>

                                        ))

                                    }

                                    </tbody>

                                </Table>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col lg={6}>

                        <Card className="shadow">

                            <Card.Header className="fw-bold">
                                Top Selling Products
                            </Card.Header>

                            <ListGroup variant="flush">

                                {

                                    topProducts.map((product,index)=>(

                                        <ListGroup.Item
                                            key={index}
                                            className="d-flex justify-content-between"
                                        >

                                            <span>

                                                {product.productName}

                                            </span>

                                            <strong>

                                                {product.quantitySold}

                                            </strong>

                                        </ListGroup.Item>

                                    ))

                                }

                            </ListGroup>

                        </Card>

                    </Col>

                </Row>

                <Row className="mt-4">

                    <Col lg={12}>

                        <Card className="shadow">

                            <Card.Header className="fw-bold">
                                Top Customers
                            </Card.Header>

                            <Table hover responsive>

                                <thead>

                                <tr>

                                    <th>Customer</th>

                                    <th>Total Orders</th>

                                    <th>Total Spent</th>

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    topCustomers.map((customer,index)=>(

                                        <tr key={index}>

                                            <td>

                                                {customer.customerName}

                                            </td>

                                            <td>

                                                {customer.totalOrders}

                                            </td>

                                            <td>

                                                ₹{customer.totalSpent}

                                            </td>

                                        </tr>

                                    ))

                                }

                                </tbody>

                            </Table>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </div>

    );

}

export default Dashboard;