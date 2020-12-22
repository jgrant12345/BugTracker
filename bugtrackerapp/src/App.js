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

   mapsListOfBugs = () =>{
    return(
      <div><h1>Toipcs</h1>
      <ul>
        {this.state.bugsArray.map(({ID,Title}) => (
          <li key = {ID}>
            <Link to =  {`/bugsIssue/${ID}`}>{Title}</Link>
          </li>
        ))}
      </ul>
      </div>
    )
  }

   descriptionOfBug = ({match}) => {
// If I don't throw it into a try catch, there seems to be a bug if I reload on one 
// of the issues
try{
  var topic = this.state.bugsArray.find(({ID}) => ID == match.params.ID)
    
    return (
      <div>
      <div>{topic['ID']}</div>
      <div>{topic['Title']}</div>
      </div>
    )
}
catch{
  return(
<div>nvm</div>
  )

}

  
    
  }

   

  render(){
    return (
      <Router>
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><Link to = "/bugs">topics</Link></li>
        </ul>
        <hr />
        <Route path = {"/bugs"} component = {this.mapsListOfBugs}></Route>
        

        <Route path = {`/bugsIssue/:ID`} component = {this.descriptionOfBug}></Route>
      </Router>
     );
  }
  
}

export default App;
