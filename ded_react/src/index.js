import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from './AppLayout';
import { List } from './List';
import { Create } from './Create';
import { Show } from './Show';
import { Classes } from './Classes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="create" element={<Create />} />
          <Route path="list" element={<List />} />
          <Route path='/:charId' element={<Show />} />
          <Route path='class/:charId' element={<Classes />} /> 
        </Route>
      </Routes>
    </BrowserRouter>

);