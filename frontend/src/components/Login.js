import React, { useState} from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.status === 'ok') {
        console.log('Zalogowano pomyślnie');
        sessionStorage.setItem('isLogged', 'true');
        sessionStorage.setItem('userID', response.data.data.user_id);
        navigate('/Bets');
      }

    } catch (err) {
      setError('Wystąpił błąd podczas logowania. Sprawdź dane logowania i spróbuj ponownie.');
      console.error('Błąd logowania:', err);
    } finally {
      setIsLoading(false);
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
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Logowanie
                </h2>

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                      {error}
                    </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <FloatingLabel
                      controlId="email"
                      label="Adres email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="mb-3"

                  >
                    <Form.Control
                        type="text"
                        placeholder="Adres email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      Proszę podać adres email
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                      controlId="password"
                      label="Hasło"
                      className="mb-4"
                  >
                    <Form.Control
                        type="password"
                        placeholder="Hasło"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      Proszę podać hasło
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Check
                          type="checkbox"
                          id="rememberMe"
                          label="Zapamiętaj mnie"
                      />
                      <Link to="/forgot-password" className="text-primary text-decoration-none">
                        Zapomniałeś hasła?
                      </Link>
                    </div>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isLoading}
                        className="text-white"
                    >
                      {isLoading ? (
                          <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Logowanie...
                          </>
                      ) : (
                          'Zaloguj się'
                      )}
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-muted">Nie masz jeszcze konta? </span>
                    <Link to="/register" className="text-primary text-decoration-none">
                      Zarejestruj się
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

export default Login;