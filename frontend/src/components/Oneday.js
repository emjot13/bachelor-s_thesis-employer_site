import React, { useState, useEffect } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./components.css"


export default function Oneday() {

    const { user, signOut } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [dataPoints, setDataPoints] = useState([
        { label: "8:00 - 9:00",  y: 12},
        { label: "9:00 - 10:00", y: 10},
        { label: "10:00 - 11:00", y: 7},
        { label: "11:00 - 12:00",  y: 6},
        { label: "12:00 - 13:00",  y: 8},
        { label: "13:00 - 14:00",  y: 11},
        { label: "14:00 - 15:00",  y: 13},
        { label: "15:00 - 16:00",  y: 15}
      ])

    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const handleClick = async () => {
        try {
            await axios.get(`/admin/${user.uid}/oneday?date=${startDate.toISOString().split('T')[0]}`).then(
              response => {
                setDataPoints([
                { label: "8:00 - 9:00",   y: (response.data.data.hours[0].avg_increase_sleep + response.data.data.hours[0].avg_increase_yawns)},
                { label: "9:00 - 10:00", y: (response.data.data.hours[1].avg_increase_sleep + response.data.data.hours[1].avg_increase_yawns)},
                { label: "10:00 - 11:00", y: (response.data.data.hours[2].avg_increase_sleep + response.data.data.hours[2].avg_increase_yawns)},
                { label: "11:00 - 12:00",  y: (response.data.data.hours[3].avg_increase_sleep + response.data.data.hours[3].avg_increase_yawns)},
                { label: "12:00 - 13:00",  y: (response.data.data.hours[4].avg_increase_sleep + response.data.data.hours[4].avg_increase_yawns)},
                { label: "13:00 - 14:00",  y: (response.data.data.hours[5].avg_increase_sleep + response.data.data.hours[5].avg_increase_yawns)},
                { label: "14:00 - 15:00",  y: (response.data.data.hours[6].avg_increase_sleep + response.data.data.hours[6].avg_increase_yawns)},
                { label: "15:00 - 16:00",  y: (response.data.data.hours[7].avg_increase_sleep + response.data.data.hours[7].avg_increase_yawns)}
              ])}
            )
          } catch (error) {
            console.log(error);
          }
    }
    const options = {
        theme: "light2",
        title: {
		text: "Fatigue on " + startDate.toISOString().split('T')[0] + ":"
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
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Button onClick={Back}>
                    Back
                </Button>
                <div style={{ paddingLeft: "15px", fontWeight: "bold"}}>Select a day to check the average fatigue of all employees on a given day!</div>     
            </Card.Body>
        </Card>
        <Card className="d-flex align-items-center justify-content-center">
            <Card.Body style={{borderLeft:"solid lightgrey 2px", borderRight:"solid lightgrey 2px"}} className="d-flex flex-column justify-content-center align-items-center">
                <DatePicker style={{ textAlign: "center", padding: "6px 10px 5px 10px" }} showIcon dateFormat="dd/MM/yyyy" selected={startDate} portalId="root-portal" dropdownMode="select" onChange={(d) => setStartDate(d)} />
                <Button className="w-50" style={{marginTop: "15px"}} onClick={() => {handleClick()}}>Submit</Button>
            </Card.Body>
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
