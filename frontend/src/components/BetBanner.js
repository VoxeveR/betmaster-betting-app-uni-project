import React from 'react';
import { Button, ButtonGroup } from "react-bootstrap";

const BetBanner = ({ betData }) => {
    return (
        <div className="container-fluid bg-body-secondary">
            <div className="row align-items-center">
                <div className="col">
                    <small className="fs-8">{betData.date}</small>
                    <p className="mb-0">{betData.team1} vs {betData.team2}</p>
                </div>
                <div className="col">
                    <ButtonGroup>
                        <Button>1.</Button>
                        <Button>X</Button>
                        <Button>2.</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default BetBanner;
