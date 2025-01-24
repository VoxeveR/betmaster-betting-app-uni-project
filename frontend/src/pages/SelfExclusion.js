import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MyNavbar from "../components/Navbar";
import axios from 'axios';

function SelfExclusion() {
    const [exclusionDate, setExclusionDate] = useState('');
    const [exclusionTime, setExclusionTime] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState('');
    const userID = sessionStorage.getItem('userID');
    const navigate = useNavigate();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const handleExclusion = async () => {
        if (!exclusionDate || !exclusionTime) {
            setError('Proszę wybrać datę i godzinę samowykluczenia');
            return;
        }

        try {
            const startDate = new Date().toISOString().replace('T', ' ').slice(0, 16);
            const formattedDateTime = `${exclusionDate} ${exclusionTime}`;

            console.log(                {start_date: startDate,
                end_date: formattedDateTime});

            const response = await axios.post(`http://localhost:8000/api/selfexclusion/${userID}`, {
                start_date: startDate,
                end_date: formattedDateTime
            });

            if (response.data.status === 'ok') {
                sessionStorage.clear();
                navigate('/login');
            }
        } catch (error) {
            setError('Wystąpił błąd podczas próby samowykluczenia');
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pl-PL', options);
    };

    const formatDateTime = (date, time) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const dateTime = new Date(`${date}T${time}`);
        return dateTime.toLocaleDateString('pl-PL', options);
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
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <Link to="/profile" className="btn btn-outline-secondary">
                                        Powrót
                                    </Link>
                                    <h4 className="mb-0">Samowykluczenie</h4>
                                </div>

                                <Alert variant="warning">
                                    <Alert.Heading>Ważna informacja</Alert.Heading>
                                    <p>
                                        Samowykluczenie to poważna decyzja, która spowoduje:
                                    </p>
                                    <ul>
                                        <li>Natychmiastowe zablokowanie dostępu do konta</li>
                                        <li>Brak możliwości zalogowania do wybranej daty</li>
                                    </ul>
                                </Alert>

                                {!showConfirmation ? (
                                    <>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Wybierz datę i godzinę do kiedy chcesz wykluczyć konto:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={exclusionDate}
                                                onChange={(e) => setExclusionDate(e.target.value)}
                                                min={minDate}
                                                isInvalid={!!error}
                                                className="mb-2"
                                            />
                                            <Form.Control
                                                type="time"
                                                value={exclusionTime}
                                                onChange={(e) => setExclusionTime(e.target.value)}
                                                isInvalid={!!error}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {error}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                variant="danger"
                                                onClick={() => setShowConfirmation(true)}
                                                disabled={!exclusionDate || !exclusionTime}
                                            >
                                                Kontynuuj
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-4">
                                        <Alert variant="danger">
                                            <Alert.Heading>Potwierdzenie samowykluczenia</Alert.Heading>
                                            <p>
                                                Czy na pewno chcesz wykluczyć swoje konto do: {formatDateTime(exclusionDate, exclusionTime)}?
                                            </p>
                                            <p className="mb-0">
                                                Ta operacja jest nieodwracalna.
                                            </p>
                                        </Alert>
                                        <div className="d-flex justify-content-end gap-2 mt-3">
                                            <Button
                                                variant="secondary"
                                                onClick={() => setShowConfirmation(false)}
                                            >
                                                Anuluj
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={handleExclusion}
                                            >
                                                Potwierdzam
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="bg-primary-subtle" />
                </Row>
            </Container>
        </>
    );
}

export default SelfExclusion;