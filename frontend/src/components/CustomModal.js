import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useState} from "react";

const CustomModal = ({ show, onHide, title, formData, setFormData, onSubmit, fields }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        console.log(formData);
        const newErrors = {};
        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = 'To pole jest wymagane';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setFormData(formData);
            onSubmit();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {fields.map((field) => (
                        <Form.Group key={field.name}>
                            <Form.Label>{field.label}{field.required && ' *'}</Form.Label>
                            <Form.Control
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                isInvalid={!!errors[field.name]}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[field.name]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Anuluj</Button>
                <Button variant="primary" onClick={handleSubmit}>Dodaj</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;