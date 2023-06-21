import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Navbar } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"



export default function Dashboard() {
  const [error, setError] = useState("")
  const { user, signOut } = useAuth()
  const [employerInfo, setEmployerInfo] = useState(null);
  const history = useHistory()

  // const fetchEmployerInfo = async () => {
  //   try {
  //     await axios.get(`/admin/${user.uid}`).then(
  //       response => setEmployerInfo(response.data)
  //     )
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchEmployerInfo();
  // }, [user]);


  const handleSignout = async () => {
    setError("")
    try {
      await signOut()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  const handleButtonOne = () => {
    history.push("/oneday")
  }
  const handleButtonWeekday = () => {
    history.push("/weekday")
  }
  const handleButtonWeather = () => {
    history.push("/weather")
  }
  return (
    <div style={{ paddingTop: "8vh" }}>
      <div className="d-flex flex-wrap justify-content-end fixed-top" style={{ marginTop: '9rem', marginRight: '2.5rem'}}>
        <div style={{border: "5px aliceblue solid", borderRadius: "30px", padding: "0.8rem"}}>
        <div className="w-100 text-center" style={{marginBottom: '1rem' }}><strong>Email:</strong> {user.email}</div>
        <Link to="/update-profile" style={{marginBottom: '1rem', paddingLeft: "2rem", paddingRight: "2rem" }} className="btn btn-primary w-100 mt-1">
          Update Profile
        </Link>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleSignout} style={{marginTop: '0' }}>
            Log Out
          </Button>
        </div>
        </div>
      </div>
      <Card style={{marginBottom: '5rem' }}>
        <Card.Body>
          <Navbar className="d-flex align-items-center justify-content-between">
            <Button onClick={handleButtonOne}>
              Single day fatigue
            </Button>
            <Button onClick={handleButtonWeekday}>
              Fatigue by weekday
            </Button>
            <Button onClick={handleButtonWeather}>
              Fatigue by weather
            </Button>
          </Navbar>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h4 className="text-center mb-4 mt-4">Hello!</h4>

          <h5 className="text-center mb-4 mt-4">Here you can look for anonymized and agregated statistics of your employees' tiredness.</h5>
          <h5 className="text-center mb-4 mt-4">Hopefully it will help you better understand your workplace dynamics.</h5>
	  <h5 className="text-center mb-4 mt-4">Choose one of the buttons above and see when your employees feel the most tired!</h5>
          {error && <Alert variant="danger">{error}</Alert>}

        </Card.Body>
      </Card>
    </div>
  )
}
