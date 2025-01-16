import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Accordion, Badge, Button, Card, ListGroup} from 'react-bootstrap'
import {CheckCircle, HelpCircle, XCircle} from 'lucide-react'

function BetHistoryCard(betHistory) {
    const {
        betHistory: {
            bet_result = '',
            bet_amount = '',
            odds = '',
            created_at = '',
            status = '',
            games = []
        }
    } = betHistory || {};
    const [activeKey, setActiveKey] = useState(null);

    const COUPON_TAX_RATE = 0.12;
    const INCOME_TAX_RATE = 0.10;
    const TAX_FREE_THRESHOLD = 2280;

    const toggleAccordion = () => {
        setActiveKey(activeKey === '0' ? null : '0');
    };

    const calculatePotentialWinnings = (stakeAmount) => {
        if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) {
            return {
                netWin: 0
            }
        }

        const stakeAfterCouponTax = stakeAmount * (1 - COUPON_TAX_RATE);
        const grossWin = stakeAfterCouponTax * odds;

        const incomeTax = grossWin > TAX_FREE_THRESHOLD
            ? grossWin * INCOME_TAX_RATE
            : 0;

        return grossWin - incomeTax
    };

    const expectedWin = calculatePotentialWinnings(bet_amount).toFixed(2);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Status icon selector
    const StatusIcon = () => {
        switch(bet_result) {
            case 'Won':
                return <CheckCircle className="text-success" size={24} />;
            case 'Lost':
                return <XCircle className="text-danger" size={24} />;
            default:
                return <HelpCircle className="text-warning" size={24} />;
        }
    };

    return (
        <>
            <Card className="p-0 mt-2 d-flex align-items-center justify-content-center w-100">
                <Card.Body className="w-100 p-0">
                    <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                        <div className="d-flex align-items-center">
                            <StatusIcon />
                            <div className="ms-2">
                                <div>Stawka: {bet_amount} PLN</div>
                                <div className="text-muted small">
                                    Kurs całkowity: {odds} | Przewidywana wygrana: {expectedWin} PLN
                                </div>
                            </div>
                        </div>
                        <Button
                            variant={
                                status === 'Unsettled' ? 'warning' :
                                    status === 'Won' ? 'success' :
                                        status === 'Lost' ? 'danger' : 'primary'
                            }
                            size="sm"
                        >
                            {status}
                        </Button>
                    </div>
                    <Card.Text className="w-100">
                        <Accordion activeKey={activeKey} className="mt-0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header onClick={toggleAccordion}>
                                    Szczegóły
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup className="p-2">
                                        {games.map((game, index) => (
                                            <ListGroup.Item
                                                className="border-start-0 border-end-0 border-top-0 mb-2"
                                                key={index}
                                            >
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Badge bg="primary">{game.sport_type}</Badge>
                                                    <Badge bg={game.game_status === 'Playing' ? 'warning' : 'secondary'}>
                                                        {game.game_status}
                                                    </Badge>
                                                </div>

                                                <h6 className="mb-2">{game.event_name}</h6>

                                                <div className="mb-2">
                                                    <strong>{game.home}</strong> vs <strong>{game.away}</strong>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center text-muted small">
                                                    <div>Start: {formatDate(game.start_time)}</div>
                                                    <div>Your Pick: {game.expected_result}</div>
                                                </div>

                                                {game.game_result && (
                                                    <div className="mt-2">
                                                        <Badge bg={(game.expected_result === game.game_result) ? 'success' : 'danger'} className="align-items-end">
                                                            Result: {game.game_result}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default BetHistoryCard;