import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from './AppLayout';
import { List } from './List';
import { Create } from './Create';
import { Show } from './Show';
import { Abilitys } from './Abilitys';
import { Races } from './Races';
import { Classes } from './Classes';
import { Skills } from './Skills';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById());
root.render(
<BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="create" element={<Create />} />
          <Route path="list" element={<List />} />
          <Route path='/:charId' element={<Show />} />
          <Route path='/abilitys/:charId' element={<Abilitys />} />
          <Route path='/race/:charId' element={<Races />} />
          <Route path='/class/:charId' element={<Classes />} />
          <Route path='/skill/:charId' element={<Skills />} />
        </Route>
      </Routes>
    </BrowserRouter>
);
