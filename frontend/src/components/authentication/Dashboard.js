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

  const fetchEmployerInfo = async () => {
    try {
      await axios.get(`/admin/${user.uid}`).then(
        response => setEmployerInfo(response.data)
      )
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEmployerInfo();
  }, [user]);


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
  console.log(employerInfo.data[0].hours)
    history.push("/weather")
}
  return (
    <>
    <Card>
    <Card.Body>
      <Navbar className="d-flex align-items-center justify-content-between">
        <Button onClick={handleButtonOne}>
          One Day Fatigue
        </Button>
        <Button onClick={handleButtonWeekday}>
          Weekday Fatigue
        </Button>
        <Button onClick={handleButtonWeather}>
          Weather Fatigue
        </Button>
      </Navbar>
    </Card.Body>
    </Card>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Main Page</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {user.email}
          {employerInfo && (
            <div>
              <strong>Employees Number:</strong> {employerInfo.data[0].hours[0].sleep}
            </div>
          )} 
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleSignout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
