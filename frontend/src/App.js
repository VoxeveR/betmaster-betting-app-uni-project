// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="font-bold text-white text-xl">BetMaster</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logowanie
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
              >
                Rejestracja
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-blue-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Postaw na sport</span>
                  <span className="block text-blue-200">z BetMaster</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Najlepsze kursy, setki wydarzeń sportowych i błyskawiczne wypłaty.
                  Dołącz do nas już dziś i zgarnij bonus powitalny!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Rozpocznij teraz
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Najlepsze kursy</h3>
              <p className="mt-2 text-gray-600">
                Oferujemy konkurencyjne kursy na wszystkie wydarzenia sportowe.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Bezpieczne zakłady</h3>
              <p className="mt-2 text-gray-600">
                Gwarantujemy bezpieczeństwo Twoich środków i danych osobowych.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Szybkie wypłaty</h3>
              <p className="mt-2 text-gray-600">
                Błyskawiczne wypłaty wygranych na Twoje konto bankowe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Events Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Popularne wydarzenia
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Event cards */}
            {['Piłka nożna', 'Koszykówka', 'Tenis'].map((sport) => (
              <div key={sport} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-medium text-gray-900">{sport}</h3>
                <p className="text-gray-600 mt-2">
                  Sprawdź najnowsze kursy i wydarzenia
                </p>
                <button
                  className="mt-4 text-blue-600 hover:text-blue-500"
                  onClick={() => alert('Zaloguj się, aby zobaczyć kursy')}
                >
                  Zobacz kursy →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Gotowy do gry?</span>
            <span className="block text-blue-200">Dołącz do nas już teraz.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Zarejestruj się
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
              >
                Zaloguj się
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-white font-medium mb-4">O nas</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">O firmie</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Kariera</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Kontakt</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Pomoc</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Regulamin</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Wsparcie</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Zakłady</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Sport</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Na żywo</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Wyniki</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Odpowiedzialna gra</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Zasady</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Limity</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Pomoc</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-center">
              &copy; 2024 BetMaster. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;