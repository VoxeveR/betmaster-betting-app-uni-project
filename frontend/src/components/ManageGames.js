import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ManageGames = () => {
  const [games, setGames] = useState([
    { id: 1, name: 'Mecz A vs B', date: '2023-10-15', odds: '2.5' },
    { id: 2, name: 'Mecz C vs D', date: '2023-10-16', odds: '3.0' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', odds: '' });

  const handleAddGame = () => {
    setGames([...games, { id: games.length + 1, ...formData }]);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Zarządzanie grami</h2>
      <Button onClick={() => setShowModal(true)}>Dodaj nową grę</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Data</th>
            <th>Kursy</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>{game.date}</td>
              <td>{game.odds}</td>
              <td>
                <Button variant="warning" size="sm">Edytuj</Button>{' '}
                <Button variant="danger" size="sm">Usuń</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj nową grę</Modal.Title>
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
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Kursy</Form.Label>
              <Form.Control
                type="text"
                value={formData.odds}
                onChange={(e) => setFormData({ ...formData, odds: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleAddGame}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageGames;