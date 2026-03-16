import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/chek-invite.css";

const CheckInvite = () => {
  const [accessLogin, setAccessLogin] = useState("");
  const [accessPassword, setAccessPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const navigationInProgress = useRef(false);

  // Проверяем, не залогинен ли уже пользователь
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const checkInvite = async (e) => {
    e.preventDefault();

    if (isLoading || navigationInProgress.current) return;

    setErrorMessage("");

    if (!accessLogin.trim() || !accessPassword.trim()) {
      setErrorMessage("Пожалуйста, заполните поля");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(
        "https://api.khametovamilanka.online/api/auth/check-invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessLogin: accessLogin.trim(),
            accessPassword: accessPassword.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Ошибка сервера");
        setIsLoading(false);
        return;
      }

      if (!data?.ok || !data?.registerToken) {
        setErrorMessage("Не удалось подтвердить доступ");
        setIsLoading(false);
        return;
      }

      // Сохраняем токен и делаем редирект
      sessionStorage.setItem("registerToken", data.registerToken);
      
      if (!navigationInProgress.current) {
        navigationInProgress.current = true;
        navigate("/register", { replace: true });
      }
      
    } catch (err) {
      console.error("checkInvite error:", err);
      setErrorMessage("Ошибка подключения к серверу");
      setIsLoading(false);
    }
  };

  return (
    <div className="t5oO8-4Z">
      <div className="_08esxaRX">
        <div className="r8lsLZcX">
          <svg width="63" height="37" viewBox="0 0 63 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.3066 12.9316H30.6836V10.6465H34.3066C34.8665 10.6465 35.3223 10.5553 35.6738 10.373C36.0254 10.1842 36.2826 9.92383 36.4453 9.5918C36.6081 9.25977 36.6895 8.88542 36.6895 8.46875C36.6895 8.04557 36.6081 7.65169 36.4453 7.28711C36.2826 6.92253 36.0254 6.62956 35.6738 6.4082C35.3223 6.18685 34.8665 6.07617 34.3066 6.07617H31.6992V18H28.7695V3.78125H34.3066C35.4199 3.78125 36.3737 3.98307 37.168 4.38672C37.9688 4.78385 38.5807 5.33398 39.0039 6.03711C39.4271 6.74023 39.6387 7.54427 39.6387 8.44922C39.6387 9.36719 39.4271 10.1615 39.0039 10.832C38.5807 11.5026 37.9688 12.0202 37.168 12.3848C36.3737 12.7493 35.4199 12.9316 34.3066 12.9316ZM44.5996 3.78125V18H41.6699V3.78125H44.5996ZM52.9785 3.78125L47.5293 12.1309H43.9453L43.5742 9.52344H45.9668L49.4238 3.78125H52.9785ZM49.9609 18L45.9766 11.6426L48.0078 9.55273L53.4375 18H49.9609Z" fill="white"/>
          <path d="M23.9121 27.2832H26.832C26.7734 28.2402 26.5098 29.0898 26.041 29.832C25.5788 30.5742 24.931 31.1536 24.0977 31.5703C23.2708 31.987 22.2747 32.1953 21.1094 32.1953C20.1979 32.1953 19.3809 32.0391 18.6582 31.7266C17.9355 31.4076 17.3171 30.9518 16.8027 30.3594C16.2949 29.7669 15.9076 29.0508 15.6406 28.2109C15.3737 27.3711 15.2402 26.4303 15.2402 25.3887V24.4023C15.2402 23.3607 15.377 22.4199 15.6504 21.5801C15.9303 20.7337 16.3275 20.0143 16.8418 19.4219C17.3626 18.8294 17.9844 18.3737 18.707 18.0547C19.4297 17.7357 20.237 17.5762 21.1289 17.5762C22.3138 17.5762 23.3132 17.791 24.127 18.2207C24.9473 18.6504 25.582 19.2428 26.0312 19.998C26.487 20.7533 26.7604 21.6126 26.8516 22.5762H23.9219C23.8893 22.0033 23.7754 21.5182 23.5801 21.1211C23.3848 20.7174 23.0885 20.4147 22.6914 20.2129C22.3008 20.0046 21.7799 19.9004 21.1289 19.9004C20.6406 19.9004 20.2142 19.9915 19.8496 20.1738C19.485 20.3561 19.179 20.6328 18.9316 21.0039C18.6842 21.375 18.4987 21.8438 18.375 22.4102C18.2578 22.9701 18.1992 23.6276 18.1992 24.3828V25.3887C18.1992 26.1243 18.2546 26.7721 18.3652 27.332C18.4759 27.8854 18.6452 28.3542 18.873 28.7383C19.1074 29.1159 19.4069 29.4023 19.7715 29.5977C20.1426 29.7865 20.5885 29.8809 21.1094 29.8809C21.7214 29.8809 22.2259 29.7832 22.623 29.5879C23.0202 29.3926 23.3229 29.1029 23.5312 28.7188C23.7461 28.3346 23.873 27.8561 23.9121 27.2832ZM40.3379 17.7812V32H37.4082V20.0762H31.6953V32H28.7656V17.7812H40.3379Z" fill="white"/>
          <path d="M12.5488 15.7148V18H2.30469V15.7148H12.5488ZM3.17383 15.7148V21.4863H0.419922L0.263672 15.7148H3.17383ZM14.6582 15.7148L14.4043 21.4961H11.7188V15.7148H14.6582ZM10.9375 3.78125V6.07617H4.0918V3.78125H10.9375ZM13.0273 3.78125V18H10.1074V3.78125H13.0273ZM3.73047 3.78125H6.66016L6.2793 9.57227C6.2207 10.5293 6.11654 11.3757 5.9668 12.1113C5.82357 12.8405 5.64779 13.4818 5.43945 14.0352C5.23763 14.5885 5.01302 15.0736 4.76562 15.4902C4.51823 15.9004 4.25781 16.2585 3.98438 16.5645C3.71094 16.8639 3.43424 17.1309 3.1543 17.3652C2.87435 17.5931 2.60091 17.8047 2.33398 18H0.654297V15.7148H1.30859C1.4974 15.5586 1.69596 15.3438 1.9043 15.0703C2.11914 14.7969 2.32096 14.429 2.50977 13.9668C2.70508 13.498 2.87435 12.9056 3.01758 12.1895C3.16732 11.4733 3.27799 10.6009 3.34961 9.57227L3.73047 3.78125Z" fill="white"/>
          <path d="M52.8821 29.3149V32H43.9893V29.3149H52.8821ZM45.1138 15.293V32H41.6714V15.293H45.1138ZM51.7231 22.0974V24.7136H43.9893V22.0974H51.7231ZM52.8706 15.293V17.9895H43.9893V15.293H52.8706Z" fill="white"/>
          <path d="M57.6077 18.5845V31H54.2915V18.5845H57.6077ZM61.6008 18.5845V21.1433H50.3557V18.5845H61.6008Z" fill="white"/>
          <path d="M21.6406 5.67041L18.5469 15.1001H16.0547L20.2812 3.7251H21.8672L21.6406 5.67041ZM24.2109 15.1001L21.1094 5.67041L20.8594 3.7251H22.4609L26.7109 15.1001H24.2109ZM24.0703 10.8657V12.7017H18.0625V10.8657H24.0703Z" fill="white"/>
          <ellipse cx="54.5005" cy="9.99987" rx="0.5" ry="2" transform="rotate(-13.0579 54.5005 9.99987)" fill="white"/>
          <ellipse cx="0.216007" cy="0.864028" rx="0.216007" ry="0.864028" transform="matrix(-0.974142 0.225936 0.225936 0.974142 54.4209 9)" fill="black"/>
          <ellipse cx="56.4389" cy="10.0614" rx="0.5" ry="2" transform="rotate(-13.0579 56.4389 10.0614)" fill="white"/>
          <ellipse cx="0.216007" cy="0.864028" rx="0.216007" ry="0.864028" transform="matrix(-0.974142 0.225936 0.225936 0.974142 56.3594 9.06152)" fill="black"/>
          <path d="M56.5 15L58.6651 13.5L56.5 14L54.335 13.5L56.5 15Z" fill="white"/>
          </svg>
        </div>

        <form className="a-AltNnW" onSubmit={checkInvite}>
          <div className="sLmgZn7O">
            <h1 className="I0E2SIQH">Проверка инвайта</h1>
            <p className="h1muhFRY">Пожалуйста, введите полученные данные</p>
          </div>

          {errorMessage && (
            <div className="gwOnNlDG">
              {errorMessage}
            </div>
          )}

          <div className="K6LUzmSd">
            <div className="F-eZP3Z3">
              <label className="i8qYWkc1">Логин</label>
              <input
                className="snRcI1jZ"
                placeholder="Empty"
                value={accessLogin}
                onChange={(e) => {
                  setAccessLogin(e.target.value);
                  setErrorMessage("");
                }}
              />
            </div>

            <div className="F-eZP3Z3">
              <label className="i8qYWkc1">Пароль</label>
              <input
                className="snRcI1jZ"
                placeholder="••••••••••••"
                type="password"
                value={accessPassword}
                onChange={(e) => {
                  setAccessPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="WsNIl9yN s-rIVNft kZamU7XS FVEEba1t Iy7f3zBR"
            disabled={isLoading}
          >
            {isLoading ? "Проверка..." : "Проверить"}
          </button>

          <div className="ZQrfRHNk auth-links">
            <p>
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckInvite;