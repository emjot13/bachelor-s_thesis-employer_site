import React, { useState, useEffect } from "react"
import { Button, Card, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';

export default function Weekday() {

  const { user, signOut } = useAuth()
  const [WeekdayEmployeeInfo, setWeekdayEmployeeInfo] = useState(null);
  const [Weekday, setWeekday] = useState("Weekday");
  const [dataPoints, setDataPoints] = useState([])
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    theme: "light2",
    title: {
        text: Weekday + " fatige"
    },
    data: [{
        type: "column",
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0.00",
        dataPoints: dataPoints
    }]
}

  const fetchWeekdayEmployeeInfo = async () => {
    try {
      await axios.get(`/admin/${user.uid}/weekday`).then(
        response => setWeekdayEmployeeInfo(response.data)
      )
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeekdayEmployeeInfo();
  }, [user]);

    const history = useHistory()
    const Back = () => {
        history.push("/")
    }
    const handleClick = (day) => {
      setDataPoints([
        { label: "8:00",  y: (WeekdayEmployeeInfo.data[day][8].avg_sleep + WeekdayEmployeeInfo.data[day][8].avg_yawns)},
        { label: "9:00", y: (WeekdayEmployeeInfo.data[day][9].avg_sleep + WeekdayEmployeeInfo.data[day][9].avg_yawns)},
        { label: "10:00", y: (WeekdayEmployeeInfo.data[day][10].avg_sleep + WeekdayEmployeeInfo.data[day][10].avg_yawns)},
        { label: "11:00",  y: (WeekdayEmployeeInfo.data[day][11].avg_sleep + WeekdayEmployeeInfo.data[day][11].avg_yawns)},
        { label: "12:00",  y: (WeekdayEmployeeInfo.data[day][12].avg_sleep + WeekdayEmployeeInfo.data[day][12].avg_yawns)},
        { label: "13:00",  y: (WeekdayEmployeeInfo.data[day][13].avg_sleep + WeekdayEmployeeInfo.data[day][13].avg_yawns)},
        { label: "14:00",  y: (WeekdayEmployeeInfo.data[day][14].avg_sleep + WeekdayEmployeeInfo.data[day][14].avg_yawns)},
        { label: "15:00",  y: (WeekdayEmployeeInfo.data[day][15].avg_sleep + WeekdayEmployeeInfo.data[day][15].avg_yawns)}
      ])
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
            <div className="w-100" style={{ minWidth: "800px" }}>
                <Card className="w-300" style={{ maxWidth: "1200px" }}>
                    <Card.Body>
                    <Navbar className="d-flex align-items-center justify-content-between">
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeekday("Monday");handleClick("Monday")}}>Mon</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeekday("Tuesday");handleClick("Tuesday")}}>Tue</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeekday("Wednesday");handleClick("Wednesday")}}>Wed</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeekday("Thursday");handleClick("Thursday")}}>Thu</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeekday("Friday");handleClick("Friday")}}>Fri</Button>
                    </Navbar>
                    </Card.Body>
                </Card>
                <Card className="w-100" style={{ maxWidth: "800px" }}>
                    <Card.Body>
                        <CanvasJSChart options = {options} />
                    </Card.Body>
                </Card >
            </div> 
        </>
    )
}