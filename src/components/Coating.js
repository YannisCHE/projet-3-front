import React from "react";
import { Col, Row } from "react-bootstrap";

export default function Coating(props) {

    return (
        <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
            <Col xs={5}  sm={5} md={4} lg={3}>
                {props.label}
            </Col>
            <Col xs={3} sm={4} md={3} lg={2}>
                prix par verre :
            </Col>
            <Col xs={4} sm={3} md={3}>
                {props.price} euros
            </Col>
        </Row>
    );
}