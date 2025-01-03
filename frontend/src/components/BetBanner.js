import React from 'react';
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
    console.log(savedValue);
    console.log(betID);
    //FIXME:
    // example function checking if it works
    const handleDeselect = () => {
        sessionStorage.removeItem(`${betID}`);

        onBetSelect(null);
    };

    return (
        <div className="container bg-body-secondary mt-2">
            <div className="row align-items-center m-0">
                <div className="col">
                    <small className="fs-6"> {start_date} </small>
                    <p className="mb-0"><b> {home} </b>
                        <small> {start_time.slice(0, start_time.length - 3)} </small> <b> {away} </b></p>
                </div>
                <div className="col ms-auto text-end">
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

                    <Button variant="secondary" onClick={() => handleDeselect()} className="mt-2">
                        Deselect
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BetBanner;
