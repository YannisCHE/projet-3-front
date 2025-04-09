import React, { useEffect, useContext, useState } from "react";

import HistoryView from "../View/HistoryView";
import { getBackUrl } from "./backUrl";
import { myContext } from "../..";
import { useNavigate } from "react-router-dom";

export default function HistoryController() {

    const navigate = useNavigate();
    const [user, setUser] = useContext(myContext);
    const backUrl = `${getBackUrl()}`;
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => fetchOrderHistory(), []);

    function fetchOrderHistory() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        }
        fetch(`${backUrl}/orders/minimal/${user.id}`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                const newOrderHistory = [];
                for (let i = 0; i < json.length; i++) {
                    newOrderHistory.push({
                        id: json[i].orderId,
                        clientRef: json[i].clientReference,
                        dateOfOrder: json[i].dateOfOrder
                    });
                }
                setOrderHistory(newOrderHistory)
            })
            .catch(error => {
                console.error("Error fetching order history:", error);
            });
    }

    function whenClicked(orderId) {
        navigate("/summary", { state: { orderId: orderId } });
    }

    return (
        <HistoryView
            orderHistory={orderHistory}
            whenClicked={(orderId) => whenClicked(orderId)}
        />
    );
}