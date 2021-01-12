import './App.css';
import BugReport from './BugReport'
import React, {useState, useEffect} from 'react';
import { render } from '@testing-library/react';
import PaginatedTable from './PaginateTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
 

// New Idea: Title ,Type, Status, Priority, and Description, 
 class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bugsArray: [{"Completed": 1,
                  "Description": "hi",
                  "ID": 0,
                  "Title":"Title"}],
      isCheckBoxChecked: false
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
      </div>
    )
  }



 onClickCheckBox(checked,topic){
  console.log(checked)
  console.log("not checked", checked)
  var ID = topic['ID']

  // TODO: call put here to update database of change in completion of task
  fetch("/update", {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"Completed":!checked['Completed'],
    "ID": ID}),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch((error) => console.log("Error: ", error))
}



  // When users click on the bug link, this will further explain the bug in detail
  descriptionOfBug = ({match}) => {
    // topic uses the IDs to find the directory that the bug description is located in 
    var topic = this.state.bugsArray.find(({ID}) => ID == match.params.ID)
    var boxIsChecked = this.state.bugsArray.find(({ID}) => ID == match.params.ID)

  var x = 24
    try{
      var checked = boxIsChecked["Completed"]
      return(
        <div>
          {topic["Description"]}
          {/* Will check if bug is completed or not */}
          <input 
            type = "checkbox" 
            defaultChecked = {(checked) ? 1: 0} 
            onClick = {() =>this.onClickCheckBox(boxIsChecked, topic)}
          />
        </div> 
      )
    } catch {
        return(
          <div>
            There is an error check the function descripitonOfBug in the App.js file
          </div>
        )
    }
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
          <Route path = {"/ReportBug"} component = {BugReport}></Route>
          <Route exact path="/" component = {this.Home}></Route>
          <Route path = {`/bugsIssues/:ID`} component = {this.descriptionOfBug}></Route>
        </Switch>
      </Router>
      </div>
     );
  }
  
}

export default App;
