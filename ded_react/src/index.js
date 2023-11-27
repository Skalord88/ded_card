import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from './AppLayout';
import { AppCreateCharacter } from './AppCreateCharacter';
import { AppListOfCharacters } from './AppListOfCharacters'
import { AppShowCharacter } from './AppShowCharacter'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Routes>
        <Route path="" element={<AppLayout />}>
          <Route path="CreateCharacter" element={<AppCreateCharacter />} />
          <Route path="CharactersList" element={<AppListOfCharacters />} />
          <Route path="character/:idChar" element={<AppShowCharacter />} />
        </Route>
      </Routes>
    </BrowserRouter>

);