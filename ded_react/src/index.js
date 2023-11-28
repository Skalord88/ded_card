import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from './AppLayout';
import { List } from './List';
import { Create } from './Create';
import { Show } from './Show';
import { Abilitys } from './Abilitys';
import { Races } from './Races';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="create" element={<Create />} />
          <Route path="list" element={<List />} />
          <Route path='/:charId' element={<Show />} />
          <Route path='/abilitys/:charId' element={<Abilitys />} />
          <Route path='/race/:charId' element={<Races />} /> 
        </Route>
      </Routes>
    </BrowserRouter>

);