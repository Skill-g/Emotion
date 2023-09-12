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

  // Обработчик отправки формы
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/pCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Ваша заявка отправлена на рассмотрение");
      } else {
        alert("Заявка отправлена");
      }
    } catch (error) {
      console.error("Увы заявка не дошла, попробуйте позже!", error);
      alert("Произошла ошибка при отправке данных");
    }
  };

  return (
    <>
      <Header></Header>
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
      <Footer></Footer>
    </>
  );
};

export default TicketBody;
