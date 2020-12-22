import './App.css';
import React, {useState, useEffect} from 'react';
import { render } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 

 function hi() {
  return(
    <div>hello</div>
  )
 }


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bugsArray: []
    }
  }

    componentDidMount =() => {
    fetch("/test")
    .then(response => response.json())
    .then(data => {
     
     var tempBugsArray = [];
     for(var index in data){
       var object = {
         "Completed": data[index]["Completed"],
         "Description": data[index]["Description"],
         "ID": data[index]["ID"],
         "Title": data[index]["Title"]
       }
       tempBugsArray.push(object)
     }
      
      this.setState({
        bugsArray:tempBugsArray
      })
     
    })
    
    
  
    
    }

   hello = () =>{
    console.log(this.state.bugsArray)
    return(
     
      <div>
        {this.state.bugsArray.map((array) =>{
        return(<div>{array['Completed']}
        {array['Description']}</div>)
      })}</div>
    )
  }

   

  render(){
   
    return (
    
      <Router>
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><Link to = "/bugs">topics</Link></li>
        </ul>
        <hr />
        <Route path = {"/bugs"} component = {this.hello}></Route>

      </Router>
     );
  }
  
}

export default App;
