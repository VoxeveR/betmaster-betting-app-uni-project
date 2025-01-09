import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Adam Nowak', position: 'Pracownik' },
    { id: 2, name: 'Ewa Kowalska', position: 'Admin' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', position: 'Pracownik' });

  const handleAddEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, ...formData }]);
    setShowModal(false);
  };

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
              <td>{employee.name}</td>
              <td>{employee.position}</td>
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
          <Modal.Title>Dodaj nowego pracownika</Modal.Title>
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
              <Form.Label>Stanowisko</Form.Label>
              <Form.Select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              >
                <option value="Pracownik">Pracownik</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageEmployees;