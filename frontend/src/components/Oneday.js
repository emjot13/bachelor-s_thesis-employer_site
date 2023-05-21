import React, { useState, useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Oneday() {

    const { user, signOut } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [dataPoints, setDataPoints] = useState([])

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  
    const handleClick = async () => {
        try {
            await axios.get(`/admin/${user.uid}/oneday?date=${startDate.toISOString().split('T')[0]}`).then(
              response => {
                setDataPoints([
                { label: "8:00",  y: (response.data.data.hours[0].avg_increase_sleep + response.data.data.hours[0].avg_increase_yawns)},
                { label: "9:00", y: (response.data.data.hours[1].avg_increase_sleep + response.data.data.hours[1].avg_increase_yawns)},
                { label: "10:00", y: (response.data.data.hours[2].avg_increase_sleep + response.data.data.hours[2].avg_increase_yawns)},
                { label: "11:00",  y: (response.data.data.hours[3].avg_increase_sleep + response.data.data.hours[3].avg_increase_yawns)},
                { label: "12:00",  y: (response.data.data.hours[4].avg_increase_sleep + response.data.data.hours[4].avg_increase_yawns)},
                { label: "13:00",  y: (response.data.data.hours[5].avg_increase_sleep + response.data.data.hours[5].avg_increase_yawns)},
                { label: "14:00",  y: (response.data.data.hours[6].avg_increase_sleep + response.data.data.hours[6].avg_increase_yawns)},
                { label: "15:00",  y: (response.data.data.hours[7].avg_increase_sleep + response.data.data.hours[7].avg_increase_yawns)}
              ])}
            )
          } catch (error) {
            console.log(error);
          }
    }
    const options = {
        theme: "light2",
        title: {
            text: startDate.toISOString().split('T')[0] + " day fatigue"
        },
        data: [{
            type: "column",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.00",
            dataPoints: dataPoints
        }]
    }

    const history = useHistory()
    const Back = () => {
        history.push("/")
    }

    return (
        <>
        <Card>
            <Card.Body>
                <Button onClick={Back}>
                    Back
                </Button>
            </Card.Body>
        </Card>
        <Card className="d-flex align-items-center justify-content-center">
            <Card.Body>
                <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} portalId="root-portal" dropdownMode="select" onChange={(d) => setStartDate(d)} />
            </Card.Body>
            <Button onClick={() => {handleClick()}}>submit</Button>
        </Card>
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <Card>
                    <Card.Body>
                        <CanvasJSChart options = {options} />
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}