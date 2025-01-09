import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
    
        sessionStorage.setItem('isLogged', 'false');
        navigate('/');
      };

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>Panel Administratora</Navbar.Brand>
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;