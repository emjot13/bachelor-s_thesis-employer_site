import React, { useState, useEffect } from "react"
import { Button, Card, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';

export default function Weather() {

    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const { user, signOut } = useAuth()
    const [weatherEmployeeInfo, setWeatherEmployeeInfo] = useState(null);
    const [Weather, setWeather] = useState("All");
    const [dataPoints, setDataPoints] = useState([])
    
    const fetchWeatherEmployeeInfo = async () => {
      try {
        await axios.get(`/admin/${user.uid}/weather`).then(
          response => {
            console.log(response)
            setWeatherEmployeeInfo(response.data)
          }
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
            text: Weather + " fatigue"
        },
        data: [{
            type: "column",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.00",
            dataPoints: dataPoints
        }]
    }

    const handleClick = (weather) => {
      let values = [
        { label: "8:00",  y: 0},
        { label: "9:00", y: 0},
        { label: "10:00", y: 0},
        { label: "11:00",  y: 0},
        { label: "12:00",  y: 0},
        { label: "13:00",  y: 0},
        { label: "14:00",  y: 0},
        { label: "15:00",  y: 0}
      ]
      let average_hour_list = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
      if (weather === "All"){
        let allDataPoints = [
          { label: "sunny",  y: weatherEmployeeInfo.average.sunny[0]  },
          { label: "cloudy", y: weatherEmployeeInfo.average.cloudy[0]  },
          { label: "foggy",  y: weatherEmployeeInfo.average.foggy[0]  },
          { label: "rainy", y: weatherEmployeeInfo.average.rainy[0]  },
          { label: "snowy",  y: weatherEmployeeInfo.average.snowy[0]  }]
        setDataPoints(allDataPoints)
      } else {
        weatherEmployeeInfo.hourly[weather.toLowerCase()].forEach(day => {
          let count = 0
          day.hours.forEach(hour => {
            if(hour.hour !== 16){
              average_hour_list[count][0] += hour.increase_sleep + hour.increase_yawns
              average_hour_list[count][1] += 1
              count += 1
            }
          })
        });
        let count = 0
        average_hour_list.forEach(hour => {
          values[count].y = hour[0] / hour[1]
          count += 1
        }) 
        setDataPoints(values)
      }
    }
    
    return (
        <>
        <Card>
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Button onClick={Back}>
                    Back
                </Button>
                <div style={{ paddingLeft: "15px", fontWeight: "bold"}}>Select the weather to check the average fatigue of all employees in a given weather!</div>
            </Card.Body>
        </Card>
            <div className="w-100" style={{ maxWidth: "800px" }}>
            <Card className="d-flex align-items-center">
                <Card.Body style={{ minWidth: "800px" }}>
                    <Navbar className="d-flex align-items-center justify-content-between">
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("All");handleClick("All")}}>All</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Sunny");handleClick("Sunny")}}>Sunny</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Cloudy");handleClick("Cloudy")}}>Cloudy</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Rainy");handleClick("Rainy")}}>Rainy</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Foggy");handleClick("Foggy")}}>Foggy</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Snowy");handleClick("Snowy")}}>Snowy</Button>
                    </Navbar>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <CanvasJSChart options = {options} />
                </Card.Body>
            </Card>
            </div>
        </>
      )
}