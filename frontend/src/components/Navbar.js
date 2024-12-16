import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const MyNavbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  // Toggle the login state
  const handleSimulateLogin = () => {
    setIsLogged((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
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
            {isLogged ? (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/logout" className="btn btn-light ms-2">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Logowanie</Link>
                <Link to="/register" className="btn btn-light ms-2">Rejestracja</Link>
              </>
            )}
            {/* Simulate login button */}
            <button
              className={`btn ms-3 ${isLogged ? 'btn-danger' : 'btn-success'}`}
              onClick={handleSimulateLogin}
            >
              {isLogged ? 'Symuluj Wylogowanie' : 'Symuluj Logowanie'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
