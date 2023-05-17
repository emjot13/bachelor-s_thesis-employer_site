import React, { useState, useEffect } from "react"
import { Button, Card, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';

export default function Weather() {

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const { user, signOut } = useAuth()
    const [WeatherEmployeeInfo, setWeatherEmployeeInfo] = useState(null);
    const [Weather, setWeather] = useState("All");
    const [dataPoints, setDataPoints] = useState([])
    
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
            text: Weather + " fatige"
        },
        data: [{
            type: "column",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.00",
            dataPoints: dataPoints
        }]
    }

    const handleClick = (day) => {
        switch (day) {
          case "All":
            setDataPoints([
              { label: "Sunny",  y: 7  },
              { label: "Cloudy", y: 10  },
              { label: "Rainy", y: 13  },
              { label: "Snowy",  y: 15  }
            ])
            break;
          case "Sunny":
            setDataPoints([
              { label: "8:00",  y: 13  },
              { label: "9:00", y: 11  },
              { label: "10:00", y: 9  },
              { label: "11:00",  y: 8  },
              { label: "12:00",  y: 8  },
              { label: "13:00",  y: 12  },
              { label: "14:00",  y: 14  },
              { label: "15:00",  y: 16  }
            ])
            break;
          case "Cloudy":
            setDataPoints([
              { label: "8:00",  y: 19  },
              { label: "9:00", y: 17  },
              { label: "10:00", y: 15  },
              { label: "11:00",  y: 14  },
              { label: "12:00",  y: 14  },
              { label: "13:00",  y: 16  },
              { label: "14:00",  y: 17  },
              { label: "15:00",  y: 20  }
            ])
            break;
          case "Rainy":
            setDataPoints([
              { label: "8:00",  y: 1  },
              { label: "9:00", y: 1  },
              { label: "10:00", y: 5  },
              { label: "11:00",  y: 4  },
              { label: "12:00",  y: 4  },
              { label: "13:00",  y: 6  },
              { label: "14:00",  y: 7  },
              { label: "15:00",  y: 1  }
            ])
            break;
          case "Snowy":
            setDataPoints([
              { label: "8:00",  y: 1  },
              { label: "9:00", y: 1  },
              { label: "10:00", y: 5  },
              { label: "11:00",  y: 1  },
              { label: "12:00",  y: 1  },
              { label: "13:00",  y: 1  },
              { label: "14:00",  y: 7  },
              { label: "15:00",  y: 1  }
            ])
            break;
          default:
            break;
        }
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
            <div className="w-100" style={{ maxWidth: "800px" }}>
            <Card className="d-flex align-items-center">
                <Card.Body style={{ minWidth: "800px" }}>
                    <Navbar className="d-flex align-items-center justify-content-between">
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("All");handleClick("All")}}>All</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Sunny");handleClick("Sunny")}}>Sunny</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Cloudy");handleClick("Cloudy")}}>Cloudy</Button>
                    <Button style={{ width: "100%", marginRight: "5px"}} onClick ={() => {setWeather("Rainy");handleClick("Rainy")}}>Rainy</Button>
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