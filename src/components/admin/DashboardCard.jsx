import {Card} from "react-bootstrap";


function DashboardCard({title,value,icon}){

return (

<Card className="dashboard-card shadow-sm">

<Card.Body>

<div className="d-flex justify-content-between align-items-center">


<div>

<h6>{title}</h6>

<h3>{value}</h3>

</div>


<div className="dashboard-icon">

{icon}

</div>


</div>

</Card.Body>

</Card>

);

}

export default DashboardCard;