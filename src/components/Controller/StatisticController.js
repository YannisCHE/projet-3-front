import React, { useContext, useState, useEffect } from "react";
import StatisticView from "../View/StatisticView";
import { myContext } from "../..";
import { getBackUrl } from "./backUrl";

export default function StatisticController() {

    const [user, setUser] = useContext(myContext);
    const backUrl = `${getBackUrl()}`;
    const [data, setData] = useState();
    const [dataType, setDataType] = useState();

    

    function fetchMeanCorrection() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        }
        fetch(`${backUrl}/statistic/mean/corrections`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                const tempData = json.map(item => ({
                    name: item.year.toString(),
                    moyenne: item.meanCorrection
                }));
                setData(tempData);
                setDataType("dioptrie")
            })
            .catch(error => {
                console.error("Error fetching the data for the corrections:", error);
            });
    }

    function fetchSumSales() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        }
        fetch(`${backUrl}/statistic/sum/sales`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                const tempData = json.map(item => ({
                    name: item.year.toString(),
                    euros: item.sumSales
                }));
                setData(tempData);
                setDataType("euros")
            })
            .catch(error => {
                console.error("Error fetching the data for the sales:", error);
            });
    }

    return (
        <StatisticView
            data={data}
            dataType={dataType}
            fetchMeanCorrection={() => fetchMeanCorrection()}
            fetchSumSales={() => fetchSumSales()}
        />
    );
}