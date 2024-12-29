import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../components/Navbar";
import './Bets.css';
import BetBanner from "../components/BetBanner";
import axios from 'axios';

function Bets(){
    const [categoryList, setCategoryList] = useState([]);

    const [betsList, setBetsList] = useState({
        category:"League of Legends",
        team1:"T1",
        team1stake:"1.70",
        team2:"G2",
        team2stake:"2.70",
        drawstake:"4.70",
        date:"22.12",
        hour:"17:00"
    });

    const [category, setCategory] = useState('');
    const [selectedBets, setSelectedBets] = useState([]);

    const content = category ? (
        <div className="p-3 bg-light border rounded mt-2">
            <h5>Details for {category}</h5>
            <p>
                Here are some example details for <b>{category}</b>.
            </p>
        </div>
    ) : (
        <p>Please select a category to see details here.</p>
    );

    useEffect(()=>{
            //handling filling bets -> API CALL
            try{
                axios.get('http://localhost:8000/api/games/categories').
                then((response) => {
                    setCategoryList(response.data.data);
                });
            } catch(error){
                console.log(error.response.data);
            }
    }, []);

    function handleCategory(event) {
        setCategory(event.target.textContent);
    }

    function handleBetSelection(type) {
        const newSelectedBets = {
            ...selectedBets,
        }
       // setSelectedBets(..prev, event.target.textContent);
    }

    return (
        <>
        <MyNavbar />
            <div className="container-fluid h-100 pt-5 bg-primary-subtle">
                <div className="row h-100 mt-5">
                    <div className="col h-100 align-items-center bg-primary-subtle custom-first-column">
                        <h4 className = "mt-2">Sport</h4>
                        <div className="list-group">
                            {Object.keys(categoryList).map((bet) => (
                                <div
                                    id="bets"
                                    className="list-group-item border1 d-flex align-items-center"
                                    onClick={handleCategory}>
                                    {bet}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="col-6 custom-second-column h-100 bg-white">
                        <p>{content}</p>
                        <BetBanner betData={betsList} onBetSelect={handleBetSelection} />
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