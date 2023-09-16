import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import { useState } from "react";

const TicketBody = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Аутентификация успешна') {
          const expirationTime = new Date().getTime() + 3600 * 1000;
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('authExpiration', expirationTime.toString());
          
          alert('Вход успешно выполнен');
        } else {
          alert('Неверный логин или пароль');
        }
      } else {
        alert('Произошла ошибка при отправке данных');
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке данных", error);
      alert("Произошла ошибка при отправке данных");
    }
  };

  return (
    <>
      <Header />
      <div className="containers">
        <div className="Ticket-top">
          <div className="Ticket-block">
            <div className="Ticket-Background">
              <form className="form-ticket" onSubmit={handleSubmit}>
                <h1>Авторизация</h1>
                <input
                  type="text"
                  name="login"
                  placeholder="Логин"
                  value={formData.login}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button>Войти</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TicketBody;
