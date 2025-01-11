import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'Aktywny' });

  useEffect(()=>{
    try{
      axios.get('http://localhost:8000/api/users/clients')
          .then((response) => {
            setUsers(Object.values(response.data.data));
            console.log(response.data.data);
          });
    } catch(error) {
      console.log(error.response.data);
    }
  }, []);

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...formData }]);
    setShowModal(false);
  };

  const handleBanUser = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: 'Zbanowany' } : user));
  };

  const handleUnbanUser = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: 'Aktywny' } : user));
  };

  return (
    <div>
      <h2>Zarządzanie użytkownikami</h2>

      <Table striped bordered hover className="mt-3">
        <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Nazwa użytkownika</th>
          <th>Numer telefonu</th>
          <th>PESEL</th>
          <th>Numer dowodu</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone_number}</td>
              <td>{user.pesel}</td>
              <td>{user.id_number}</td>
              <td>
                {user.status === 'Aktywny' ? (
                    <Button variant="danger" size="sm" onClick={() => handleBanUser(user.id)}>
                      Zbanuj
                    </Button>
                ) : (
                    <Button variant="success" size="sm" onClick={() => handleUnbanUser(user.id)}>
                      Odbanuj
                    </Button>
                )}
              </td>
            </tr>
        ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj nowego użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Aktywny">Aktywny</option>
                <option value="Zbanowany">Zbanowany</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;