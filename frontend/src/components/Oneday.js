import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"

export default function Oneday() {

    const { user, signOut } = useAuth()
    const [error, setError] = useState("")
    const [OnedayEmployeeInfo, setOnedayEmployeeInfo] = useState(null);
    const { date, setDate } = useState(new Date())
  
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
                <input type="date"></input>
            </Card.Body>
        </Card>
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <Card>
                    <Card.Body>
                        oneday {date} graph
                    </Card.Body>
                </Card>
            </div>
        </Container>
        </>
    )
}