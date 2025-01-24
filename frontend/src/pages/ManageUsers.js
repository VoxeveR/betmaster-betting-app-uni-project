import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', is_banned: false });

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


  const handleBanUser = async (user_id) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/users/ban/${user_id}`);

      if (response.data.status === 'ok') {
        setUsers(currentUsers => {
          const updatedUsers = currentUsers.map(user =>
              user.user_id === user_id ? {...user, is_banned: true} : user
          );
          return updatedUsers;
        });
      }
    } catch (error) {
      console.error('Failed to ban user:', error);
    }
  };

  const handleUnbanUser = async (user_id) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/users/unban/${user_id}`);
      if (response.data.status === 'ok') {
        setUsers(users.map(user =>
            user.user_id === user_id ? { ...user, is_banned: false } : user
        ));
      }
    } catch (error) {
      console.error('Failed to unban user:', error);
    }
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
            <tr key={user.user_id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone_number}</td>
              <td>{user.pesel}</td>
              <td>{user.id_number}</td>
              <td>
                {user.is_banned === false ? (
                    <Button variant="danger" size="sm" onClick={() => handleBanUser(user.user_id)}>
                      Zbanuj
                    </Button>
                ) : (
                    <Button variant="success" size="sm" onClick={() => handleUnbanUser(user.user_id)}>
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
                value={formData.is_banned}
                onChange={(e) => setFormData({ ...formData, is_banned: e.target.value })}
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;