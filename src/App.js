import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import HomePage from "./page/home";
import ProfilePage from "./page/pawns";
import CheckInvite from "./page/chek-invite";
import Register from "./page/register";
import Login from "./page/login";

function DarkPage() {
  return (
    <div className="dark-page">
      <h1>ГБПОУ DARK СПЭТ</h1>
      <p>Это страница с темным фоном</p>
    </div>
  );
}

function App() {
  const [authState, setAuthState] = useState({
    registerToken: null,
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const checkAuth = async () => {
      const registerToken = sessionStorage.getItem("registerToken");
      const userToken = localStorage.getItem("userToken");
      
      if (userToken) {
        try {
          const res = await fetch("https://api.khametovamilanka.online/api/auth/me", {
            headers: {
              "Authorization": `Bearer ${userToken}`
            }
          });
          
          if (res.ok) {
            const userData = await res.json();
            setAuthState({
              registerToken: null,
              user: userData,
              isLoading: false
            });
          } else {
            localStorage.removeItem("userToken");
            setAuthState({
              registerToken: registerToken,
              user: null,
              isLoading: false
            });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          setAuthState({
            registerToken: registerToken,
            user: null,
            isLoading: false
          });
        }
      } else {
        setAuthState({
          registerToken: registerToken,
          user: null,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem("userToken", token);
    setAuthState({
      registerToken: null,
      user: userData,
      isLoading: false
    });
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("userToken");
    
    try {
      await fetch("https://api.khametovamilanka.online/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("registerToken");
    setAuthState({
      registerToken: null,
      user: null,
      isLoading: false
    });
  };

  if (authState.isLoading) {
    return <div className="loading-screen">
      <div className="spinner"></div>
    </div>;
  }

  const { registerToken, user } = authState;

  return (
    <BrowserRouter>
      {!user && (
        <Routes>
          {registerToken ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/register" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/check-invite" element={<CheckInvite />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      )}

      {user && (
        <div className="App">
          <Header user={user} onLogout={handleLogout} />
          
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/dark" element={<DarkPage />} />
            <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
            <Route path="/pawns" element={<ProfilePage user={user} onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;