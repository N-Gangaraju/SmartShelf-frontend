import { useEffect, useState } from "react";
import {
    Container,
    Table,
    Button,
    Badge,
    Card
} from "react-bootstrap";

import Sidebar from "../../components/admin/Sidebar";
import { getAllReviews, deleteReview } from "../../services/reviewService";
import { toast } from "react-toastify";


function Reviews() {


    const token = localStorage.getItem("token");

    const [reviews, setReviews] = useState([]);



    useEffect(() => {

        loadReviews();

    }, []);



    const loadReviews = async () => {

        try {

            const response = await getAllReviews(token);

            setReviews(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    const handleDelete = async(reviewId)=>{


        try{

            await deleteReview(reviewId,token);

            toast.success("Review deleted");

            loadReviews();

        }
        catch(error){

            console.log(error);

            toast.error("Delete failed");

        }

    };



    return (

        <div className="d-flex">


            <Sidebar/>


            <Container fluid className="p-4">


                <h2 className="mb-4">
                    Reviews Management
                </h2>



                <Card className="shadow-sm">


                    <Card.Body>


                        <h5>
                            Total Reviews : {reviews.length}
                        </h5>



                        <Table 
                        bordered
                        hover
                        responsive
                        className="mt-3">


                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Product</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                    <th>Status</th>
                                    <th>Action</th>

                                </tr>

                            </thead>



                            <tbody>


                            {
                            reviews.length > 0 ?

                            reviews.map((review)=>(


                                <tr key={review.reviewId}>


                                    <td>{review.reviewId}</td>

                                    <td>{review.username}</td>

                                    <td>{review.productName}</td>

                                    <td>{review.rating}</td>

                                    <td>{review.comment}</td>



                                    <td>

                                        <Badge bg="success">
                                            Active
                                        </Badge>

                                    </td>



                                    <td>

                                        <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={()=>handleDelete(review.reviewId)}
                                        >

                                            Delete

                                        </Button>

                                    </td>


                                </tr>


                            ))

                            :

                            <tr>

                                <td 
                                colSpan="7"
                                className="text-center">

                                    No Reviews Found

                                </td>

                            </tr>


                            }


                            </tbody>


                        </Table>


                    </Card.Body>


                </Card>


            </Container>


        </div>


    );

}


export default Reviews;