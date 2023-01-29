import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [testlist,settestlist] = useState([]);

useEffect(()=>{
  fetch("http://localhost:8080/hello",{
    method: 'POST', //*GET, POST, PUT, DELETE, etc.
})
.then((response) => response.json())
  .then((data) => {
    settestlist(data)
});
},[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {
            testlist.map((name:String)=>{
              return <p>
                {name}
              </p>
            })
          }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
