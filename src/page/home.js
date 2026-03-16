import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/home.css';

const HomePage = () => {
  const [topClans, setTopClans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Проверка API здоровья
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

    // Загружаем топ кланов
    fetchTopClans();
  }, []);

  const fetchTopClans = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.khametovamilanka.online/api/clans/top");
      
      if (!res.ok) {
        throw new Error("Failed to fetch clans");
      }
      
      const data = await res.json();
      // Берем только первые 7 кланов
      setTopClans(data.slice(0, 7));
    } catch (err) {
      console.error("Error fetching top clans:", err);
      setError("Не удалось загрузить список кланов");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <span className='title'>Лента</span>

      <div className='leader-board'>
        <div className='title'>Топ кланов</div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className='cont-leader-board'>
            {topClans.map((clan, index) => (
              <div key={clan.id} className='items'>
                <div className='wrapper-image'>
                  <img 
                    src={clan.image_url} 
                    alt={clan.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className='qkqd1sP3'>{clan.name}</div>
                <div className='counter'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#FFFFFF"><path d="M324.5-404.5Q310-419 310-440t14.5-35.5Q339-490 360-490t35.5 14.5Q410-461 410-440t-14.5 35.5Q381-390 360-390t-35.5-14.5Zm240 0Q550-419 550-440t14.5-35.5Q579-490 600-490t35.5 14.5Q650-461 650-440t-14.5 35.5Q621-390 600-390t-35.5-14.5ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/></svg>
                  {clan.members_count}
                </div>
              </div>
            ))}

            {topClans.length === 0 && !isLoading && (
              <div className="no-clans">Нет данных о кланах</div>
            )}
          </div>
        )}
      </div>

      <header className='header-post'>
        <div className='link active'>Все посты</div>
        <div className='link'>Популярные</div>
      </header>
    </div>
  );
};

export default HomePage;