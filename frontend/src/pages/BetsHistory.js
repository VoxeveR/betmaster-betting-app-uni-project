import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../components/Navbar";
import './Profile.css';
import axios from 'axios';

function BetsHistory() {
    const [userID, setUserID] = useState(sessionStorage.getItem('userID'));

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/bets/${userID}`)
                .then((response) => {
                    console.log(response.data.data);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <MyNavbar />
        </>
    );
}

export default BetsHistory;
