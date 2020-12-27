import React, {useEffect, useState} from 'react';
import './tablestyle.css'
export default function PaginatedTable(props) {
  const[count, setCount] = useState([{"Completed":1,
  "Description": "hi",
  "ID": 4,
  "Title":"Title"}])

  useEffect(() => {
    setCount(props.data)
  })
  
  console.log(props.data)
  return (
   <div>
     <table>
       <tr>
         <th>Title</th>
         <th>Description</th>
         <th>Status</th>
       </tr>
       {props.data.map((index) => ((
         <tr>
         <td>{index["Title"]}</td>
         <td>{index['Description']}</td>
         <td>{index["Completed"]}</td>

         </tr>
         )))}
     </table>
   </div>
  );
}