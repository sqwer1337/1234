import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './page/home';
import Pawns from './page/pawns';

// Компонент для темной страницы
function DarkPage() {
  return (
    <div className="dark-page">
      <h1>ГБПОУ DARK СПЭТ</h1>
      <p>Это страница с темным фоном</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dark" element={<DarkPage />} />
          <Route path="/pawns" element={<Pawns />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;