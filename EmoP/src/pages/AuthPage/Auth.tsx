import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import { useState } from "react";

const TicketBody = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  let title = "";
  let description = "";

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
        const expirationTime = new Date().getTime() + 3600 * 1000;
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("authExpiration", expirationTime.toString());

        title = "Успешно!";
        description =
          "Вы вошли в аккаунт, страница будет перезагружена через 5 секунд";

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        title = "Ошибка!";
        description =
          "Запрос не может быть обработан сервером, или вы ввели неправильные данные";
      }
    } catch (error) {
      title = "Ошибка!";
      description =
        "Проверьте данные, либо наш сервер не может их обработать";
    } finally {
      toast({
        title: title,
        description: description,
      });
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
                  autoComplete="on"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button>Войти</button>
                <Toaster />
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
