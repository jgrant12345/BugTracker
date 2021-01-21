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
                  "_id": 0,
                  "Title":"Title"}],
      isCheckBoxChecked: false
    }
  }

    componentDidMount = () => {
      fetch("/posts")
      .then(response => response.json())
      .then(data => {
        var tempBugsArray = [];
        for(var index in data){
          var object = {
            "Completed": data[index]["Completed"],
            "Description": data[index]["Description"],
            "_id": data[index]["_id"],
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



 onClickCheckBox(checked,topic) {
  var _id = topic['_id']

  // TODO: call put here to update database of change in completion of task
  fetch(`/posts/${_id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"Completed": !checked['Completed'],
    "_id": _id}),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch((error) => console.log("Error: ", error))
  document.location.reload()
}



  // When users click on the bug link, this will further explain the bug in detail
  descriptionOfBug = ({match}) => {
    // topic uses the IDs to find the directory that the bug description is located in 
    var topic = this.state.bugsArray.find(({_id}) => _id == match.params._id)
    var boxIsChecked = this.state.bugsArray.find(({_id}) => _id == match.params._id)
    try{
      console.log(topic)
      var checked = boxIsChecked["Completed"]
      return(
        <div>
          {topic["Description"]}
          {/* Will check if bug is completed or not */}
          <input 
            type = "checkbox" 
            defaultChecked = {(checked) ? 1: 0} 
            onClick = {() => this.onClickCheckBox(boxIsChecked, topic)}
          />
        </div> 
      )
    } catch {
        return(
          <div></div>
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
          <Route path = {`/bugsIssues/:_id`} component = {this.descriptionOfBug}></Route>
        </Switch>
      </Router>
      </div>
     );
  }
  
}

export default App;
