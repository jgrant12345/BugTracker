import React, {useEffect, useState} from 'react';
import './tablestyle.css' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { Title } from '@material-ui/icons';

export default function PaginatedTable(props) {
  const[Issues, setIssues] = useState([{"Completed":0,
  "Description": "hi",
  "_id": 1,
  "Title":"Title"}])
  const[page, setPage] = useState(0)
  const[sliceBy,setSliceBy] = useState(6)

  useEffect(() => {
    setIssues(props.data)
  })

  function increment() {
    var lastPage = Math.ceil((props.data.length / sliceBy))
    if(page <= props.data.length - sliceBy - 1){
      console.log("page = ",page)
      setPage(page+sliceBy);
    }
   
  } 

  function Decrement() {
    if(page > 0){
      setPage(page-sliceBy);
    }
    
  } 
  
  
  return (
   <div>
    <table className = "contentTable">
      {/* The headers of the table */}
      <thead>
      <tr className = "TableRow">
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
      </thead>
      {Issues.slice(page,page+sliceBy).map(({Description,_id,Title, Completed}) => ((
        <tbody>
        <tr className = "TableRowBody">
          <td> <Link to =  {`/bugsIssues/${_id}`}>{Title}</Link></td>
          <td className = "Description">{Description}</td>
          <td>{Completed}</td>
        </tr>
        </tbody>
      )))}
    </table>
        <button onClick = {() => Decrement()}>Before</button>
        <button onClick = {() => increment()}>Next</button>

   </div>
  );
}