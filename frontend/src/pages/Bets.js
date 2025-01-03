import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../components/Navbar";
import './Bets.css';
import BetBanner from "../components/BetBanner";
import BetBox from "../components/BetBox";
import axios from 'axios';
import {Accordion, ListGroup} from "react-bootstrap";

function Bets(){
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [betsList, setBetsList] = useState({});
    const [selectedBets, setSelectedBets] = useState([]);

    useEffect(()=>{
            try{
                axios.get('http://localhost:8000/api/games/categories')
                    .then((response) => {
                    setCategoryList(response.data.data);
                });
            } catch(error){
                console.log(error.response.data);
            }
    }, []);

    function handleCategory(event) {
        const selectedCategory = event.target.textContent;
        setSelectedCategory(selectedCategory);

        const gameURL = `http://localhost:8000/api/games/${selectedCategory}`;

        try {
            axios.get(gameURL)
                .then((response) => {
                    setBetsList(response.data.data);
                    console.log(response.data.data);
                })
        } catch(error){
            console.log(error.response.data);
        }
    }

    function handleUpdateBets() {
        setSelectedBets(() => []);

        const storedBets = JSON.parse(sessionStorage.getItem('selectedBets'));
        sessionStorage.removeItem('selectedBets');

        for(let i = 0; i < storedBets.length; i++){
            let betID = storedBets[i].betID;

            sessionStorage.removeItem(`${betID}`);
            sessionStorage.removeItem(`${betID}_DATA`);
            console.log(betID);
        }
    }

    function handleBetSelection(selection) {
        if (selection) {

            setSelectedBets((s) => {
                const selectionData = selection.split(":");
                const betID = selectionData[0];

                if(!s.includes(betID)){
                    const newBetsState = [...s, betID];

                    // adding selectedBets list to browser memory
                    sessionStorage.setItem('selectedBets', JSON.stringify(newBetsState));

                    // adding betStatus to browser memory -> maybe should remove
                    sessionStorage.setItem(`${betID}`, selectionData[1]);

                    //saving whole bet data - user selection - xD
                    sessionStorage.setItem(`${betID}_DATA`, JSON.stringify(betsList[betID]));

                    console.log("test", JSON.parse(sessionStorage.getItem(`${betID}_DATA`)));

                    return newBetsState;
                } else {
                    return s;
                }
            });
        }
        console.log("Current selected bets:", selectedBets);
    }

    function handleDeleteBet(betID) {
        setSelectedBets(prevBets => {

            const updatedBets = prevBets.filter(bet => bet !== betID);
            sessionStorage.setItem('selectedBets', JSON.stringify(updatedBets));
            sessionStorage.removeItem(betID);
            sessionStorage.removeItem(`${betID}_DATA`);
            return updatedBets;

        });
    }

    return (
        <>
        <MyNavbar />
            <div className="container-fluid h-100 pt-5 custom-bg">
                <div className="row h-100 mt-5">
                    <div className="col h-100 align-items-center custom-bg custom-first-column">
                        <h4 className = "mt-2">Sport</h4>
                        <Accordion alwaysOpen>
                            {Object.keys(categoryList).map((category, index) => (
                                <>
                                    <Accordion.Item
                                        eventKey={index}
                                        >
                                        <Accordion.Header className="border-bottom">{category}</Accordion.Header>
                                        <Accordion.Body className="border-bottom-0">
                                            <ListGroup className="p-2">
                                                {categoryList[category].map((item, index) => (
                                                    <ListGroup.Item className="border-start-0 border-end-0 border-top-0" key={index}
                                                                    onClick={handleCategory}
                                                                    >{item}</ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </>
                            ))}
                        </Accordion>
                    </div>
                    <div className="col-6 custom-second-column h-100 p-3 bg-light border rounded mx-auto">
                        {Object.entries(betsList).map(([key, betData]) => (
                            <BetBanner
                                betData={betData}
                                key={key}
                                betID={key}
                                selectData={selectedBets}
                                onBetSelect={handleBetSelection}
                            />
                        ))}
                    </div>
                    <div className="col custom-bg">
                        <BetBox handleDeleteBet={handleDeleteBet} handleUpdateBets={handleUpdateBets} />
                    </div>
                </div>
            </div>
            <div className="list-group"></div>
        </>
    )
}

export default Bets;