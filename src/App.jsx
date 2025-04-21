
import React from 'react';
// src/App.jsx
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Inschrijving from "./Inschrijving";
import DocumentenLijst from "./DocumentenLijst";


export default function App() {
  console.log("App is rendering");
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Inschrijving />} />
        <Route path="/documenten" element={<DocumentenLijst />} />
      </Routes>
    </div>
  );
}
