import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Card } from "react-bootstrap";
import Coating from "../Coating";

export default function SummaryView(props) {

    const navigate = useNavigate()

    function createCoatingsToShow() {

        if (!props.order.coatingsLabel || props.order.coatingsLabel.length === 0) {
            return <></>;
        }

        const coatingsToShow = [];
        for (let i = 0; i < props.order.coatingsLabel.length; i++) {
            coatingsToShow.push(
                <Coating
                    key={i}
                    index={i}
                    label={props.order.coatingsLabel[i]}
                    price={props.order.coatingsPrices[i]}
                />
            );
        }
        return coatingsToShow;
    }

    return (
        <Row className="d-flex justify-content-center p-3 pt-5">
            <Card className="max-width-50-rem p-0 ">
                <Card.Header className="text-center">verre</Card.Header>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={4} xl={2}><output>Référence client :</output></Col>
                    <Col xs={4} xl={8}>
                        <label>{props.order.clientReference}</label>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={4} xl={2}><output>Date de commande :</output></Col>
                    <Col xs={4} xl={8}>
                        <label>{props.order.dateOfOrder}</label>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={4} xl={2}>
                        <label>Type de verre :</label>
                    </Col>
                    <Col xs={4} xl={8}>
                        <label>{props.order.type}</label>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={4} sm={2} xl={2}>
                        <label>Verre :</label>
                    </Col>
                    <Col xs={5} sm={3} xl={3}>
                        <label>{props.order.lens}</label>
                    </Col>
                    <Col xs={4} sm={3} xl={2}>
                        <label>Diamètre :</label>
                    </Col>
                    <Col xs={4} sm={3} xl={3}>
                        <label>{props.order.diameter}</label>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={4} sm={2} xl={2}>
                        <label>Matière :</label>
                    </Col>
                    <Col xs={5} sm={3} xl={3}>
                        <label>{props.order.material}</label>
                    </Col>
                    <Col xs={4} sm={3} xl={2}>
                        <label>Indice de Réfraction :</label>
                    </Col>
                    <Col xs={4} sm={3} xl={3}>
                        <label>{props.order.refractiveValue}</label>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col sm={2}>
                        <label>prix par verre :</label>
                    </Col>
                    <Col sm={4}>
                        <label>{props.order.lensPrice} euros</label>
                    </Col>
                </Row>
            </Card>
            <Row className="mt-3 max-width-50-rem p-0">
                <Col className="ps-0 pe-3">
                    <Card>
                        <Card.Header className="text-center">Verre gauche</Card.Header>
                        <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                            <Col xs={5} sm={4}>
                                <label>Sphere:</label>
                            </Col>
                            <Col xs={2} sm={6}>
                                <label>{props.order.leftSphere}</label>
                            </Col>
                        </Row>
                        {props.order.leftCylinder && (
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col xs={5} sm={4}>
                                    <label>Cylindre:</label>
                                </Col>
                                <Col xs={2} sm={6}>
                                    <label>{props.order.leftCylinder}</label>
                                </Col>
                            </Row>
                        )}
                        {props.order.leftCylinder && (
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col xs={5} sm={4}>
                                    <label>Axe:</label>
                                </Col>
                                <Col xs={2} sm={6}>
                                    <label>{props.order.leftAxis}</label>
                                </Col>
                            </Row>
                        )}
                        {props.order.leftAddition && (
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col xs={5} sm={4}>
                                    <label>Addition:</label>
                                </Col>
                                <Col xs={2} sm={6}>
                                    <label>{props.order.leftAddition}</label>
                                </Col>
                            </Row>
                        )}
                    </Card>
                </Col>
                <Col className="ps-3 pe-0">
                    <Card>
                        <Card.Header className="text-center">Verre droit</Card.Header>
                        <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                            <Col xs={5} sm={4}>
                                <label>Sphere:</label>
                            </Col>
                            <Col xs={2} sm={6}>
                                <label>{props.order.rightSphere}</label>
                            </Col>
                        </Row>
                        {props.order.rightCylinder && (
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col xs={5} sm={4}>
                                    <label>Cylindre:</label>
                                </Col>
                                <Col xs={2} sm={6}>
                                    <label>{props.order.rightCylinder}</label>
                                </Col>
                            </Row>
                        )}
                        {props.order.rightCylinder && (
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col xs={5} sm={4}>
                                    <label>Axe:</label>
                                </Col>
                                <Col xs={2} sm={6}>
                                    <label>{props.order.rightAxis}</label>
                                </Col>
                            </Row>
                        )}
                        {props.order.rightAddition && (
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col xs={5} sm={4}>
                                    <label>Addition:</label>
                                </Col>
                                <Col xs={2} sm={6}>
                                    <label>{props.order.rightAddition}</label>
                                </Col>
                            </Row>
                        )}
                    </Card>
                </Col>
            </Row>
            {props.order.coatingsLabel && props.order.coatingsLabel.length > 0 && (
                <Card className="max-width-50-rem p-0 mb-3 mt-3">
                    <Card.Header className="text-center">Traitement</Card.Header>
                    <div className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                        {createCoatingsToShow()}
                    </div>
                </Card>
            )}
            <Card className="max-width-50-rem p-0 mb-3 mt-3">
                <Card.Header className="text-center">Prix Finale</Card.Header>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col className="text-center">
                        <label>{props.order.totalPrice} euros</label>
                    </Col>
                </Row>
            </Card>
            <Row className="pb-3 ps-3 pe-3">
                <Col className="text-center">
                    <Button variant="secondary" onClick={() => navigate("/history")}>
                        Retour
                    </Button>
                </Col>
            </Row>
        </Row>
    );
}