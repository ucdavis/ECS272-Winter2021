import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './routes/Home';
import Alliance from './routes/Alliance';
import Threat from './routes/Threat';
import Total_alliance from './routes/Total_alliance.js'
import Header from './components/Header';
import GDP from './routes/GDP';
import Area from './routes/Area';
import Area2 from './routes/Area2';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route path="/alliance" component={Alliance}/>
            <Route path="/threat" component={Threat}/>
            <Route path="/gdp" component={GDP}/>     
            <Route path="/area" component={Area}/> 
            <Route path="/area2" component={Area2}/>       
            <Route path="/total_alliance" component={Total_alliance}/>
            <Route path="/" exact component={Home}/>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
