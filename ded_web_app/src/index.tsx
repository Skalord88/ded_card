import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Abilitys } from './pages/Abilitys';
import { AppLayout } from './pages/AppLayout';
import { Classes } from './pages/Classes';
import { Create } from './pages/Create';
import { List } from './pages/List';
import { Races } from './pages/Races';
import { Show } from "./pages/Show";
import { Skills } from './pages/Skills';
import { Feats } from './pages/Feats';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route path="list" element={<List />} />
        <Route path="create" element={<Create />} />
        <Route path='/:charId' element={<Show />} />
        <Route path='/abilitys/:charId' element={<Abilitys />} />
        <Route path='/race/:charId' element={<Races />} />
        <Route path='/class/:charId' element={<Classes />} />
        <Route path='/skill/:charId' element={<Skills />} />
        <Route path='/feat/:charId' element={<Feats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
