import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppShowCharacter } from './AppShowCharacter';
import { AppCreateCharacter } from './AppCreateCharacter'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppCreateCharacter />
  </React.StrictMode>
);