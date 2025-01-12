import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from "../components/Navbar";

function Information() {
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
                                    <h4 className="mb-0">Informacje Prawne</h4>
                                </div>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Regulamin Świadczenia Usług</Accordion.Header>
                                        <Accordion.Body>
                                            <p>1. Postanowienia Ogólne</p>
                                            <ul>
                                                <li>Serwis działa na podstawie ustawy o grach hazardowych z dnia 19 listopada 2009 r.</li>
                                                <li>Właścicielem serwisu jest firma XYZ Sp. z o.o. z siedzibą w Warszawie.</li>
                                                <li>Korzystanie z serwisu jest dobrowolne i dozwolone wyłącznie dla osób pełnoletnich.</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Polityka Odpowiedzialnej Gry</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Zasady odpowiedzialnej gry:</p>
                                            <ul>
                                                <li>Ustanawiaj osobiste limity czasu i pieniędzy</li>
                                                <li>Traktuj grę jako rozrywkę, nie sposób na zarabianie</li>
                                                <li>Nie graj pod wpływem emocji lub używek</li>
                                                <li>Regularnie rób sobie przerwy</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Ochrona Danych Osobowych</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Zgodnie z RODO informujemy, że:</p>
                                            <ul>
                                                <li>Administratorem danych jest XYZ Sp. z o.o.</li>
                                                <li>Dane są przetwarzane w celu świadczenia usług i zapewnienia bezpieczeństwa</li>
                                                <li>Użytkownik ma prawo do wglądu, modyfikacji i usunięcia swoich danych</li>
                                                <li>Dane są przechowywane na zabezpieczonych serwerach w UE</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Metody Płatności</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Akceptowane formy płatności:</p>
                                            <ul>
                                                <li>Przelewy bankowe</li>
                                                <li>Karty kredytowe i debetowe</li>
                                                <li>Portfele elektroniczne</li>
                                                <li>BLIK</li>
                                            </ul>
                                            <p>Wszystkie transakcje są szyfrowane i zabezpieczone.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Pomoc i Wsparcie</Accordion.Header>
                                        <Accordion.Body>
                                            <p>W przypadku problemów z hazardem możesz skorzystać z:</p>
                                            <ul>
                                                <li>Telefon zaufania: 800-123-456</li>
                                                <li>Czat z konsultantem 24/7</li>
                                                <li>Samowykluczenie z gry</li>
                                                <li>Konsultacje z psychologiem</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Licencje i Certyfikaty</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Nasze uprawnienia:</p>
                                            <ul>
                                                <li>Licencja Ministerstwa Finansów nr XXX</li>
                                                <li>Certyfikat bezpieczeństwa SSL</li>
                                                <li>Certyfikat odpowiedzialnej gry eCOGRA</li>
                                                <li>Członek Stowarzyszenia Odpowiedzialnej Gry</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <div className="mt-4 p-3 bg-light rounded">
                                    <small className="text-muted">
                                        Hazard może uzależniać. Graj odpowiedzialnie. Jeśli czujesz, że masz problem z hazardem,
                                        skorzystaj z pomocy specjalistów pod numerem 800-123-456 lub odwiedź stronę www.uzaleznienia-hazard.pl
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="bg-primary-subtle" />
                </Row>
            </Container>
        </>
    );
}

export default Information;