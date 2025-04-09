import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, InputGroup, Form } from "react-bootstrap";

export default function OrderView(props) {

    const [orderFields, setOrderFileds] = useState({
        clientRef: "", diameterId: "", materialId: "",
        sphereOG: "", cylinderOG: "", axisOG: "", additionOG: "",
        sphereOD: "", cylinderOD: "", axisOD: "", additionOD: "",
        antiScratchId: "", antiReflectionId: "", solarId: ""
    })

    const [priceCoatingFields, setPriceCoatingFields] = useState({ antiScratch: 0, antiReflection: 0, solar: 0 })

    const [calculatedLensPrice, setCalculatedLensPrice] = useState("")

    const [finalCalculatedPrice, setFinalCalculatedPrice] = useState("")

    const [lensTypeFields, setLensTypeFields] = useState({ lensTypeId: "" })

    const [lensFields, setLensFields] = useState({
        price: "", idLens: ""
    })

    const [refractiveValueFields, setRefractiveValueFields] = useState({
        price: "", id: ""
    })

    useEffect(() => {

        if (lensFields.idLens && lensTypeFields.lensTypeId) {
            props.fetchLensRangeCorrection(lensTypeFields.lensTypeId, lensFields.idLens);
        }
    }, [lensFields.idLens, lensTypeFields.lensTypeId]);

    useEffect(() => {
        calculateLensPrice();
    }, [lensFields.price, refractiveValueFields.price]);

    useEffect(() => {
        calculateFinalPrice();
    }, [lensFields.price, refractiveValueFields.price, priceCoatingFields.antiReflection, priceCoatingFields.antiScratch, priceCoatingFields.solar]);

    const calculateLensPrice = () => {
        if (refractiveValueFields.price !== "" && lensFields.price !== "") {
            const totalPrice = parseFloat(lensFields.price) + parseFloat(refractiveValueFields.price);
            setCalculatedLensPrice(`${totalPrice} euros`);
        } else {
            setCalculatedLensPrice("Dépend du verre et de l'indice de réfraction");
        }
    };

    const calculateFinalPrice = () => {
        if (calculatedLensPrice !== "") {
            const finalPrice = (parseFloat(lensFields.price) + parseFloat(refractiveValueFields.price) + parseFloat(priceCoatingFields.antiReflection)
                + parseFloat(priceCoatingFields.antiScratch) + parseFloat(priceCoatingFields.solar)) * 2;
            setFinalCalculatedPrice(`${finalPrice} euros`);
        }
    }

    const handleChangeOrder = (e) => {
        const { name, value } = e.target;

        setOrderFileds({ ...orderFields, [name]: value });
    };

    const handleChangeLensType = (e) => {
        const value = e.target.value;
        setLensTypeFields({
            ...lensTypeFields,
            lensTypeId: value
        })
        props.fetchAvailableLens(value);

        setLensFields({
            ...lensFields,
            idLens: "",
            price: ""
        });
    };

    const handleChangeLens = (e) => {
        const selectedLensId = e.target.value;
        const selectedLens = props.availableLens.find(lens => lens.id === parseInt(selectedLensId));
        setLensFields({
            ...lensFields,
            idLens: selectedLensId,
            price: selectedLens ? selectedLens.price : ""
        });
    };

    const handleChangeCoating = (e) => {
        const selectedCoatingId = e.target.value;
        const selectedCoating = props.coatings.find(coating => coating.availableCoatingId === parseInt(selectedCoatingId));

        if (selectedCoating.typeCoatingId === 1) {
            setPriceCoatingFields({
                ...priceCoatingFields,
                antiReflection: selectedCoating.price
            });

        } else if (selectedCoating.typeCoatingId === 2) {
            setPriceCoatingFields({
                ...priceCoatingFields,
                antiScratch: selectedCoating.price
            });

        } else if (selectedCoating.typeCoatingId === 3) {
            setPriceCoatingFields({
                ...priceCoatingFields,
                solar: selectedCoating.price
            });

        }

    };

    const resetField = (fieldName) => {
        setOrderFileds({ ...orderFields, [fieldName]: ""})

        if (fieldName === "antiReflectionId") {
            setPriceCoatingFields({
                ...priceCoatingFields,
                antiReflection: 0
            });

        } else if (fieldName === "antiScratchId") {
            setPriceCoatingFields({
                ...priceCoatingFields,
                antiScratch: 0
            });

        } else if (fieldName === "solarId") {
            setPriceCoatingFields({
                ...priceCoatingFields,
                solar: 0
            });

        }
    }

    const HandleChangeMaterial = (e) => {
        const value = e.target.value;
        props.fetchRefractiveValues(value);

        setRefractiveValueFields({
            ...refractiveValueFields,
            id: "",
            price: ""
        });
    };

    const handleChangeRefractiveValue = (e) => {
        const selectedRefractiveValueId = e.target.value;
        const selectedRefractiveValue = props.refractiveValues.find(value => value.refractiveValueId === parseInt(selectedRefractiveValueId));
        setRefractiveValueFields({
            ...refractiveValueFields,
            id: selectedRefractiveValueId,
            price: selectedRefractiveValue ? selectedRefractiveValue.price : ""
        });
    }

    return (
        <Row className="d-flex justify-content-center p-3 pt-5">
            <Card className="max-width-50-rem p-0 ">
                <Card.Header className="text-center">verre</Card.Header>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col sm={2}><output>Référence client</output></Col>
                    <Col sm={8}>
                        <InputGroup className="">
                            <Form.Control type="text" name="clientRef" value={orderFields.clientRef} onChange={handleChangeOrder} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col sm={2}>
                        <label>Type de verre</label>
                    </Col>
                    <Col sm={5} lg={3}>
                        <InputGroup >
                            <Form.Select
                                name="lensType"
                                onChange={handleChangeLensType}
                            >
                                <option className={`d-none`} value="-">-</option>
                                {props.lensTypes && Object.values(props.lensTypes).map(lensType => (
                                    <option
                                        key={lensType.lensTypeId}
                                        value={lensType.lensTypeId}
                                    >
                                        {lensType.lensType}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={5} md={2} lg={2}>
                        <label>Verre</label>
                    </Col>
                    <Col xs={6} md={4} lg={3}>
                        <InputGroup name="lens">
                            <Form.Select
                                name="idLens"
                                value={lensFields.idLens}
                                onChange={(e) => {
                                    handleChangeLens(e);
                                    calculateLensPrice();
                                }}
                            >
                                <option className={`d-none`} value="-">-</option>
                                {props.availableLens && Object.values(props.availableLens).map(lens => (
                                    <option
                                        key={lens.id}
                                        value={lens.id}
                                    >
                                        {lens.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs={5} md={3} lg={2}>
                        <label>Diamètre</label>
                    </Col>
                    <Col xs={6} md={3} lg={2}>
                        <InputGroup >
                            <Form.Select
                                name="diameterId"
                                onChange={handleChangeOrder}
                            >
                                <option className={`d-none`} value="-">-</option>
                                {props.diameters && Object.values(props.diameters).map(diameter => (
                                    <option
                                        key={diameter.diameterId}
                                        value={diameter.diameterId}
                                    >
                                        {diameter.diameter}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col xs={5} md={2} lg={2}>
                        <label>Matière</label>
                    </Col>
                    <Col xs={6} md={4} lg={3}>
                        <InputGroup >
                            <Form.Select
                                name="materialId"
                                onChange={(e) => {
                                    handleChangeOrder(e);
                                    HandleChangeMaterial(e);
                                }}
                            >
                                <option className={`d-none`} value="-">-</option>
                                {props.materials && Object.values(props.materials).map(material => (
                                    <option
                                        key={material.materialId}
                                        value={material.materialId}
                                    >
                                        {material.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs={5} md={3} lg={2}>
                        <label>Indice de Réfraction</label>
                    </Col>
                    <Col xs={6} md={3} lg={2}>
                        <InputGroup >
                            <Form.Select
                                disabled={!orderFields.materialId}
                                name="refractiveValue"
                                onChange={(e) => {
                                    handleChangeRefractiveValue(e)
                                    calculateLensPrice()
                                }}
                            >
                                <option className={`d-none`} value="-">-</option>
                                {props.refractiveValues && Object.values(props.refractiveValues).map(refractiveValue => (
                                    <option
                                        key={refractiveValue.refractiveValueId}
                                        value={refractiveValue.refractiveValueId}
                                    >
                                        {refractiveValue.value}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                    <Col sm={2}>
                        <label>prix par verre</label>
                    </Col>
                    <Col sm={8} lg={5}>
                        <InputGroup>
                            <Form.Control type="text" value={calculatedLensPrice} readOnly />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>
            {refractiveValueFields.price !== "" && lensFields.price !== "" && (
                <Row className="mt-3 max-width-50-rem p-0">
                    <Col className="ps-0 pe-0 ps-lg-0 pe-lg-3 mb-3 mb-lg-0" xs={12} lg={6}>
                        <Card>
                            <Card.Header className="text-center">Verre gauche</Card.Header>
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col sm={4}>
                                    <label>Sphere</label>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup >
                                        <Form.Select
                                            name="sphereOG"
                                            onChange={handleChangeOrder}
                                        >
                                            <option className={`d-none`} value="-">-</option>
                                            {props.rangeSpheres && Object.values(props.rangeSpheres).map((sphere, index) => (
                                                <option
                                                    key={index}
                                                    value={sphere}
                                                >
                                                    {sphere}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col sm={4}>
                                    <label>Cylindre</label>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup >
                                        <Form.Select
                                            name="cylinderOG"
                                            value={orderFields.cylinderOG || "-"}
                                            onChange={handleChangeOrder}
                                        >
                                            <option className={`d-none`} value="-">-</option>
                                            {props.rangeCylinders && Object.values(props.rangeCylinders).map((cylinder, index) => (
                                                <option
                                                    key={index}
                                                    value={cylinder}
                                                >
                                                    {cylinder}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </InputGroup>
                                </Col>
                                <Col xs={1}>
                                    <Button
                                        onClick={() => resetField("cylinderOG")}
                                    >
                                        <i className="fa fa-solid fa-eraser"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col sm={4}>
                                    <label>Axe</label>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup>
                                        <Form.Control type="text" name="axisOG" value={orderFields.axisOG} onChange={handleChangeOrder} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            {Number(lensTypeFields.lensTypeId) === 2 && (
                                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                    <Col sm={4}>
                                        <label>Addition</label>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup >
                                            <Form.Select
                                                name="additionOG"
                                                onChange={handleChangeOrder}
                                            >
                                                <option className={`d-none`} value="-">-</option>
                                                {props.rangeAdditions && Object.values(props.rangeAdditions).map((addition, index) => (
                                                    <option
                                                        key={index}
                                                        value={addition}
                                                    >
                                                        {addition}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    </Col>
                    <Col className="ps-0 pe-0 ps-lg-3 pe-lg-0" xs={12} lg={6}>
                        <Card>
                            <Card.Header className="text-center">Verre droit</Card.Header>
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col sm={4}>
                                    <label>Sphere</label>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup>
                                        <Form.Select
                                            name="sphereOD"
                                            onChange={handleChangeOrder}
                                        >
                                            <option className={`d-none`} value="-">-</option>
                                            {props.rangeSpheres && Object.values(props.rangeSpheres).map((sphere, index) => (
                                                <option
                                                    key={index}
                                                    value={sphere}
                                                >
                                                    {sphere}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col sm={4}>
                                    <label>Cylindre</label>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup >
                                        <Form.Select
                                            name="cylinderOD"
                                            value={orderFields.cylinderOD || "-"}
                                            onChange={handleChangeOrder}
                                        >
                                            <option className={`d-none`} value="-">-</option>
                                            {props.rangeCylinders && Object.values(props.rangeCylinders).map((cylinder, index) => (
                                                <option
                                                    key={index}
                                                    value={cylinder}
                                                >
                                                    {cylinder}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </InputGroup>
                                </Col>
                                <Col xs={1}>
                                    <Button
                                        onClick={() => resetField("cylinderOD")}
                                    >
                                        <i className="fa fa-solid fa-eraser"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                <Col sm={4}>
                                    <label>Axe</label>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup>
                                        <Form.Control type="text" name="axisOD" value={orderFields.axisOD} onChange={handleChangeOrder} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            {Number(lensTypeFields.lensTypeId) === 2 && (
                                <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                                    <Col sm={4}>
                                        <label>Addition</label>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup >
                                            <Form.Select
                                                name="additionOD"
                                                onChange={handleChangeOrder}
                                            >
                                                <option className={`d-none`} value="-">-</option>
                                                {props.rangeAdditions && Object.values(props.rangeAdditions).map((addition, index) => (
                                                    <option
                                                        key={index}
                                                        value={addition}
                                                    >
                                                        {addition}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    </Col>
                </Row>
            )}
            {refractiveValueFields.price !== "" && lensFields.price !== "" && (
                <Card className="max-width-50-rem p-0 mb-3 mt-3">
                    <Card.Header className="text-center">Traitement</Card.Header>
                    <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                        <Col xs={4} md={2} lg={2}>
                            <label>Anti-rayure</label>
                        </Col>
                        <Col xs={6} md={3} lg={2}>
                            <InputGroup >
                                <Form.Select
                                    name="antiScratchId"
                                    value={orderFields.antiScratchId || "-"}
                                    onChange={(e) => {
                                        handleChangeOrder(e)
                                        handleChangeCoating(e)
                                    }}
                                >
                                    <option className={`d-none`} value="-">-</option>
                                    {props.coatings && Object.values(props.coatings)
                                        .filter(coating => coating.typeCoatingId === 2)
                                        .map(coating => (
                                            <option
                                                key={coating.availableCoatingId}
                                                value={coating.availableCoatingId}
                                            >
                                                {coating.coatingName}
                                            </option>
                                        ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} lg={2}>
                            <label>prix par verre</label>
                        </Col>
                        <Col xs={4} md={3} lg={2}>
                            <InputGroup>
                                <Form.Control type="text" value={priceCoatingFields.antiScratch !== 0 ? `${priceCoatingFields.antiScratch} euros` : ""} readOnly />
                            </InputGroup>
                        </Col>
                        <Col xs={1}>
                            <Button
                                onClick={() => resetField("antiScratchId")}
                            >
                                <i className="fa fa-solid fa-eraser"></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                        <Col xs={4} md={2} lg={2}>
                            <label>Anti-reflet</label>
                        </Col>
                        <Col xs={6} md={3} lg={2}>
                            <InputGroup >
                                <Form.Select
                                    name="antiReflectionId"
                                    value={orderFields.antiReflectionId || "-"}
                                    onChange={(e) => {
                                        handleChangeOrder(e)
                                        handleChangeCoating(e)
                                    }}
                                >
                                    <option className={`d-none`} value="-">-</option>
                                    {props.coatings && Object.values(props.coatings)
                                        .filter(coating => coating.typeCoatingId === 1)
                                        .map(coating => (
                                            <option
                                                key={coating.availableCoatingId}
                                                value={coating.availableCoatingId}
                                            >
                                                {coating.coatingName}
                                            </option>
                                        ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} lg={2}>
                            <label>prix par verre</label>
                        </Col>
                        <Col xs={4} md={3} lg={2}>
                            <InputGroup>
                                <Form.Control type="text" value={priceCoatingFields.antiReflection !== 0 ? `${priceCoatingFields.antiReflection} euros` : ""} readOnly />
                            </InputGroup>
                        </Col>
                        <Col xs={1}>
                            <Button
                                onClick={() => resetField("antiReflectionId")}
                            >
                                <i className="fa fa-solid fa-eraser"></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                        <Col xs={4} md={2} lg={2}>
                            <label>Solaire</label>
                        </Col>
                        <Col xs={6} md={3} lg={2}>
                            <InputGroup >
                                <Form.Select
                                    name="solarId"
                                    value={orderFields.solarId || "-"}
                                    onChange={(e) => {
                                        handleChangeOrder(e)
                                        handleChangeCoating(e)
                                    }}
                                >
                                    <option className={`d-none`} value="-">-</option>
                                    {props.coatings && Object.values(props.coatings)
                                        .filter(coating => coating.typeCoatingId === 3)
                                        .map(coating => (
                                            <option
                                                key={coating.availableCoatingId}
                                                value={coating.availableCoatingId}
                                            >
                                                {coating.coatingName}
                                            </option>
                                        ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} lg={2}>
                            <label>prix par verre</label>
                        </Col>
                        <Col xs={4} md={3} lg={2}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={priceCoatingFields.solar !== 0 ? `${priceCoatingFields.solar} euros` : ""}
                                    readOnly
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={1}>
                            <Button
                                onClick={() => resetField("solarId")}
                            >
                                <i className="fa fa-solid fa-eraser"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card>
            )}
            {refractiveValueFields.price !== "" && lensFields.price !== "" && (
                <Card className="max-width-50-rem p-0 mb-3 mt-3">
                    <Card.Header className="text-center">Prix Finale</Card.Header>
                    <Row className="ps-3 pe-3 mb-3 mt-3 align-items-center">
                        <Col className="text-center">
                            <label>{finalCalculatedPrice}</label>
                        </Col>
                    </Row>
                </Card>
            )}
            {refractiveValueFields.price !== "" && lensFields.price !== "" && (
                <Row className="pb-3 ps-3 pe-3">
                    <Col className="text-center">
                        <Button variant="success" onClick={() => props.placeOrder(orderFields,
                            lensTypeFields, lensFields, refractiveValueFields
                        )}>
                            Confirmation de la commande
                        </Button>
                        {props.message && (
                            <div className="text-danger mt-2">
                                {props.message.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
            )}
        </Row>
    )
}