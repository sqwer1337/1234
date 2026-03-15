import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';

import HomePage from './page/home';
import Pawns from './page/pawns';
import CheckInvite from './page/chek-invite';
import Register from './page/register';

function DarkPage() {
  return (
    <div className="dark-page">
      <h1>ГБПОУ DARK СПЭТ</h1>
      <p>Это страница с темным фоном</p>
    </div>
  );
}

function App() {

  const inviteVerified = localStorage.getItem("inviteVerified");
  const userToken = localStorage.getItem("userToken");

  return (
    <BrowserRouter>

      {/* если нет invite */}
      {!inviteVerified && (
        <Routes>
          <Route path="*" element={<CheckInvite />} />
        </Routes>
      )}

      {/* invite есть но регистрации нет */}
      {inviteVerified && !userToken && (
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      )}

      {/* пользователь авторизован */}
      {inviteVerified && userToken && (
        <div className="App">

          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dark" element={<DarkPage />} />
            <Route path="/pawns" element={<Pawns />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        </div>
      )}

    </BrowserRouter>
  );
}

export default App;