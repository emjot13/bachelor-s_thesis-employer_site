import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';

export default function Weather() {

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
    var dataPoints =[
        { label: "Sunny",  y: 10  },
        { label: "Cloudy", y: 15  },
        { label: "Rainy", y: 25  },
        { label: "Snowy",  y: 30  }
    ];

    const { user, signOut } = useAuth()
    const [error, setError] = useState("")
    const [WeatherEmployeeInfo, setWeatherEmployeeInfo] = useState(null);
    const [Weather, setWeather] = useState("All");
    
    const fetchWeatherEmployeeInfo = async () => {
      try {
        await axios.get(`/admin/${user.uid}`).then(
          response => setWeatherEmployeeInfo(response.data)
        )
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      fetchWeatherEmployeeInfo();
    }, [user]);

    const history = useHistory()
    const Back = () => {
        history.push("/")
    }

    const options = {
        theme: "light2",
        title: {
            text: "Weather and average fatige"
        },
        data: [{
            type: "column",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.00",
            dataPoints: dataPoints
        }]
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
        
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "800px" }}>
            <Card className="d-flex align-items-center justify-content-center">
                    <Card.Body>
                    <Navbar>
                    <Button onClick ={() => {setWeather("All")}}>All</Button>
                    <Button onClick ={() => {setWeather("Sunny")}}>Sunny</Button>
                    <Button onClick ={() => {setWeather("Cloudy")}}>Cloudy</Button>
                    <Button onClick ={() => {setWeather("Rainy")}}>Rainy</Button>
                    <Button onClick ={() => {setWeather("Snowy")}}>Snowy</Button>
                    </Navbar>
                        <div className="d-flex align-items-center justify-content-center">{Weather} weather graph</div>
                        <CanvasJSChart options = {options} />
                    </Card.Body>
                </Card>
            </div>
        </Container>
        </>
      )
}