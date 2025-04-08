import React, { useEffect, useState, useContext } from "react";
import { myContext } from "../..";
import OrderView from "../View/OrderView";
import { getBackUrl } from "./backUrl";
import { useNavigate } from "react-router-dom";

export default function OrdersController() {

    const navigate = useNavigate();
    const [user, setUser] = useContext(myContext);
    const [message, setMessage] = useState("");
    const backUrl = `${getBackUrl()}`;
    const [availableLens, setAvailableLens] = useState(null);
    const [lensTypes, setLensTypes] = useState(null);
    const [lensId, setLensId] = useState(null);
    const [diameters, setDiameters] = useState(null);
    const [materials, setMaterials] = useState(null);
    const [coatings, setCoatings] = useState(null);
    const [rangeSpheres, setRangeSpheres] = useState(null);
    const [rangeCylinders, setRangeCylinders] = useState(null);
    const [rangeAdditions, setRangeAdditions] = useState(null);
    const [refractiveValues, setRefractivesValues] = useState(null);

    useEffect(() => fetchLensType(), []);
    useEffect(() => fetchDiameters(), []);
    useEffect(() => fetchMaterials(), []);
    useEffect(() => fetchCoatings(), []);

    function fetchLensType() {
        fetch(`${backUrl}/parameters/lens/type`)
            .then(response => response.json())
            .then(json => setLensTypes(json));
    }

    function fetchAvailableLens(lensType) {
        let type = "";
        if (lensType == 1) {
            type = "single/vision"
        }
        if (lensType == 2) {
            type = "progressive"
        }
        fetch(`${backUrl}/parameters/lens/${type}`)
            .then(response => response.json())
            .then(json => setAvailableLens(json));
    }

    function fetchLensRangeCorrection(lensTypeId, lensId) {
        const lens = { lensTypeId: lensTypeId, lensId: lensId }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lens)
        }
        fetch(`${backUrl}/parameters/lens/ranges`, requestOptions)
            .then(response => response.json())
            .then(json => {
                setRangeSpheres(json.spheres)
                setRangeCylinders(json.cylinders)
                setRangeAdditions(json.additions || [])
            });
    }

    function fetchDiameters() {
        fetch(`${backUrl}/parameters/diameters`)
            .then(response => response.json())
            .then(json => setDiameters(json));
    }

    function fetchMaterials() {
        fetch(`${backUrl}/parameters/materials`)
            .then(response => response.json())
            .then(json => setMaterials(json));
    }

    function fetchCoatings() {
        fetch(`${backUrl}/parameters/coatings`)
            .then(response => response.json())
            .then(json => setCoatings(json));
    }

    function fetchRefractiveValues(materialId) {

        fetch(`${backUrl}/parameters/material/${materialId}/refractive/values`)
            .then(response => response.json())
            .then(json => setRefractivesValues(json));
    }

    function placeOrder(orderFields, lensTypeFields, lensFields, refractiveValueFields) {
        console.log("user :", user)
        console.log("order :", orderFields)
        console.log("lens type :", lensTypeFields)
        console.log("lens :", lensFields)
        console.log("refractive :", refractiveValueFields)

        const rightLens = {
            sphere: orderFields.sphereOD,
            cylinder: orderFields.cylinderOD,
            axis: orderFields.axisOD,
            addition: orderFields.additionOD,

        }

        const leftLens = {
            sphere: orderFields.sphereOG,
            cylinder: orderFields.cylinderOG,
            axis: orderFields.axisOG,
            addition: orderFields.additionOG
        }

        const coatings = {
            antiScratchId: orderFields.antiScratchId,
            antiReflectionId: orderFields.antiReflectionId,
            solarId: orderFields.solarId
        }

        const order = {
            clientReference: orderFields.clientRef,
            opticianId: user.id,
            lensType: lensTypeFields.lensTypeId,
            lens: lensFields.idLens,
            diameter: orderFields.diameterId,
            material: orderFields.materialId,
            refractiveValue: refractiveValueFields.id,
            rightLens: rightLens,
            leftLens: leftLens,
            coatingsOrderAddDto: coatings
        }

        console.log("final object orders :", order)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(order)
        }
        fetch(`${backUrl}/orders/place`, requestOptions)
            .then(response => {
                if (response.ok) {
                    navigate("/welcome")
                    return null;
                } else {
                    return response.text()
                }
            })
            .then(text => setMessage(text));
    }

    return (
        <OrderView
            rangeSpheres={rangeSpheres}
            rangeCylinders={rangeCylinders}
            rangeAdditions={rangeAdditions}
            refractiveValues={refractiveValues}
            materials={materials}
            coatings={coatings}
            diameters={diameters}
            availableLens={availableLens}
            lensTypes={lensTypes}
            message={message}
            fetchRefractiveValues={(materialId) => fetchRefractiveValues(materialId)}
            fetchAvailableLens={(lensType) => fetchAvailableLens(lensType)}
            fetchLensRangeCorrection={(lensTypeId, lensId) => fetchLensRangeCorrection(lensTypeId, lensId)}
            placeOrder={(orderFields, lensTypeFields, lensFields, refractiveValueFields) =>
                placeOrder(orderFields, lensTypeFields, lensFields, refractiveValueFields)}
        />
    );
}