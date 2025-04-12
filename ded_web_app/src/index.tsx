// main.tsx o index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import { Ability } from './pages/Ability';
import { AppLayout } from './pages/AppLayout';
import { Attack } from './pages/Attack';
import { Classes } from './pages/Classes';
import { Create } from './pages/Create';
import { Feats } from './pages/Feats';
import { Fight } from './pages/Fight';
import { Items } from './pages/Items';
import { List } from './pages/List';
import { Magic } from './pages/Magic';
import { Races } from './pages/Races';
import { Show } from './pages/Show';
import { Skills } from './pages/Skills';


// Tipizzazione opzionale per le rotte (non obbligatoria ma consigliata in progetti grandi)
const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "list", element: <List /> },
      { path: "fight", element: <Fight /> },
      { path: "create", element: <Create /> },
      { path: ":charId", element: <Show /> },
      { path: "ability/:charId", element: <Ability /> },
      { path: "race/:charId", element: <Races /> },
      { path: "class/:charId", element: <Classes /> },
      { path: "skill/:charId", element: <Skills /> },
      { path: "feat/:charId", element: <Feats /> },
      { path: "item/:charId", element: <Items /> },
      { path: "attack/:charId", element: <Attack /> },
      { path: "magic/:charId", element: <Magic /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
