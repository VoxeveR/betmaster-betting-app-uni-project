import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import MyNavbar from "../components/Navbar";
import { FaUser, FaHistory, FaFileAlt, FaChartBar, FaUserShield, FaInfoCircle} from 'react-icons/fa';
import './Profile.css';

function Profile() {
    const [userBalance, setUserBalance] = useState(0);

    return (
        <>
            <MyNavbar />
            <Container fluid className="pt-5 bg-primary-subtle h-100 ">
                <Row className="mt-4">
                    <Col xs={12} md={4} className="d-flex align-items-center bg-primary-subtle custom-first-column">
                    </Col>
                    <Col xs={12} md={4} className="custom-second-column bg-white p-2 rounded border">
                        <Card className="mb-4 p-4 border rounded shadow-sm mt-2">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Saldo użytkownika</h5>
                                </div>
                                <div className="text-center mt-3">
                                    <h3 className="text-success">{userBalance} PLN</h3>
                                </div>
                                <div className="d-flex justify-content-around mt-4">
                                    <Button variant="success">Wpłata</Button>
                                    <Button variant="danger">Wypłata</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <h4>Zarządzaj kontem</h4>
                        <div className="list-group">
                            <div className="list-group-item">
                                <FaUser className="me-2" />
                                Moje dane
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
                                Samowykluczenie
                            </div>
                            <div className="list-group-item">
                                <FaInfoCircle className="me-2" />
                                Informacja
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="bg-primary-subtle">
                        {/* Empty right column (optional) */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;
