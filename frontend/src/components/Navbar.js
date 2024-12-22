import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Button} from "react-bootstrap";

const MyNavbar = () => {

  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return sessionStorage.getItem('isLogged') === 'true';
  }
  const handleLogout = (e) => {
    e.preventDefault();

    sessionStorage.setItem('isLogged', 'false');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary fixed-top h-10">
      <div className="container-fluid ps-4 pe-4">
        <Link to="/" className="navbar-brand fw-bold">BetMaster</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-nav">
            {isUserLoggedIn() ? (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <div className="btn btn-light ms-2" onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Logowanie</Link>
                <Link to="/register" className="btn btn-light ms-2">Rejestracja</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
