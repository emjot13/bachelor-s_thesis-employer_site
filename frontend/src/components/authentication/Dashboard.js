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
    <div style={{paddingTop: "8vh"}}>
    <Card>
    <Card.Body>
      <Navbar className="d-flex align-items-center justify-content-between">
        <Button onClick={handleButtonOne}>
          Single Day Fatigue
        </Button>
        <Button onClick={handleButtonWeekday}>
          Fatigue by Weekday
        </Button>
        <Button onClick={handleButtonWeather}>
          Fatigue by Weather
        </Button>
      </Navbar>
    </Card.Body>
    </Card>
      <Card>
        <Card.Body>
          <h5 className="text-center mb-4 mt-4">Choose one of the buttons above to see the fatigue statistics</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="d-flex flex-wrap justify-content-end fixed-top" style={{marginTop: '13rem', marginRight: '5rem'}}> 
            <div className="w-100 text-right" style={{marginRight: '3rem', marginBottom: '0.3rem'}}><strong>Email:</strong> {user.email}</div>
          <Link to="/update-profile" className="btn btn-primary col-1">
            Update Profile
          </Link>
          <div className="w-100 text-right mt-2" style={{marginRight: '2.5rem', marginBottom: '0.3rem'}}>
        <Button variant="link" onClick={handleSignout}>
          Log Out
        </Button>
      </div>
          </div>
          
        </Card.Body>
      </Card>
    </div>
  )
}
