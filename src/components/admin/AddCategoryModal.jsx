import { useState, useEffect } from "react";

import {
    Modal,
    Button,
    Form
} from "react-bootstrap";

import {
    addCategory,
    updateCategory
} from "../../services/categoryService";

import { toast } from "react-toastify";

function AddCategoryModal({

    show,

    handleClose,

    selectedCategory,

    refreshCategories

}) {

    const [name, setName] = useState("");

    useEffect(() => {

        if (selectedCategory) {

            setName(selectedCategory.name);

        }

        else {

            setName("");

        }

    }, [selectedCategory]);

    const handleSubmit = async () => {

        if (name.trim() === "") {

            toast.error("Category name is required");

            return;

        }

        try {

            if (selectedCategory) {

                await updateCategory(

                    selectedCategory.id,

                    {
                        name: name
                    }

                );

                toast.success("Category Updated Successfully");

            }

            else {

                await addCategory({

                    name: name

                });

                toast.success("Category Added Successfully");

            }

            refreshCategories();

            handleClose();

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to Save Category");

        }

    };

    return (

        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>

                <Modal.Title>

                    {selectedCategory

                        ? "Update Category"

                        : "Add Category"}

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Form.Group>

                        <Form.Label>

                            Category Name

                        </Form.Label>

                        <Form.Control

                            type="text"

                            value={name}

                            onChange={(e) =>

                                setName(e.target.value)

                            }

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

                    {selectedCategory

                        ? "Update"

                        : "Save"}

                </Button>

            </Modal.Footer>

        </Modal>

    );

}

export default AddCategoryModal;