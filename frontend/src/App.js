  import React from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate, Outlet} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Self_exclusion from './pages/SelfExclusion';
import MyNavbar from "./components/Navbar"
import Bets from './pages/Bets';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ManageGames from './pages/ManageGames';
import ManageUsers from './pages/ManageUsers';
import ManageEmployees from './pages/ManageEmployees';
import AdminLayout from './components/Admin/AdminLayout';
import BetsHistory from "./pages/BetsHistory";
import UserData from './pages/UserData';
import Information from './pages/Information';
import Stats from './pages/Stats';

const HomePage = () => {
  return (
    <>
        <MyNavbar/>
        {/* Hero Section */}
        <div className="bg-primary text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-3">
                  Postaw na sport<br/>
                  <span className="text-light">z BetMaster</span>
                </h1>
                <p className="lead mb-4">
                  Najlepsze kursy, setki wydarzeń sportowych i błyskawiczne wypłaty.
                  Dołącz do nas już dziś i zgarnij bonus powitalny!
                </p>
                <Link to="/register" className="btn btn-light btn-lg">
                  Rozpocznij teraz
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-5 bg-white">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5">Najlepsze kursy</h3>
                    <p className="card-text text-muted">
                      Oferujemy konkurencyjne kursy na wszystkie wydarzenia sportowe.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5">Bezpieczne zakłady</h3>
                    <p className="card-text text-muted">
                      Gwarantujemy bezpieczeństwo Twoich środków i danych osobowych.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5">Szybkie wypłaty</h3>
                    <p className="card-text text-muted">
                      Błyskawiczne wypłaty wygranych na Twoje konto bankowe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Events Section */}
        <div className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">Popularne wydarzenia</h2>
            <div className="row g-4">
              {['Piłka nożna', 'Koszykówka', 'Tenis'].map((sport) => (
                  <div key={sport} className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h3 className="card-title h5">{sport}</h3>
                        <p className="card-text text-muted">
                          Sprawdź najnowsze kursy i wydarzenia
                        </p>
                        <button
                            className="btn btn-link p-0"
                            onClick={() => alert('Zaloguj się, aby zobaczyć kursy')}
                        >
                          Zobacz kursy →
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2 className="display-6 mb-3">
                  Gotowy do gry?<br/>
                  <span className="text-light">Dołącz do nas już teraz.</span>
                </h2>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link to="/register" className="btn btn-light btn-lg me-2">
                  Zarejestruj się
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Zaloguj się
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white py-5 mt-auto">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-3">
                <h3 className="h5 mb-3">O nas</h3>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">O firmie</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Kariera</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Kontakt</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h3 className="h5 mb-3">Pomoc</h3>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">FAQ</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Regulamin</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Wsparcie</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h3 className="h5 mb-3">Zakłady</h3>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Sport</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Na żywo</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Wyniki</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h3 className="h5 mb-3">Odpowiedzialna gra</h3>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Zasady</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Limity</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link text-light px-0">Pomoc</a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="my-4"/>
            <p className="text-center text-muted mb-0">
              &copy; 2024 BetMaster. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </footer>
      </>
  );
};

const ProtectedAdminRoute = () => {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN';
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bets" element ={<Bets/>} />
          <Route path="/information" element={<Information />} />
          <Route path="/self_exclusion" element={<Self_exclusion/>} />
          <Route path="/my_bets" element={<BetsHistory/>} />
          <Route path="/user_data" element={<UserData/>} />
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="manage-games" element={<ManageGames />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-employees" element={<ManageEmployees />} />
              <Route path="stats" element={<Stats />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;