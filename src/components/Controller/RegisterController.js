import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import RegisterView from "../View/RegisterView";
import { getBackUrl } from "./backUrl";


export default function RegisterController(){

    const backUrl = `${getBackUrl()}`;
    const navigate = useNavigate();
    const [regions, setRegions] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [citiesAndZipCodes, setCitiesAndZipCodes] = useState(null);

    useEffect(() => fetchRegion(), []);

    function fetchRegion(){
        fetch(`${backUrl}/locality/regions`)
            .then(response => response.json())
            .then(json => setRegions(json));
    }

    function fetchDepartementByRegionId(regionId) {
        fetch(`${backUrl}/locality/department/${regionId}`)
        .then(response => response.json())
        .then(json => setDepartments(json));
    }

    function fetchCityAndZipCodeByDepartmentId(departmentId) {
        fetch(`${backUrl}/locality/citiesAndZipCodes/${departmentId}`)
        .then(response => response.json())
        .then(json => setCitiesAndZipCodes(json))
    }

    function registerOptician(siret, name, surname, idCityAndZipCode, address, login, password) {
        const optician = {
            siret: siret,
            name: name,
            surname: surname,
            idCityAndZipCode: idCityAndZipCode,
            address: address,
            login: login,
            password: password,
            roleName: "OPTICIAN"
        };
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(optician)
        }
        fetch(`${backUrl}/security/register/optician`, requestOptions)
            .then(response => response.json())
            .then(() => {
                navigate("/connection");  
            });
    }

    function registerAdmin(name, login, password) {
        const admin = { 
            name: name, 
            login: login, 
            password: password, 
            roleName: "ADMIN"
        };
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(admin)
        }
        fetch(`${backUrl}/security/register/admin`, requestOptions)
            .then(response => response.json())
            .then(() => {
                navigate("/connection");  
            });
    }

    return(
        <RegisterView
            departments={departments}
            regions={regions}
            citiesAndZipCodes={citiesAndZipCodes}
            fetchCityAndZipCodeByDepartmentId={(departmentId) => fetchCityAndZipCodeByDepartmentId(departmentId)}
            fetchDepartementByRegionId={(regionId) => fetchDepartementByRegionId(regionId)}
            registerOptician={(siret, name, surname, idCityAndZipCode, address, login, password) =>
                 registerOptician(siret, name, surname, idCityAndZipCode, address, login, password)}
            registerAdmin={(name, login, password) => registerAdmin(name, login, password)}
        />
    );
}