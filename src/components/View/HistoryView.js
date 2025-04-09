import React from "react";
import { Row } from "react-bootstrap";
import Order from "../Order";

export default function HistoryView(props) {

    function createOrdersToShow() {

        if (!props.orderHistory || props.orderHistory.length === 0) {
            return <Row className="text-center fst-italic">
                Votre historique de commande est vide
            </Row>;
        }

        const ordersToShow = [];
        for (let i = 0; i < props.orderHistory.length; i++) {
            ordersToShow.push(
                <Order
                    key={props.orderHistory[i].id}
                    index={i}
                    clientRef={props.orderHistory[i].clientRef}
                    dateOfOrder={props.orderHistory[i].dateOfOrder}
                    whenClicked={() => props.whenClicked(props.orderHistory[i].id)}
                />
            );
        }
        return ordersToShow;
    }


    return (
        <Row className="pl-2-6 pt-2 pb-3">
            {createOrdersToShow()}
        </Row>
    );
}