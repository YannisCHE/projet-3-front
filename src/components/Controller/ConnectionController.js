import React, { useContext } from "react";
import { myContext } from "../../index";
import { getBackUrl } from "./backUrl";
import ConnectionView from "../View/ConnectionView";
import { useNavigate } from "react-router-dom";

export default function ConnectionController() {
    const navigate = useNavigate();
    const backUrl = `${getBackUrl()}/security`;

    const [, setUser] = useContext(myContext);
    
    function authenticate(login, password) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: login, password: password})
        }
        fetch(`${backUrl}/authenticate`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => setUser(json))
        .then(() => {
                navigate("/welcome");  
            })
        .catch(response => {
            console.error(
            "Une erreur s'est produite lors de l'authentification",
            `${response.status} ${response.statusText}`);
        });
    }

    return (
        <ConnectionView 
            authenticate={(login, password) => authenticate(login, password)}
        />
    );
}