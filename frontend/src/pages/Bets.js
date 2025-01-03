import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../components/Navbar";
import './Bets.css';
import BetBanner from "../components/BetBanner";
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
            setSelectedBets(s => [...s, selection]);

            // adding selectedBets list to browser memory
            sessionStorage.setItem('selectedBets', JSON.stringify(selectedBets));

            // adding betStatus to browser memory -> maybe should remove
            const selectionData = selection.split(":");
            sessionStorage.setItem(`${selectionData[0]}`, selectionData[1]);
            console.log(betsList);

            //saving whole bet data - user selection - xD
            sessionStorage.setItem(`${selectionData[0]}_DATA`, JSON.stringify(betsList[selectionData[0]]));
            console.log(sessionStorage.getItem(`${selectionData[0]}`)); // Logs the stored selection
        } else {
            //FIXME:
            // NOT HANDLED PROPERLY

            // Handle deselect scenario: Reset or remove from selectedBets
            setSelectedBets(s => s.filter(item => item !== selection)); // Removes the deselected bet
            sessionStorage.removeItem(selection); // Remove the deselected bet from sessionStorage
            console.log("Deselected: No bet selected.");
        }

        console.log("Current selected bets:", selectedBets);
    }

    return (
        <>
        <MyNavbar />
            <div className="container-fluid h-100 pt-5 bg-primary-subtle">
                <div className="row h-100 mt-5">
                    <div className="col h-100 align-items-center bg-primary-subtle custom-first-column">
                        <h4 className = "mt-2">Sport</h4>
                        <Accordion>
                            {Object.keys(categoryList).map((category, index) => (
                                <>
                                    <Accordion.Item
                                        eventKey={index}
                                        // border1 d-flex align-items-center
                                        >
                                        <Accordion.Header>{category}</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                {categoryList[category].map((item, index) => (
                                                    <ListGroup.Item key={index}
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
                    <div className="col-6 custom-second-column h-100 bg-white">
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
                    <div className="col bg-primary-subtle">

                    </div>

                </div>

            </div>
            <div className="list-group"></div>
        </>
    )
}

export default Bets;