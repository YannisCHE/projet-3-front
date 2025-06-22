import React, { useState } from "react";
import { Button, Row, Col, InputGroup, Form, Container } from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function StatisticView(props) {

    const [selectedOption, setSelectedOption] = useState("");

    const displayData = () => {
        if (selectedOption === "0") {
            props.fetchSumSales()
        } else if (selectedOption === "1") {
            props.fetchMeanCorrection()
        }
    };

    const renderLineChart = (
        <LineChart data={props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey={props.dataType} stroke="#8884d8" strokeWidth={4} isAnimationActive={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );

    return (
        <Container className="pt-5">
            <Row className="text-center align-items-center mb-4">
                <Col sm={4}>
                    <label>Quelles données voulez-vous visualiser (sur les 5 dernieres années)?</label>
                </Col>
                <Col sm={6}>
                    <InputGroup >
                        <Form.Select
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}>
                            <option value="-">-</option>
                            <option value="0">Somme des ventes par années.</option>
                            <option value="1">Moyenne des corrections visuelles par années.</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={1}>
                    <Button
                        onClick={() => displayData()}
                    >
                        Afficher
                    </Button>
                </Col>
            </Row>
            {props.data && props.data.length > 0 && (
                <Row className="justify-content-center">
                    <Col md={10} className="d-flex justify-content-center">
                        <ResponsiveContainer width="100%" height={400}>
                            {renderLineChart}
                        </ResponsiveContainer>
                    </Col>
                </Row>
            )}
        </Container>
    );
}