import './App.css';
import React, {useState, useEffect} from 'react';
 
function App() {

  fetch("/test")
    .then(response => response.json())
    .then(data => console.log(data))
  
  console.log("hi");
  
  return (
   <div>hello</div>
  
  );
}

export default App;
