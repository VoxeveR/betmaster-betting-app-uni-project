  import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form, Alert} from 'react-bootstrap';
  import axios from "axios";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    phone_number: '',
    pesel: '',
    password: '',
    password_repeat: '',
    role: 'ANALYST'
  });

  useEffect(()=>{
    try{
      axios.get('http://localhost:8000/api/users/employees')
          .then((response) => {
            setEmployees(Object.values(response.data.data));
            console.log(response.data.data);
          });
    } catch(error) {
      console.log(error.response.data);
    }
  }, []);

  const handleRemoveUser = async (user_id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/users/${user_id}`);
      if (response.data.status === 'ok') {
        setEmployees(employees.filter(emp => emp.user_id !== user_id));
      }
    } catch (error) {
      console.error('Failed to remove employee:', error);
    }
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault();

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
        pesel: parseInt(formData.pesel),
        phone_number: parseInt(formData.phone_number),
        email: formData.email,
        role: formData.role
      });

      const response = await axios.post('http://localhost:8000/api/admin/newadmin', {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        surname: formData.surname,
        pesel: parseInt(formData.pesel),
        phone_number: parseInt(formData.phone_number),
        email: formData.email,
        role: formData.role
      });

      if (response.data.status === 'ok') {
        console.log('Utworzono pomyślnie');
      }

    } catch(err) {
      setError(err.message || 'Błąd przy tworzeniu konta. Spróbuj ponownie.');
      e.stopPropagation();
    }

   setEmployees([...employees, {
      name: formData.name,
      surname: formData.surname,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      pesel: formData.pesel,
      role: formData.role,
    }]);
    setShowModal(false);
    setError('');
  };

  return (
    <div>
      <h2>Zarządzanie pracownikami</h2>
      <Button onClick={() => setShowModal(true)}>Dodaj nowego pracownika</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Nazwa użytkownika</th>
            <th>Email</th>
            <th>Numer telefonu</th>
            <th>PESEL</th>
            <th>Stanowisko</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
              <tr>
                <td>{employee.name} </td>
                <td>{employee.surname}</td>
                <td>{employee.username}</td>
                <td>{employee.email}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.pesel}</td>
                <td>{employee.role}</td>
                <td>
                  {/*<Button variant="warning" size="sm">Edytuj</Button>{' '}*/}
                  <Button variant="danger" size="sm" onClick={() => handleRemoveUser(employee.user_id)}>Usuń</Button>
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
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control
                  type="text"
                  placeholder={"Numer telefonu"}
                  required
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>PESEL</Form.Label>
              <Form.Control
                  type="text"
                  value={formData.pesel}
                  required
                  placeholder="Numer telefonu"
                  pattern="[0-9]{11}"
                  onChange={(e) => setFormData({...formData, pesel: e.target.value})}
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
                  value={formData.role}
                  defaultValue="Select"
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="ANALYST">Analityk</option>
                <option value="ADMIN">Admin</option>
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
      </Modal>
    </div>
  );
};

export default ManageEmployees;