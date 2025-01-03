import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', status: 'Aktywny' },
    { id: 2, name: 'Anna Nowak', email: 'anna@example.com', status: 'Zbanowany' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'Aktywny' });

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
      <Button onClick={() => setShowModal(true)}>Dodaj nowego użytkownika</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Email</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
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