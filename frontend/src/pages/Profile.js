import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Card, Alert, Form} from 'react-bootstrap';
import MyNavbar from "../components/Navbar";
import { FaUser, FaHistory, FaFileAlt, FaChartBar, FaUserShield, FaInfoCircle} from 'react-icons/fa';
import './Profile.css';
import axios from 'axios';
import {Link} from "react-router-dom";

function Profile() {
    const [userBalance, setUserBalance] = useState(0);
    const [showDepositAlert, setShowDepositAlert] = useState(false);
    const [showWithdrawalAlert, setShowWithdrawalAlert] = useState(false);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [userID, setUserID] = useState(sessionStorage.getItem('userID'));

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/account/${userID}`)
                .then((response) => {
                    setUserBalance(() => response.data.data.balance);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])


    const handleDeposit = () => {
        if (!amount || amount <= 0) {
            setError('Kwota musi być większa niż 0');
            return;
        }

        try{
            axios.post('http://localhost:8000/api/account/deposit', {
                user_id: userID,
                amount: amount,
            })
                .then(res => {
                    if (res.data.status === 'success') {
                        setUserBalance(prevBalance => prevBalance + Number(amount));
                        setShowDepositAlert(false);
                        setAmount('');
                        setError('');
                    }
                })
        } catch(err) {
            console.log(err);
        }

    };

    const handleWithdrawal = () => {
        if (!amount || amount <= 0) {
            setError('Kwota musi być większa niż 0');
            return;
        }
        if(userBalance < amount) {
            setError("Brak środków na koncie!");
            return;
        }

        try{
            axios.post('http://localhost:8000/api/account/withdrawal', {
                user_id: userID,
                amount: -amount,
            })
                .then(res => {
                    if (res.data.status === 'success') {
                        setUserBalance(prevBalance => prevBalance - Number(amount));
                        setShowWithdrawalAlert(false);
                        setAmount('');
                        setError('');
                    }
                })
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <MyNavbar />
            <Container fluid className="pt-5 bg-primary-subtle h-100">
                <Row className="mt-4">
                    <Col xs={12} md={4} className="d-flex align-items-center bg-primary-subtle custom-first-column">
                    </Col>
                    <Col xs={12} md={4} className="custom-second-column bg-white p-2 rounded border">
                        {showDepositAlert && (
                            <Alert variant="primary" className="mt-3">
                                <Alert.Heading>Wpłata środków</Alert.Heading>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kwota (PLN)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Wprowadź kwotę"
                                        isInvalid={!!error}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="me-2" onClick={() => {
                                        setShowDepositAlert(false);
                                        setAmount('');
                                        setError('');
                                    }}>
                                        Anuluj
                                    </Button>
                                    <Button variant="success" onClick={handleDeposit}>
                                        Wpłać
                                    </Button>
                                </div>
                            </Alert>
                        )}
                        {showWithdrawalAlert && (
                            <Alert variant="primary" className="mt-3">
                                <Alert.Heading>Wypłata środków</Alert.Heading>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kwota (PLN)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Wprowadź kwotę"
                                        isInvalid={!!error}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="me-2" onClick={() => {
                                        setShowWithdrawalAlert(false);
                                        setAmount('');
                                        setError('');
                                    }}>
                                        Anuluj
                                    </Button>
                                    <Button variant="success" onClick={handleWithdrawal}>
                                        Wypłać
                                    </Button>
                                </div>
                            </Alert>
                        )}

                        <Card className="mb-4 p-4 border rounded shadow-sm mt-2">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Saldo użytkownika</h5>
                                </div>
                                <div className="text-center mt-3">
                                    <h3 className="text-success">{userBalance} PLN</h3>
                                </div>
                                <div className="d-flex justify-content-around mt-4">
                                    <Button variant="success" onClick={() => {
                                        setShowDepositAlert(true)
                                        setShowWithdrawalAlert(false)
                                    }}>Wpłata</Button>
                                    <Button variant="danger" onClick={() => {
                                        setShowDepositAlert(false)
                                        setShowWithdrawalAlert(true)
                                    }}>Wypłata</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <h4>Zarządzaj kontem</h4>
                        <div className="list-group">
                            <div className="list-group-item">
                                <FaUser className="me-2" />
                                <Link to="/user_data">Moje dane </Link>
                            </div>
                            <div className="list-group-item">
                                <FaHistory className="me-2" />
                                Moje operacje
                            </div>
                            <div className="list-group-item">
                                <FaFileAlt className="me-2" />
                                Moje dokumenty
                            </div>
                        </div>

                        <h4 className="mt-4">Odpowiedzialna gra</h4>
                        <div className="list-group mb-2">
                            <div className="list-group-item">
                                <FaChartBar className="me-2" />
                                Zarządzanie limitami
                            </div>
                            <div className="list-group-item">
                                <FaUserShield className="me-2" />
                                <Link to="/self_exclusion">Samowykluczenie</Link>
                            </div>
                            <div className="list-group-item">
                                <FaInfoCircle className="me-2" />
                                <Link to="/information">Informacja</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="bg-primary-subtle">
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;
