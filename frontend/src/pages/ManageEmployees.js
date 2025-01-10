  import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form, Alert} from 'react-bootstrap';
  import axios from "axios";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Adam', surname:'Nowak', position: 'Analityk' },
    { id: 2, name: 'Ewa', surname:'Kowalska', position: 'Admin' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    password_repeat: '',
    position: 'Analityk'
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');


  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log("xddd");
    console.log(formData);
    try {
      if (formData.password !== formData.password_repeat) {
        throw new Error("Hasła nie są identyczne");
      }
      setValidated(true);
      console.log({
        username: formData.username,
        password: formData.password,
        name: formData.name,
        surname: formData.surname,
        email: formData.email})

      const response = await axios.get('http://localhost:8000/api/admin/newadmin', {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        surname: formData.surname,
        email: formData.email
      });

      if (response.data.status === 'ok') {
        console.log('Utworzono pomyślnie');
      }

    } catch(err) {
      setError(err.message || 'Błąd rejestracji. Spróbuj ponownie.');
      e.stopPropagation();
    }

    setEmployees([...employees, { id: employees.length + 1, ...formData }]);
    setShowModal(false);
  };

  useEffect(()=>{
    /*
    try{
      axios.get('http://localhost:8000/api/games/categories') // podmienic adres na prawidłowy
          .then((response) => {
            setAdmins(response.data.data);
            console.log(response.data.data);
          });
    } catch(error){
      console.log(error.response.data);
    }
     */
  }, []);

  return (
    <div>
      <h2>Zarządzanie pracownikami</h2>
      <Button onClick={() => setShowModal(true)}>Dodaj nowego pracownika</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Stanowisko</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name} {employee.surname}</td>
              <td>{employee.position}</td>
              <td>
                <Button variant="warning" size="sm">Edytuj</Button>{' '}
                <Button variant="danger" size="sm">Usuń</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Dodaj nowego pracownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEmployee} validated={validated}>
            <Form.Group>
              <Form.Label>Imię</Form.Label>
              <Form.Control
                  type="text"
                  value={formData.name}
                  required
                  pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,40}"
                  placeholder="Imię"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Nazwisko"
                  value={formData.surname}
                  name="surname"
                  required
                  pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,40}"
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control
                  type="text"
                  placeholder={"Nazwa użytkownika"}
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                  type="password"
                  required
                  value={formData.password}
                  placeholder="Hasło"
                  minLength={8}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control
                  type="password"
                  value={formData.password_repeat}
                  required
                  placeholder="Potwierdź hasło"
                  minLength={8}
                  onChange={(e) => setFormData({...formData, password_repeat: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stanowisko</Form.Label>
              <Form.Select
                  value={formData.position}
                  defaultValue="Select"
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
              >
                <option value="Analityk">Analityk</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="primary" type="submit">
                Dodaj
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                Anuluj
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageEmployees;