import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import ManageGames from '../components/ManageGames';
import ManageUsers from '../components/ManageUsers';
import ManageEmployees from '../components/ManageEmployees';
import Stats from '../components/Stats';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <AdminHeader />
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar-col">
            <AdminSidebar />
          </Col>
          <Col md={10} className="content-col">
            <Routes>
              <Route path="manage-games" element={<ManageGames />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-employees" element={<ManageEmployees />} />
              <Route path="stats" element={<Stats />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;