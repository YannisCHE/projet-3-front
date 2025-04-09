import React, {useEffect, useState, useContext} from "react";

import SummaryView from "../View/SummaryView";
import { useLocation } from 'react-router-dom';
import { getBackUrl } from "./backUrl";
import { myContext } from "../..";
export default function SummaryController() {

    const [user, setUser] = useContext(myContext);
    const location = useLocation();
    const { orderId } = location.state || {};
    const backUrl = `${getBackUrl()}`;
    const [order, setOrder]= useState("");
    
    useEffect(() => fetchOrder(), []);
    
        function fetchOrder(){

            const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        }
            fetch(`${backUrl}/orders/summary/${orderId}`, requestOptions)
                .then(response => response.json())
                .then(json => {
                    setOrder(json)
                });
                
        }

    return (
        <SummaryView
        order={order}
        />
    );
}