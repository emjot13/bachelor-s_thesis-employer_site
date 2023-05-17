import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/welcome.scss"
import AuthApp from './components/authentication/AuthApp';


function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div id="main" class="box">
        <AuthApp/>
      </div>
    </div>
  );
}

export default App;
