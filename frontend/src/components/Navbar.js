import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const MyNavbar = () => {
  const role = sessionStorage.getItem('role');

  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return sessionStorage.getItem('isLogged') === 'true';
  }

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark navbar-expand bg-primary fixed-top h-10">
      <div className="container-fluid ps-4 pe-4" >
        <Link to="/" className="navbar-brand fw-bold">BetMaster</Link>
        <div className="navbar-nav">
          <Link to="/Bets" className="nav-link">Offer</Link>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-nav">
            {isUserLoggedIn() ? (
              <>
                <Link to="/my_bets" className="nav-link mt-1">Bets</Link>
                <Link to="/profile" className="nav-link mt-1">Profile</Link>
                <div className="btn btn-light ms-2" onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link mt-1">Logowanie</Link>
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
