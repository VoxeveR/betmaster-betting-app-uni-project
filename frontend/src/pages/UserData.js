import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from "../components/Navbar";
import axios from 'axios';

function UserData() {
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        surename: '',
        email: '',
        phone_number: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [userID, setUserID] = useState(sessionStorage.getItem('userID'));

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/users/me/${userID}`).then((res) => {
                setUserData(res.data.data);
                console.log(res.data.data);
            })
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        console.log(userData);
        try {
            await axios.patch(`http://localhost:8000/api/users/update/${userID}`, userData);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <>
            <MyNavbar />
            <Container fluid className="pt-5 bg-primary-subtle h-100">
                <Row className="mt-4">
                    <Col xs={12} md={4} className="bg-primary-subtle" />
                    <Col xs={12} md={4} className="bg-white p-4 rounded border">
                        <Card className="border-0">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <Link to="/profile" className="btn btn-outline-secondary">
                                            Powrót
                                        </Link>
                                        <h4 className="mb-0">Moje dane</h4>
                                    </div>
                                    {!isEditing && (
                                        <Button variant="primary" onClick={handleEdit}>
                                            Edytuj
                                        </Button>
                                    )}
                                </div>

                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Imię</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={userData.name}
                                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                                            disabled={!isEditing}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwisko</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={userData.surename}
                                            onChange={(e) => setUserData({...userData, surename: e.target.value})}
                                            disabled={!isEditing}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwa użytkownika</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={userData.username}
                                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                                            disabled={!isEditing}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                                            disabled={!isEditing}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Telefon</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            value={userData.phone_number}
                                            onChange={(e) => setUserData({...userData, phone_number: e.target.value})}
                                            disabled={!isEditing}
                                        />
                                    </Form.Group>

                                    {isEditing && (
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button variant="secondary" onClick={handleCancel}>
                                                Anuluj
                                            </Button>
                                            <Button variant="success" onClick={handleSave}>
                                                Zapisz
                                            </Button>
                                        </div>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="bg-primary-subtle" />
                </Row>
            </Container>
        </>
    );
}

export default UserData;