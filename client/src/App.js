import './App.css';
import {useState, useEffect} from 'react'
import MainPage from './components/MainPage'
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
function App() {
  const [user, setUser] = useState({});
  
  useEffect(()=>{
     const getData = async() =>{
      const data = await fetch('http://localhost:5000/');
      const user = await data.json();
      setUser(user)
    }

    getData();
    
  },[])
  
  
  Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  return (
    <Router>
      <Switch>
        <Route exact path = "/"> 
          <div className="App">
           {Object.size(user) === 0 ? <MainPage/> : 'logged in'}
          </div>
        </Route>
        <Route exact path = "/login"> 
             <Login> </Login>
        </Route>
        <Route exact path = "/Register"> 
             <Register> </Register>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
