import { Card } from "react-bootstrap";

function DashboardCard({ title, value, icon }) {

    return (

        <Card className="dashboard-card">

            <Card.Body>

                <div className="d-flex justify-content-between">

                    <div>

                        <h6>{title}</h6>

                        <h2>{value}</h2>

                    </div>

                    <div className="card-icon">

                        {icon}

                    </div>

                </div>

            </Card.Body>

        </Card>

    );

}

export default DashboardCard;