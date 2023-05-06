import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import CanvasJSReact from '../assets/canvasjs.react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Oneday() {

    const { user, signOut } = useAuth()
    const [error, setError] = useState("")
    const [OnedayEmployeeInfo, setOnedayEmployeeInfo] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    var dataPoints =[
        { label: "8:00",  y: 20  },
        { label: "9:00", y: 15  },
        { label: "10:00", y: 14  },
        { label: "11:00",  y: 14  },
        { label: "12:00",  y: 18  },
        { label: "13:00",  y: 19  },
        { label: "14:00",  y: 22  },
        { label: "15:00",  y: 25  }
      ]
  
    const fetchOnedayEmployeeInfo = async () => {
      try {
        await axios.get(`/admin/${user.uid}`).then(
          response => setOnedayEmployeeInfo(response.data)
        )
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      fetchOnedayEmployeeInfo();
    }, [user]);

    const options = {
        theme: "light2",
        title: {
            text: startDate.getDate() + "day fatigue"
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