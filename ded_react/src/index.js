import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from './AppLayout'
import { AppListOfCharacters } from './AppListOfCharacters';
import { AppCreateCharacter } from './AppCreateCharacter';
import { AppAbilityCharacter } from './AppAbilityCharacter'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Routes>
        <Route path="" element={<AppLayout />}>
          <Route path="CharacterCreation" element={<AppCreateCharacter />} />
          <Route path="CharactersList" element={<AppListOfCharacters />} />
          <Route path="CharacterAbility" element={<AppAbilityCharacter />} />
        </Route>
      </Routes>
    </BrowserRouter>

  // <React.StrictMode>
  //   <AppCreateCharacter />
  // </React.StrictMode>
);