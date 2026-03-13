import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/home.css';
import Pala from '../image/паланей.png';

const HomePage = () => {
  return (
    <div className="home-page">
        <div className='leader-board'>
            <div className='title'>Топ кланов</div>
            <div className='cont-leader-board'>
                <div className='items'>
                    <img src={Pala} alt="паланей" />
                    <div className='counter'>134</div>
                </div>
                <div className='items'>
                    <img src='' alt=""/>
                    <div className='counter'>71</div>
                </div>
                <div className='items'>
                    <img src='' alt=""/>
                    <div className='counter'>28</div>
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