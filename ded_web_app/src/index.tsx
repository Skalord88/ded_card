import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Ability } from './pages/Ability';
import { AppLayout } from './pages/AppLayout';
import { Classes } from './pages/Classes';
import { Create } from './pages/Create';
import { List } from './pages/List';
import { Races } from './pages/Races';
import { Show } from "./pages/Show";
import { Skills } from './pages/Skills';
import { Feats } from './pages/Feats';
import { Items } from './pages/Items';
import { Attack } from './pages/Attack';
import { Magic } from './pages/Magic';
import { Fight } from './pages/Fight';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route path="list" element={<List />} />
        <Route path="fight" element={<Fight />} />
        <Route path="create" element={<Create />} />
        <Route path='/:charId' element={<Show />} />
        <Route path='/ability/:charId' element={<Ability />} />
        <Route path='/race/:charId' element={<Races />} />
        <Route path='/class/:charId' element={<Classes />} />
        <Route path='/skill/:charId' element={<Skills />} />
        <Route path='/feat/:charId' element={<Feats />} />
        <Route path='item/:charId' element={<Items />} />
        <Route path='/attack/:charId' element={<Attack />} />
        <Route path='/magic/:charId' element={<Magic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
