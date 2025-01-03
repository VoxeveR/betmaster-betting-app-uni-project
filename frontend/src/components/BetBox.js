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

    function handleMakeBet(){
        
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
                <Form className="mt-2">
                    <FormControl placeholder="Stake" />
                    <button className="btn btn-primary mt-2 w-100" onClick={handleMakeBet}>Confirm Bet</button>
                </Form>
            </div>
        </div>
    );
}

export default BetBox;
