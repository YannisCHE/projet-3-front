import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function Order(props) {

    return (
        <Button 
        variant={props.index % 2 === 0 ? "light" : "dark"}
        className="" 
        onClick={() => props.whenClicked()}>
            <Row>
                <Col xs={6} sm={8}>
                    Commande: {props.clientRef}
                </Col>
                <Col xs={4} sm={3}>
                    du {props.dateOfOrder}
                </Col>
            </Row>
        </Button>
    )
}