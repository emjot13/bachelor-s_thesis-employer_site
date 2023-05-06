import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';

export default function Weekday() {

  const { user, signOut } = useAuth()
  const [error, setError] = useState("")
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
      await axios.get(`/admin/${user.uid}`).then(
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
      switch (day) {
        case "Monday":
          setDataPoints([
            { label: "8:00",  y: 20  },
            { label: "9:00", y: 15  },
            { label: "10:00", y: 14  },
            { label: "11:00",  y: 14  },
            { label: "12:00",  y: 18  },
            { label: "13:00",  y: 19  },
            { label: "14:00",  y: 22  },
            { label: "15:00",  y: 25  }
          ])
          break;
        case "Tuesday":
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
        case "Wednesday":
          setDataPoints([
            { label: "8:00",  y: 9  },
            { label: "9:00", y: 7  },
            { label: "10:00", y: 5  },
            { label: "11:00",  y: 4  },
            { label: "12:00",  y: 4  },
            { label: "13:00",  y: 6  },
            { label: "14:00",  y: 7  },
            { label: "15:00",  y: 10  }
          ])
          break;
        case "Thursday":
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
        case "Friday":
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