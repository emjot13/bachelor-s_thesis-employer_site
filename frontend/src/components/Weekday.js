import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

export default function Weekday() {

    //     const [error, setError] = useState("")
//   const { user, signOut } = useAuth()
//   const [employerInfo, setEmployerInfo] = useState(null);
//   const history = useHistory()

//   const fetchEmployerInfo = async () => {
//     try {
//       await axios.get(`/admin/${user.uid}`).then(
//         response => setEmployerInfo(response.data)
//       )
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchEmployerInfo();
//   }, [user]);

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
        
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <Card>
                    <Card.Body>
                        weekday graph
                    </Card.Body>
                </Card>
            </div>
        </Container>
        </>
    )
}