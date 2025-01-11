import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  FloatingLabel
} from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    pesel: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const extractYearOfBirth = (pesel) => {
      let year = parseInt(pesel.substring(0, 2), 10);
      const month = parseInt(pesel.substring(2, 4), 10);

      if (month > 80) {
        year += 1800;
      } else if (month > 90) {
        year += 1900;
      } else {
        year += 2000;
      }

      return year;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.trim()
    }));
    if (error) setError('');
  };

  const validateAge = (pesel) => {
    try {
      const birthYear = extractYearOfBirth(pesel);
      const today = new Date();
      const age = today.getFullYear() - birthYear;
      return age >= 18;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);

    try {
      if (!form.checkValidity()) {
        throw new Error("Proszę wypełnić wszystkie wymagane pola");
      }

      if (formData.password.length < 8) {
        throw new Error("Hasło musi mieć co najmniej 8 znaków");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Hasła nie są identyczne");
      }

      if (!validateAge(formData.pesel)) {
        throw new Error("Musisz mieć ukończone 18 lat aby się zarejestrować");
      }

      const response = await axios.post('http://localhost:8000/api/users/register', {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        surname: formData.lastname,
        /*pesel: formData.pesel,
        phone_number: formData.phone_number,*/ // uncomment when server handles it
        email: formData.email,
        role: "USER",
      });

      if (response.data.status === 'ok') {
        console.log('Zalogowano pomyślnie');
        navigate('/Login'); // tutaj chyba App.js
      }
      
    } catch (err) {
      setError(err.message || 'Błąd rejestracji. Spróbuj ponownie.');
      e.stopPropagation();
    }
  };

  return (
      <Container fluid className="bg-light min-vh-100 d-flex flex-column justify-content-center py-5">
        <div className="position-absolute top-0 start-0 m-3">
          <Link to="/" className="btn btn-link text-primary d-flex align-items-center">
            <FaArrowLeft className="me-2" />
            Powrót do strony głównej
          </Link>
        </div>

        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Rejestracja w BetMaster
                </h2>

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                      {error}
                    </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FloatingLabel controlId="name" label="Imię" className="mb-3">
                    <Form.Control
                        type="Name"
                        placeholder="Imię"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,40}"
                    />
                    <Form.Control.Feedback type="invalid">
                      Podaj prawidłowe imię!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                

                  <FloatingLabel controlId="lastname" label="Nazwisko" className="mb-3">
                    <Form.Control
                        type="lastname"
                        placeholder="Nazwisko"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,40}"
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj prawidłowe nazwisko!
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="username" label="Nazwa użytkownika" className="mb-3">
                    <Form.Control
                        type="username"
                        placeholder="Nazwa użytkownika"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        pattern="[a-zA-Z]{2,40}"
                    />
                    <Form.Control.Feedback type="invalid">
                      Podaj prawidłowe nazwę użytkownika (bez polskich znaków)!
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="email" label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <Form.Control.Feedback type="invalid">
                      Proszę podać prawidłowy adres email
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="pesel" label="PESEL" className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="01234567890"
                        name="pesel"
                        value={formData.pesel}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{11}"
                        maxLength={11}
                    />
                    <Form.Control.Feedback type="invalid">
                      Proszę wprowadzić poprawny numer PESEL
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="password" label="Hasło" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Hasło"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                    <Form.Control.Feedback type="invalid">
                      Hasło musi mieć co najmniej 8 znaków
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="confirmPassword" label="Potwierdź hasło" className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Potwierdź hasło"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                      Proszę potwierdzić hasło
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Form.Group className="mb-4">
                    <Form.Check
                        required
                        id="terms"
                        label={
                          <span>
                        Akceptuję{' '}
                            <Link to="/terms" className="text-primary">regulamin</Link>
                            {' '}i{' '}
                            <Link to="/privacy" className="text-primary">politykę prywatności</Link>
                      </span>
                        }
                        feedback="Musisz zaakceptować warunki aby kontynuować"
                        feedbackType="invalid"
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="text-white"
                    >
                      Zarejestruj się
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <span className="text-muted">Masz już konto? </span>
                    <Link to="/login" className="text-primary text-decoration-none">
                      Zaloguj się
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default Register;