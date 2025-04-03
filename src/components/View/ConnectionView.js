import React, { useState } from "react";
import { Row, Col, Card, InputGroup, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ConnectionView(props) {

    const [fields, setFields] = useState({ login: "", password: "" });

    return (
        <Row className="d-flex justify-content-center">
            <Card className="max-width-50-rem p-0 panel">
                <Card.Header className="text-center">Authentification</Card.Header>
                
                <Row className="pt-4">
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }} lg={{ offset: 1, span: 2 }}>
                        <output>Identifiant</output>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }} lg={{ offset: 0, span: 7 }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpLogin">
                                <i className="fa fa-user"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                aria-describedby="inpLogin"
                                placeholder="Veuillez entrer un identifiant"
                                value={fields.login}
                                onChange={form => setFields({ ...fields, login: form.target.value })}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }} lg={{ offset: 1, span: 2 }}>
                        <output>Mot de passe</output>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }} lg={{ offset: 0, span: 7 }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpPassword">
                                <i className="fa fa-key"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                aria-describedby="inpPassword"
                                placeholder="Veuillez entrer un mot de passe"
                                value={fields.password}
                                onChange={form => setFields({ ...fields, password: form.target.value })}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pb-4">
                    <Col
                        xs={{ offset: 2, span: 8 }} s={{ offset: 3, span: 6 }} md={{ offset: 3, span: 6 }} xl={{ offset: 4, span: 5 }}
                        className="p-1"
                    >
                        <Nav.Link
                            className="btn bg-black w-100 text-white p-2"
                            onClick={() => props.authenticate(fields.login, fields.password)}
                        >
                            Connexion
                        </Nav.Link>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
}