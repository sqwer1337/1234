import React, { useEffect, useState } from "react";
import "../css/profile.css";
import "../css/create-post.css";

const ProfilePage = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(user?.about || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAbout(user?.about || "");
  }, [user?.about]);

  useEffect(() => {
    if (isEditing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isEditing]);

  const formatRegisterDate = (date) => {
    if (!date) return "Неизвестно";

    const formatted = new Date(date).toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const closeModal = () => {
    setIsEditing(false);
    setAbout(user?.about || "");
  };

  const handleSaveAbout = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("userToken");

      const res = await fetch(
        "https://api.khametovamilanka.online/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ about }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data?.message || "Профиль обновлен");
        setIsEditing(false);
      } else {
        setMessage(data?.error || "Ошибка при обновлении");
      }
    } catch (error) {
      setMessage("Ошибка соединения");
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="BLErSWUX">
          {/* <img
            src="https://cdn.xn--d1ah4a.com/images/a9484ecd-3ec5-4e76-88c6-9bac626a2f69.png"
            alt="Banner"
          /> */}
        </div>

        <div className="r2TckDeC">
          <div className="h-5Dd8A9">
            <div className="profile-avatar-wrapper">
              {user?.clan_avatar ? (
                <img
                  src={user.clan_avatar}
                  alt={user?.clan_name || "clan avatar"}
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar placeholder-avatar">
                  {user?.username?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}

              <span
                className={`status-dot ${user?.is_online ? "online" : "offline"}`}
                title={user?.is_online ? "В сети" : "Не в сети"}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              Редактировать
            </button>
          </div>

          <div className="profile-main-info">
            <h1 className="profile-username">
              <div className="Xnp1EFrD">@</div>{user?.username || "Пользователь"}
            </h1>

            <div className="about-view">
              <p className="profile-about">
                {user?.about?.trim() || "О себе"}
              </p>
            </div>

            <div className="profile-meta">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#ffffff80"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
              </svg>

              <span>Регистрация: {formatRegisterDate(user?.registered_at)}</span>
            </div>

            {user?.clan_name && (
              <div className="profile-clan">
                Вы в клане: <span>{user.clan_name}</span>
              </div>
            )}

            {message && <div className="profile-message">{message}</div>}
          </div>
        </div>

        <header className='header-post'>
          <div className='link active'>Мои посты</div>
          <div className='link'>Лайки</div>
        </header>

        <div className="crrL7XgI">
          <div className="post-top">
            <div className="GKtAeZvh mKywUPJV">
              <img src={user?.clan_avatar} alt="avatar" />
            </div>

            <textarea
              className="u13FLJio"
              placeholder="Что нового?"
              rows={1}
            />
          </div>

          <div className="post-bottom">
            <button type="button" className="attach-btn" aria-label="Прикрепить файл">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.44 11.05L12.25 20.24C10 22.49 6.34 22.49 4.09 20.24C1.84 17.99 1.84 14.33 4.09 12.08L13.99 2.18C15.49 0.68 17.92 0.68 19.42 2.18C20.92 3.68 20.92 6.11 19.42 7.61L10.23 16.8C9.48 17.55 8.27 17.55 7.52 16.8C6.77 16.05 6.77 14.84 7.52 14.09L15.65 5.96"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button type="button" className="publish-btn">
              Опубликовать
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-modal-header">
              <h2 className="profile-modal-title">Редактировать описание</h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={closeModal}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <div className="profile-modal-body">
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Расскажите о себе..."
                rows="6"
                className="about-textarea"
              />
            </div>

            <div className="about-actions">
              <button
                onClick={handleSaveAbout}
                disabled={isSaving}
                className="save-btn"
                type="button"
              >
                {isSaving ? "Сохранение..." : "Сохранить"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="cancel-btn"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;