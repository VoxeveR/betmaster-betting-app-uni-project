import React, {useEffect, useState} from 'react';
import { BiFootball } from "react-icons/bi";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import axios from "axios";


function BetBoxCard({bet, handleDeleteBet}) {
    const {
        start_date = '',
        start_time = '',
        home = '',
        away = '',
        odds1 = '-',
        oddsX = '-',
        odds2 = '-',
        betID = '-',
        userSelection = '-'
    } = bet || {};

    function handleDelete(){
        handleDeleteBet(betID);
    }

    return (
        <>
            <Card
                color="primary"
                invertedColors
                orientation="vertical"
                variant="soft"
                sx={{mt:1, minWidth: '350px'}}
            >
                <div className = "d-flex justify-content-between">
                    <Typography level="title-lg"><BiFootball /> {home} - {away}</Typography>
                    <Typography level="body2" sx={{mr: 1}}>{(userSelection === '1') ? odds1 : (userSelection === '2') ? odds2 : oddsX}</Typography>
                </div>

                <CardContent orientation="horizontal"
                             sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography variant="body2" color="textSecondary">{userSelection}</Typography>
                        <Typography level="body-xs">Match Result (exluding overtime)</Typography>
                    </div>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                </CardContent>
            </Card>
        </>
    );
}

export default BetBoxCard;
