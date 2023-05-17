import React from "react"
import Signup from "./Signup"
import { Container,Button } from "react-bootstrap"
import { AuthProvider } from "../../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Oneday from "../Oneday"
import Weather from "../Weather"
import Weekday from "../Weekday"
import { useHistory } from 'react-router-dom';
import Coffee from '../../components/Coffee';

function AuthApp() {
  const history = useHistory()
  const Back = () => {
      history.push("/")
  }

  return (
    <>
    <header className="bg-dark text-white py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>Fatigue Tracker</h1>
            </div>
            {/* <div className="col-md-6">
              <nav className="d-flex justify-content-end">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item"><a href={homeURL} className="text-white">Home</a></li>
                  <li className="list-inline-item"><a href="#" className="text-white">About</a></li>
                  <li className="list-inline-item"><a href="#" className="text-white">Contact</a></li>
                </ul>
              </nav>
            </div> */}
          </div>
        </div>
      </header>
    <Coffee/>
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", marginTop: "5%" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/weather" component={Weather} />  
              <PrivateRoute exact path="/weekday" component={Weekday} />
              <PrivateRoute exact path="/oneday" component={Oneday} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
    <main className="d-flex flex-column align-items-center justify-content-center" style={{ height: "90vh" }}>
        <h2 className="mb-4">Welcome to Fatigue Tracker</h2>
        <p className="lead text-center">Track your employees' fatigue levels and improve their work conditions.</p>
      </main>
      
      <footer className="bg-dark text-white py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <p>&copy; 2023 Fatigue Tracker</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AuthApp