import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/home.css';
import Pala from '../image/паланей.png';
import Push from '../image/пущаев.png';
import Asfir from '../image/эсфирь.png';
import Prosh from '../image/прошакова.png';

const HomePage = () => {
  useEffect(() => {
    fetch("https://api.khametovamilanka.online/api/health")
      .then((res) => {
        console.log("STATUS:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("API RESPONSE:", data);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      });
  }, []);

  return (
    <div className="home-page">
      <span className='title'>Лента</span>

      <div className='leader-board'>
        <div className='title'>Топ кланов</div>
        <div className='cont-leader-board'>
          <div className='items'>
            <img src={Pala} alt="?" />
            <div className='counter'>👀 134</div>
          </div>
          <div className='items'>
            <img src={Push} alt="?" />
            <div className='counter'>👀 71</div>
          </div>
          <div className='items'>
            <img src={Asfir} alt="?" />
            <div className='counter'>👀 28</div>
          </div>
          <div className='items'>
            <img src={Prosh} alt="?" />
            <div className='counter'>👀 2</div>
          </div>
        </div>
      </div>

      <header className='header-post'>
        <div className='link active'>Все посты</div>
        <div className='link'>Популярные</div>
      </header>
    </div>
  );
};

export default HomePage;