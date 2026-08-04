import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addSupplier, updateSupplier } from "../../services/supplierService";
import { toast } from "react-toastify";

function AddSupplierModal({
    show,
    handleClose,
    selectedSupplier,
    refreshSuppliers
}) {

    const [supplier, setSupplier] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {

        if (selectedSupplier) {

            setSupplier({
                name: selectedSupplier.name || "",
                email: selectedSupplier.email || "",
                phone: selectedSupplier.phone || "",
                address: selectedSupplier.address || ""
            });

        } else {

            setSupplier({
                name: "",
                email: "",
                phone: "",
                address: ""
            });

        }

    }, [selectedSupplier]);

    const handleChange = (e) => {

        setSupplier({
            ...supplier,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async () => {

        try {

            if (selectedSupplier) {

                await updateSupplier(selectedSupplier.id, supplier);

                toast.success("Supplier Updated Successfully");

            } else {

                await addSupplier(supplier);

                toast.success("Supplier Added Successfully");

            }

            refreshSuppliers();

            handleClose();

        } catch (err) {

            console.log(err);

            toast.error("Unable to Save Supplier");

        }

    };

    return (

        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>

                <Modal.Title>

                    {selectedSupplier ? "Update Supplier" : "Add Supplier"}

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Form.Group className="mb-3">

                        <Form.Label>Supplier Name</Form.Label>

                        <Form.Control
                            name="name"
                            value={supplier.name}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            value={supplier.email}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Phone</Form.Label>

                        <Form.Control
                            name="phone"
                            value={supplier.phone}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group>

                        <Form.Label>Address</Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="address"
                            value={supplier.address}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="primary"
                    onClick={handleSubmit}
                >
                    {selectedSupplier ? "Update" : "Save"}
                </Button>

            </Modal.Footer>

        </Modal>

    );

}

export default AddSupplierModal;