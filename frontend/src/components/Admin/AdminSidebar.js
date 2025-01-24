import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <Nav className="flex-column bg-light sidebar">
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/manage-games">Zarządzaj grami</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/manage-users">Zarządzaj użytkownikami</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/manage-employees">Zarządzaj pracownikami</Nav.Link>
      </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/admin/stats">Statystyki</Nav.Link>
        </Nav.Item>
    </Nav>
  );
};

export default AdminSidebar;