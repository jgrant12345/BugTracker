import './App.css';
import React, {useState, useEffect} from 'react';
import { render } from '@testing-library/react';
import PaginatedTable from './table';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
 

 function hi() {
  return(
    <div>hello</div>
  )
 }

// New Idea: Title ,Type, Status, Priority, and Description, 
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bugsArray: [{"Completed":1,
                  "Description": "hi",
                  "ID": 0,
                  "Title":"Title"}]
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
    // in the topics directory, it lists the posted bugs
   mapsListOfBugs = () => {
    return(
      <div>
        <PaginatedTable data = {this.state.bugsArray}/>
        <h1>Topics</h1>
        <ul>
          {this.state.bugsArray.map(({ID,Title}) => (
            <li key = {ID}>
              <Link to =  {`/bugsIssues/${ID}`}>{Title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  // When users click on the bug link, this will further explain the bug in detail
  descriptionOfBug = ({match}) => {
    // topic uses the IDs to find the directory that the bug description is located in 
  var topic = this.state.bugsArray.find(({ID}) => ID == match.params.ID)
    try{
      return(
        <div>{topic["Description"]}</div> 
      )
    } catch {
        return(
          <div>
            hi
          </div>
        )
    }
    


  
    
  }
  BugReport = () => {
    return(
      <div>Bug ReportBug</div>
    )
  }

  Home2 = () =>{
    return(<div>sigh</div>)
  }

   

  render(){
    return (
      <div>
      <Router>
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><Link to = "/bugs">topics</Link></li>
          <li><Link to = "/ReportBug">ReportBug</Link></li>
        </ul>
        <hr />
        <Switch>
          <Route path = {"/bugs"} component = {this.mapsListOfBugs}></Route>
          <Route path = {"/ReportBug"} component = {this.BugReport}></Route>
          <Route exact path="/" component = {this.Home}></Route>
          <Route path = {`/bugsIssues/:ID`} component = {this.descriptionOfBug}></Route>
        </Switch>
      </Router>
      </div>
     );
  }
  
}

export default App;
