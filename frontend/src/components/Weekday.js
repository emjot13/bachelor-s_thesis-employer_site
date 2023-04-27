import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"

export default function Weekday() {

  const { user, signOut } = useAuth()
  const [error, setError] = useState("")
  const [WeekdayEmployeeInfo, setWeekdayEmployeeInfo] = useState(null);
  const [Weekday, setWeekday] = useState("Monday");

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
                <Card className="w-300" style={{ maxWidth: "1200px" }}>
                    <Card.Body>
                    <Navbar>
                    <Button onClick ={() => {setWeekday("Monday")}}>Mon</Button>
                    <Button onClick ={() => {setWeekday("Tuesday")}}>Tue</Button>
                    <Button onClick ={() => {setWeekday("Wednesday")}}>Wed</Button>
                    <Button onClick ={() => {setWeekday("Thursday")}}>Thu</Button>
                    <Button onClick ={() => {setWeekday("Friday")}}>Fri</Button>
                    </Navbar>
                        all {Weekday} graph
                    </Card.Body>
                </Card>
                <Card className="w-100" style={{ maxWidth: "800px" }}>
                    <Card.Body>
                        weekday graph
                    </Card.Body>
                </Card >
            </div> 
        </>
    )
}