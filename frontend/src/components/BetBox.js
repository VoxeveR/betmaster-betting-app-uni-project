import React, {useEffect, useState} from 'react';
import './BetBox.css'
import BetBoxCard from "./BetBoxCard";
import { FormControl, Form } from "react-bootstrap";
import axios from "axios";

function BetBox({selectedBets, handleDeleteBet}) {
    const [betDetails, setBetDetails] = useState([]);

    useEffect(()=>{
        const storedBets = JSON.parse(sessionStorage.getItem('selectedBets'));
        console.log("testing useEffect", storedBets);

        if(storedBets != null){
            let currentBet = [];
            for(let i = 0; i < storedBets.length; i++){
                const betData = JSON.parse(sessionStorage.getItem(`${storedBets[i]}_DATA`))

                currentBet.push({
                    ...betData,
                    betID: (storedBets[i]),
                    userSelection: sessionStorage.getItem(storedBets[i])
                 });
            }
            setBetDetails(currentBet);

            console.log("bets", betDetails);
        }

    }, [selectedBets]);



    function onDeleteBet(betID){
        /*
        setBetDetails(prevBets => prevBets.filter(bet => bet.betID !== betID));

        const updatedBets = selectedBets.filter(bet => bet !== betID);
        sessionStorage.setItem('selectedBets', JSON.stringify(updatedBets));

        sessionStorage.removeItem(betID);
        sessionStorage.removeItem(`${betID}_DATA`);
        */

        handleDeleteBet(betID);
    }

    function handleMakeBet(event){
        event.preventDefault();
        console.log(event.target.stake.value);
        const userID = sessionStorage.getItem('userID');
        const stake = event.target.stake.value;
        /*
                const games = betDetails.reduce((acc, bet) => {
                    acc[`'${bet.betID}'`] = `${bet.userSelection}`;
                    return acc;
                }, {});
                */

        const games = betDetails.reduce((acc, bet) => {
             acc[bet.betID] = bet.userSelection;
             return acc;
        }, {});

        console.log(typeof games);
        console.log(typeof games[1]);

        let odds = 1;
        betDetails.forEach(value => {
            if(value.userSelection === '1'){
                odds *= value.odds1;
            } else if (value.userSelection === '2'){
                odds *= value.odds2;
            } else {
                odds *= value.oddsX;
            }
        })
        console.log(games);
        console.log(odds);
        console.log(typeof userID);

        const data = {
            user_id: Number(userID),
            games: games,
            amount: Number(stake),
            odds: Number(odds)
        }

        console.log(data);

        axios.post("http://localhost:8000/api/bets/", data).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="bet-box p-3 bg-light border rounded mx-auto mh-100">
            <h5>Place Your Bet</h5>
            <div className="container-fluid overflow-auto bet-box-scroll">
                {Object.entries(betDetails).map(([key, value]) => (
                    <BetBoxCard key={key} bet = {value} handleDeleteBet={onDeleteBet}/>
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
