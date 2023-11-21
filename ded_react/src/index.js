import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppShowCharacter } from './AppShowCharacter';
import { AppCreateCharacter } from './AppCreateCharacter';
import { AppAbilityCharacter } from './AppAbilityCharacter'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppAbilityCharacter />
  </React.StrictMode>
);