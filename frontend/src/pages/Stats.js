import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Button} from 'react-bootstrap';

const Stats = () => {
    const [statPath, setStatPath] = useState('');

    useEffect(() => {
        try{
            axios.get('http://localhost:8000/api/admin/statistics')
                .then((response) => {
                    setStatPath(response.data)  ;
                    console.log(response.data);
                });
        } catch(error) {
            console.log(error.response.data);
        }
    }, []);


    return (
        <>
            <Container className="text-center">
                <img src={`http://localhost:8000/static/images/image1.png`} alt="xd"/>
                <a href="http://localhost:8000/static/pdf/pdf1.pdf" download>
                    <Button>Download PDF</Button>
                </a>
            </Container>
        </>
    );
};

export default Stats;