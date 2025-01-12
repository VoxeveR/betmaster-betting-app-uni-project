import React, {useEffect, useState} from 'react';
import './BetBox.css'
import BetBoxCard from "./BetBoxCard";
import {FormControl, Form, Alert} from "react-bootstrap";
import axios from "axios";

function BetBox({handleDeleteBet, handleUpdateBets}) {
    const [stake, setStake] = useState('');
    const [error, setError] = useState('');
    const COUPON_TAX_RATE = 0.12;
    const INCOME_TAX_RATE = 0.10;
    const TAX_FREE_THRESHOLD = 2280;

    const storedBets = JSON.parse(sessionStorage.getItem('selectedBets')) || [];

    const currentBetDetails = storedBets.map(betID => ({
        ...JSON.parse(sessionStorage.getItem(`${betID}_DATA`)),
        betID: betID,
        userSelection: sessionStorage.getItem(betID)
    }));

    const totalOdds = currentBetDetails.reduce((odds, bet) => {
        if(bet.userSelection === '1'){
            return odds * bet.odds1;
        } else if (bet.userSelection === '2'){
            return odds * bet.odds2;
        } else {
            return odds * bet.oddsX;
        }
    }, 1);

    const calculatePotentialWinnings = (stakeAmount) => {
        if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) {
            return {
                grossWin: 0,
                netWin: 0
            };
        }

        const stakeAfterCouponTax = stakeAmount * (1 - COUPON_TAX_RATE);
        const grossWin = stakeAfterCouponTax * totalOdds;

        const incomeTax = grossWin > TAX_FREE_THRESHOLD
            ? grossWin * INCOME_TAX_RATE
            : 0;

        const netWin = grossWin - incomeTax;

        return {
            grossWin,
            netWin
        };
    };

    function onDeleteBet(betID){
        handleDeleteBet(betID);
    }

    function handleStakeChange(e) {
        setStake(e.target.value);
    }

    function handleMakeBet(event){
        event.preventDefault();
        setError('');
        if(stake === ''){
            setError("Podaj kwotę zakładu!");
            return;
        }
        const userID = sessionStorage.getItem('userID');
        const games = currentBetDetails.reduce((acc, bet) => {
            acc[bet.betID] = bet.userSelection;
            return acc;
        }, {});

        const data = {
            user_id: Number(userID),
            games: games,
            amount: parseFloat(stake),
            odds: parseFloat(totalOdds)
        }

        console.log(data);
        axios.post("http://localhost:8000/api/bets/", data).then(res => {
            console.log(res.data);
            handleUpdateBets();
        }).catch(err => {
            console.log(err);
            const errorMessage = err.response.data.detail || "An unexpected error occurred. Please try again.";
            setError(() => `Error: ${errorMessage}`);
        })
    }

    const winnings = calculatePotentialWinnings(parseFloat(stake));

    return (
        <div className="bet-box p-3 bg-light border rounded mx-auto mh-100">
            <h5>Place Your Bet</h5>
            <div className="container-fluid overflow-auto bet-box-scroll">
                {currentBetDetails.map((bet, index) => (
                    <BetBoxCard key={index} bet={bet} handleDeleteBet={onDeleteBet}/>
                ))}
            </div>
            <div>
                <Form className="mt-2" onSubmit={handleMakeBet}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Total Odds:</span>
                        <strong>{totalOdds.toFixed(2)}</strong>
                    </div>
                    <FormControl
                        placeholder="Stake"
                        name="stake"
                        value={stake}
                        onChange={handleStakeChange}
                        type="number"
                        min="1"
                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                    />
                    {stake && (
                        <div className="mt-2">
                            <div className="d-flex justify-content-between">
                                <span>Potential Win:</span>
                                <span>{winnings.netWin.toFixed(2)} PLN</span>
                            </div>
                        </div>
                    )}
                    <button className="btn btn-primary mt-2 w-100"
                            disabled={storedBets.length === 0}
                    >Confirm Bet</button>
                </Form>
            </div>
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                </Alert>
            )}
        </div>
    );
}

export default BetBox;