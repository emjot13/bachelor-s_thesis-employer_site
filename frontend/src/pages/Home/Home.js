// import React, { useState } from 'react';
import Coffee from '../../components/Coffee';
import AuthApp from '../../components/authentication/AuthApp';


function WelcomeScreen() {

  return (
    <>
      <header className="bg-dark text-white py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>Fatigue Tracker</h1>
            </div>
            <div className="col-md-6">
              <nav className="d-flex justify-content-end">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item"><a href="#" className="text-white">Home</a></li>
                  <li className="list-inline-item"><a href="#" className="text-white">About</a></li>
                  <li className="list-inline-item"><a href="#" className="text-white">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Coffee/>
      <AuthApp/>

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
  );
};

export default WelcomeScreen;
