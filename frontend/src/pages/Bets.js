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

    const content = selectedCategory ? (
        <div className="p-3 bg-light border rounded mt-2">
            <h5>Details for {selectedCategory}</h5>
            <p>
                Here are some example details for <b>{selectedCategory}</b>.
            </p>
        </div>
    ) : (
        <p>Please select a category to see details here.</p>
    );

    useEffect(()=>{
            //handling filling bets -> API CALL
            try{
                axios.get('http://localhost:8000/api/games/categories')
                    .then((response) => {
                    //console.log(response.data);
                    //console.log(response.data.data);
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
                    //console.log(typeof betsList);
                })
        } catch(error){
            console.log(error.response.data);
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

                    console.log("test", JSON.parse(sessionStorage.getItem(`${betID}_DATA`))); // Logs the stored selection

                    return newBetsState;
                } else {
                    return s;
                }
            });
        } /*else {
            //FIXME:
            // NOT HANDLED PROPERLY

            // Handle deselect scenario: Reset or remove from selectedBets
            setSelectedBets(s => s.filter(item => item !== selection)); // Removes the deselected bet
            sessionStorage.removeItem(selection); // Remove the deselected bet from sessionStorage
            console.log("Deselected: No bet selected.");
        }*/

        console.log("Current selected bets:", selectedBets);
    }

    function handleDeleteBet(betID) {
        setSelectedBets(prevBets => {

            const updatedBets = prevBets.filter(bet => bet !== betID);
            sessionStorage.setItem('selectedBets', JSON.stringify(updatedBets)); // Update sessionStorage
            sessionStorage.removeItem(betID); // Remove the specific bet
            sessionStorage.removeItem(`${betID}_DATA`); // Remove the associated data
            return updatedBets; // Return the updated state

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
                                        // border1 d-flex align-items-center
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
                        <p>{content}</p>
                        {Object.entries(betsList).map(([key, betData]) => (
                            <BetBanner
                                betData={betData}
                                key={key}
                                betID={key}
                                onBetSelect={handleBetSelection}
                            />
                        ))}
                    </div>
                    <div className="col custom-bg">
                        <BetBox selectedBets = {selectedBets} handleDeleteBet={handleDeleteBet} />
                    </div>

                </div>

            </div>
            <div className="list-group"></div>
        </>
    )
}

export default Bets;