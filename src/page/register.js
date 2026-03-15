import React, { useState, useEffect } from "react";

const Register = () => {
  const [clans, setClans] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [clanId, setClanId] = useState("");

  useEffect(() => {
    fetch("https://api.khametovamilanka.online/api/clans")
      .then(res => res.json())
      .then(data => setClans(data));
  }, []);

  const register = async () => {
    const inviteId = localStorage.getItem("inviteId");

    const res = await fetch(
      "https://api.khametovamilanka.online/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inviteId,
          clanId,
          username,
          password,
          about
        })
      }
    );

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h2>Регистрация</h2>

      <input
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <textarea
        placeholder="О себе"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <select onChange={(e) => setClanId(e.target.value)}>
        <option>Выберите клан</option>

        {clans.map((clan) => (
          <option key={clan.id} value={clan.id}>
            {clan.name}
          </option>
        ))}
      </select>

      <button onClick={register}>Зарегистрироваться</button>
    </div>
  );
};

export default Register;