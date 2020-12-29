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
  const[count, setCount] = useState([{"Completed":0,
  "Description": "hi",
  "ID": 1,
  "Title":"Title"}])

  useEffect(() => {
    setCount(props.data)
  })
  
  
  return (
   <div>
     <table>
       <tr>
         <th>Title</th>
         <th>Description</th>
         <th>Status</th>
       </tr>
       {count.map(({Description,ID,Title, Completed}) => ((
         <tr>
         <td> <Link to =  {`/bugsIssues/${ID}`}>{Title}</Link></td>
        <td>{Completed}</td>
       
         </tr>
        
       
         )))}
     </table>
   </div>
  );
}