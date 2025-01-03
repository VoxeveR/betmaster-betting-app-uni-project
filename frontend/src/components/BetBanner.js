import React from 'react';
import './BetBanner.css';
import { ToggleButton, ToggleButtonGroup, Button } from "react-bootstrap";

// Replace betIndex with betID
const BetBanner = ({ betData = {}, betID, onBetSelect }) => {
    const {
        start_date = '',
        start_time = '',
        home = '',
        away = '',
        odds1 = '-',
        oddsX = '-',
        odds2 = '-'
    } = betData || {};

    const savedValue = sessionStorage.getItem(`${betID}`); // Loading selectionData

    //FIXME:
    // example function checking if it works
    const handleDeselect = () => {
        sessionStorage.removeItem(`${betID}`);

        onBetSelect(null);
    };

    return (
        <div className="container mt-2 rounded p-3" style={{background: '#E3EFFB'}}>
            <div className="row align-items-center m-0">
                <div className="col">
                    <small className="fs-6"> {start_date} </small>
                    <p className="mb-0"><b> {home} </b>
                        <small> {start_time.slice(0, start_time.length - 3)} </small> <b> {away} </b></p>
                </div>
                <div className="col text-end pe-0">
                    <ToggleButtonGroup type="radio" name={betID} value={savedValue}>
                        <ToggleButton
                            id={`1:${betID}`}
                            value={`1`}
                            onClick={() => onBetSelect(`${betID}:1`)}
                        >
                            1.
                        </ToggleButton>
                        <ToggleButton
                            id={`X:${betID}`}
                            value={`X`}
                            onClick={() => onBetSelect(`${betID}:X`)}
                        >
                            X
                        </ToggleButton>
                        <ToggleButton
                            id={`2:${betID}`}
                            value={`2`}
                            onClick={() => onBetSelect(`${betID}:2`)}
                        >
                            2.
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {/*
                    <Button variant="secondary" onClick={() => handleDeselect()} className="mt-2">
                        Deselect
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default BetBanner;
