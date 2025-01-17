import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../components/Navbar";
import axios from 'axios';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import BetHistoryCard from '../components/BetsHistory/BetHistoryCard';
import './BetHistory.css';

function BetsHistory() {
    const [userID, setUserID] = useState(sessionStorage.getItem('userID'));
    const [key, setKey] = useState('open');
    const [betsHistory, setBetsHistory] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/bets/${userID}`)
                .then((response) => {
                    setBetsHistory(() => response.data.data);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const getOpenBets = () => {
        return Object.values(betsHistory).filter(bet =>
            !bet.bet_result
        );
    };

    const getWonBets = () => {
        return Object.values(betsHistory).filter(bet =>
            bet.bet_result === 'Won'
        );
    };

    const getLostBets = () => {
        return Object.values(betsHistory).filter(bet =>
            bet.bet_result === 'Lost'
        );
    };

    return (
        <>
            <MyNavbar />
            <Container fluid className="pt-5 bg-primary-subtle h-100">
                <Row className="mt-4">
                    <Col xs={12} md={4} className="d-flex align-items-center bg-primary-subtle custom-first-column">
                    </Col>

                    <Col xs={12} md={4} className="custom-second-column bg-white p-4 rounded border min-vh-100">
                        <div className="tabs-container">
                            <Tabs
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="me-4 ms-4 mb-2"
                                justify
                                variant="underline"
                            >
                                <Tab eventKey="open" title="Otwarte">
                                    <div className={`scrollable-content ${key === 'open' ? '' : 'd-none'}`}>
                                        {getOpenBets().map((bet) => (
                                            <BetHistoryCard key={bet.id} betHistory={bet}/>
                                        ))}
                                    </div>
                                </Tab>

                                <Tab eventKey="won" title="Wygrane">
                                    <div className={`scrollable-content ${key === 'won' ? '' : 'd-none'}`}>
                                        {getWonBets().map((bet) => (
                                            <BetHistoryCard key={bet.id} betHistory={bet}/>
                                        ))}
                                    </div>
                                </Tab>

                                <Tab eventKey="lost" title="Przegrane">
                                    <div className={`scrollable-content ${key === 'lost' ? '' : 'd-none'}`}>
                                        {getLostBets().map((bet) => (
                                            <BetHistoryCard key={bet.id} betHistory={bet}/>
                                        ))}
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>

                    <Col xs={12} md={4} className="bg-primary-subtle">
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default BetsHistory;