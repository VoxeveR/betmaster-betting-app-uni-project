import React from 'react';
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const BetBanner = ({ betData, onBetSelect }) => {
    return (
        <div className="container bg-body-secondary">
            <div className="row align-items-center m-0">
                <div className="col">

                    <p className="mb-0"><small className="fs-6"> {betData.date} </small><b> {betData.team1} </b>
                        <small> {betData.hour} </small> <b> {betData.team2} </b></p>
                </div>
                <div className="col ms-auto text-end">
                    <ToggleButtonGroup type="radio" name="betType">
                        <ToggleButton
                            id="1."
                            value={'1'}
                            onClick = {() => onBetSelect("1")}>
                            1.</ToggleButton>
                        <ToggleButton
                            id="X"
                            value={'X'}
                            onClick = {() => onBetSelect("X")}>
                            X</ToggleButton>
                        <ToggleButton
                            id="2."
                            value={'2'}
                            onClick = {() => onBetSelect("2")}>
                            2.</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default BetBanner;
