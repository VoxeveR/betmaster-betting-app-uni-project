import React, {useEffect, useState} from 'react';
import './BetBox.css'
import BetBoxCard from "./BetBoxCard";
import { FormControl, Form } from "react-bootstrap";
import axios from "axios";

function BetBox({handleDeleteBet, handleUpdateBets}) {

    const storedBets = JSON.parse(sessionStorage.getItem('selectedBets')) || [];

    const currentBetDetails = storedBets.map(betId => ({
        ...JSON.parse(sessionStorage.getItem(`${betId}_DATA`)),
        betID: betId,
        userSelection: sessionStorage.getItem(betId)
    }));

    function onDeleteBet(betID){
        handleDeleteBet(betID);
    }

    function handleMakeBet(event){
        event.preventDefault();

        const userID = sessionStorage.getItem('userID');
        const stake = event.target.stake.value;

        const games = currentBetDetails.reduce((acc, bet) => {
             acc[bet.betID] = bet.userSelection;
             return acc;
        }, {});


        let odds = 1;
        currentBetDetails.forEach(value => {
            if(value.userSelection === '1'){
                odds *= value.odds1;
            } else if (value.userSelection === '2'){
                odds *= value.odds2;
            } else {
                odds *= value.oddsX;
            }
        })

        const data = {
            user_id: Number(userID),
            games: games,
            amount: parseFloat(stake),
            odds: parseFloat(odds)
        }

        axios.post("http://localhost:8000/api/bets/", data).then(res => {
            console.log(res.data);
            handleUpdateBets();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="bet-box p-3 bg-light border rounded mx-auto mh-100">
            <h5>Place Your Bet</h5>
            <div className="container-fluid overflow-auto bet-box-scroll">
                {currentBetDetails.map((bet, index) => (
                    <BetBoxCard key={index} bet = {bet} handleDeleteBet={onDeleteBet}/>
                ))}
            </div>
            <div>
                <Form className="mt-2" onSubmit={handleMakeBet}>
                    <FormControl placeholder="Stake" name="stake" />
                    <button className="btn btn-primary mt-2 w-100">Confirm Bet</button>
                </Form>
            </div>
        </div>
    );
}

export default BetBox;
