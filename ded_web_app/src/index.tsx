import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from './pages/AppLayout';
import { Create } from './pages/Create';
import { List } from './pages/List';
import { Show } from './pages/Show';
import { Abilitys } from './pages/Abilitys';
import { Races } from './pages/Races';
import { Classes } from './pages/Classes';
// import { Skills } from './pages/Skills';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(

  <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route path="list" element={<List />} />
        <Route path="create" element={<Create />} />
        <Route path='/:charId' element={<Show />} />
        <Route path='/abilitys/:charId' element={<Abilitys />} />
        <Route path='/race/:charId' element={<Races />} />
        <Route path='/class/:charId' element={<Classes />} />
        {/* <Route path='/skill/:charId' element={<Skills />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
);
