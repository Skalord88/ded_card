// main.tsx o index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import {
  CharacterListProviderRoute,
  CharacterProviderRoute
} from "./components/ModifiedCharacter/Context/CharacterProviderRoute";
import { Ability } from "./pages/Ability";
import { AppLayout } from "./pages/AppLayout";
import { Attack } from "./pages/Attack";
import { Background } from "./pages/Background";
import { Classes } from "./pages/Classes";
import { Create } from "./pages/Create";
import { Feats } from "./pages/Feats";
import { Fight } from "./pages/Fight";
import { Items } from "./pages/Items";
import { List } from "./pages/List";
import { Magic } from "./pages/Magic";
import { Races } from "./pages/Races";
import { Show } from "./pages/Show";
import { Skills } from "./pages/Skills";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* <Route element={<CharacterListProviderRoute />}> */}
          <Route element={<CharacterListProviderRoute />}>
            <Route path="list" element={<List />} />
            <Route path="fight" element={<Fight />} />
          </Route>
          <Route path="create" element={<Create />} />

          <Route path=":charId" element={<CharacterProviderRoute />}>
            <Route index element={<Show />} />
            <Route path="race" element={<Races />} />
            <Route path="background" element={<Background />} />
            <Route path="ability" element={<Ability />} />
            <Route path="class" element={<Classes />} />
            <Route path="feat" element={<Feats />} />
            <Route path="skill" element={<Skills />} />
            <Route path="item" element={<Items />} />
            <Route path="attack" element={<Attack />} />
            <Route path="magic" element={<Magic />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
