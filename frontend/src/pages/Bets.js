import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../components/Navbar";
import './Bets.css';
import BetBanner from "../components/BetBanner";

function Bets(){
    const [categoryList, setCategoryList] = useState([
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
        "Piłka nożna", "CS:2", "League of Legends", "Koszykówka",
    ]);

    const [betsList, setBetsList] = useState({
        category:"League of Legends",
        team1:"T1",
        team2:"G2",
        date:"22.12.2024",
    });

    const [category, setCategory] = useState('');

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

    });

    function handleCategory(event) {
        setCategory(event.target.textContent);
    }

    return (
        <>
        <MyNavbar />
            <div className="container-fluid h-100 pt-5 bg-primary-subtle">
                <div className="row h-100 mt-5">
                    <div className="col-md h-100 align-items-center bg-primary-subtle custom-first-column">
                        <h4 className = "mt-2">Sport</h4>
                        <div className="list-group">
                            {categoryList.map((bet) => (
                                <div
                                    id="bets"
                                    className="list-group-item border1 d-flex align-items-center"
                                    onClick={handleCategory}>
                                    {bet}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="col-md-8 custom-second-column h-100 bg-white">
                        <p>{content}</p>
                        <BetBanner betData={betsList} />
                    </div>
                    <div className="col-md bg-primary-subtle">

                    </div>

                </div>

            </div>
            <div className="list-group"></div>
        </>
    )
}

export default Bets;