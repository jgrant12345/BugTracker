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
  "ID": 1,
  "Title":"Title"}])
  const[page, setPage] = useState(0)
  const[sliceBy,setSliceBy] = useState(6)

  useEffect(() => {
    setIssues(props.data)
  })

  function increment() {
    if(page <= props.data.length ){
      console.log("page =",page)
      setPage(page+1);
    }
   
  } 

  function Decrement() {
    if(page > 0){
      setPage(page-1);
    }
    
  } 
  
  
  return (
   <div>
    <table>
      {/* The headers of the table */}
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
      {Issues.slice(page,page+sliceBy).map(({Description,ID,Title, Completed}) => ((
        <tr>
          <td> <Link to =  {`/bugsIssues/${ID}`}>{Title}</Link></td>
          <td>{Completed}</td>
        </tr>
      )))}
    </table>
        <button onClick = {() =>Decrement()}>Before</button>
        <button onClick = {() => increment()}>Next</button>

   </div>
  );
}