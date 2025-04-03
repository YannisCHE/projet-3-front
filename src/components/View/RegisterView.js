import React, { useState } from "react";
import { Row, Col, Button, Card, InputGroup, Form } from "react-bootstrap";

export default function RegisterView(props) {

    const [role, setRole] = useState("")
    const [adminFields, setAdminFields] = useState({ name: "", login: "", password: "" })
    const [opticianFields, setOpticianFields] = useState({
        siret: "", name: "", surname: "", login: "",
        password: "", address: "", idCityAndZipCode: "", zipCode: ""
    })

    const handleChangeAdmin = (e) => {
        const { name, value } = e.target;

        setAdminFields({ ...adminFields, [name]: value });

    };

    const handleChangeOptician = (e) => {
        const { name, value } = e.target;

        setOpticianFields({ ...opticianFields, [name]: value });

    };

    const handleChangeRegion = (e) => {
        const value = e.target.value;
        props.fetchDepartementByRegionId(value);
    };

    const handleChangeDepartment = (e) => {
        const value = e.target.value;
        props.fetchCityAndZipCodeByDepartmentId(value);
    };

    const handleChangeCity = (e) => {
        const selectedCityId = e.target.value;

        const selectedCity = props.citiesAndZipCodes.find(city => city.id === parseInt(selectedCityId));
        setOpticianFields({
            ...opticianFields,
            idCityAndZipCode: selectedCityId,
            zipCode: selectedCity ? selectedCity.zipcode : ""
        });
    };


    return (
        <Row className="d-flex justify-content-center p-3 pt-5">
            <Card className="max-width-50-rem p-0">
                <Card.Header className="text-center">Inscription</Card.Header>
                <Row className="d-flex justify-content-center m-3">
                    Voulez-vous vous inscrire en temps que ?
                </Row>
                <Row className="text-center p-3">
                    <Col>
                        <Button variant={role === "opticien" ? "primary" : "outline-primary"} onClick={() => setRole("opticien")}>
                            Opticien
                        </Button>
                    </Col>
                    <Col>
                        <Button variant={role === "administrateur" ? "primary" : "outline-primary"} onClick={() => setRole("administrateur")}>
                            Administrateur
                        </Button>
                    </Col>
                </Row>
                {role === "opticien" && (
                    <>

                        <Row className="ps-3 pe-3">
                            <Col sm={2}><output>Siret</output></Col>
                            <Col sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="siret" value={opticianFields.siret} onChange={handleChangeOptician} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3">
                            <Col sm={2}><output>Nom</output></Col>
                            <Col sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="name" value={opticianFields.name} onChange={handleChangeOptician} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3">
                            <Col sm={2}><output>Prénom</output></Col>
                            <Col sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="surname" value={opticianFields.surname} onChange={handleChangeOptician} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3 mb-3">
                            <Col sm={2}>
                                <label>Region</label>
                            </Col>
                            <Col sm={8}>
                                <InputGroup name="region">
                                    <Form.Select
                                        onChange={handleChangeRegion}
                                    >
                                        <option className="d-none" value="-">-</option>
                                        {Object.values(props.regions).map(region => (
                                            <option
                                                key={region.regionId}
                                                value={region.regionId}
                                            >
                                                {region.regionLabel}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3 mb-3">
                            <Col sm={2}>
                                <label>Département</label>
                            </Col>
                            <Col sm={8}>
                                <InputGroup name="department">
                                    <Form.Select
                                        onChange={handleChangeDepartment}
                                    >
                                        <option className={`d-none`} value="-">Choississez d'abord une région</option>
                                        {props.departments && Object.values(props.departments).map(department => (
                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department.departmentLabel}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3 mb-3">
                            <Col sm={2}>
                                <label>Ville</label>
                            </Col>
                            <Col sm={4}>
                                <InputGroup name="cityAndZipCode">
                                    <Form.Select
                                        onChange={handleChangeCity}
                                    >
                                        <option className={`d-none`} value="-">Choississez d'abord un département</option>
                                        {props.citiesAndZipCodes && Object.values(props.citiesAndZipCodes).map(cityAndZipCode => (
                                            <option
                                                key={cityAndZipCode.id}
                                                value={cityAndZipCode.id}
                                            >
                                                {cityAndZipCode.city}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                            <Col sm={2}>
                                <label>Code Postal</label>
                            </Col>
                            <Col sm={2}>
                                <InputGroup>
                                    <Form.Control type="text" value={opticianFields.zipCode || ""} readOnly />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3">
                            <Col sm={2}><output>Adresse</output></Col>
                            <Col sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="address" value={opticianFields.address} onChange={handleChangeOptician} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3">
                            <Col sm={2}><output>Login</output></Col>
                            <Col sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="login" value={opticianFields.login} onChange={handleChangeOptician} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3">
                            <Col sm={2}><output>Password</output></Col>
                            <Col sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="password" name="password" value={opticianFields.password} onChange={handleChangeOptician} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="pb-3 ps-3 pe-3">
                            <Col className="text-center">
                                <Button variant="success" onClick={() => props.registerOptician(opticianFields.siret, opticianFields.name,
                                    opticianFields.surname, opticianFields.idCityAndZipCode, opticianFields.address, opticianFields.login, opticianFields.password
                                )}>
                                    S'inscrire
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}
                {role === "administrateur" && (
                    <>

                        <Row className="ps-3 pe-3">
                            <Col sm={3}><output>Nom</output></Col>
                            <Col sm={7}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="name" value={adminFields.name} onChange={handleChangeAdmin} />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row className="ps-3 pe-3">
                            <Col sm={3}><output>identifiant</output></Col>
                            <Col sm={7}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" name="login" value={adminFields.login} onChange={handleChangeAdmin} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="ps-3 pe-3">
                            <Col sm={3}><output>mot de passe</output></Col>
                            <Col sm={7}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="password" name="password" value={adminFields.password} onChange={handleChangeAdmin} />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row className="pb-3 ps-3 pe-3">
                            <Col className="text-center">
                                <Button variant="success" onClick={() => props.registerAdmin(adminFields.name, adminFields.login, adminFields.password)}>
                                    S'inscrire
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Card>
        </Row>
    );
}