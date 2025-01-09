import AdminHeader from "./AdminHeader";
import {Col, Container, Row} from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import {Outlet} from "react-router-dom";
import React from "react";

const AdminLayout = () => {
    return (
        <div className="admin-page">
            <AdminHeader />
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar-col">
                        <AdminSidebar />
                    </Col>
                    <Col md={10} className="content-col">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminLayout;