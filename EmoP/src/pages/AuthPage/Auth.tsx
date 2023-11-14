/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN_ROUTE, REG_ROUTE, SERVER_URL } from "@/app/consts";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import Cookies from "js-cookie";
import { useState } from "react";

const TicketBody = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthedAdmin = Cookies.get("isAuthAdmin") === "true";
  const isUserAuthed = Cookies.get("isUser") === "true";

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Вы вошли в аккаунт",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast({
          title: "Ошибка!",
          description:
            "Запрос не может быть обработан сервером, или вы ввели неправильные данные",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка!",
        description: "Проверьте данные, либо наш сервер не может их обработать",
      });
    }
  };

  const handleLogout = () => {
    Cookies.remove("isAuthAdmin");
    Cookies.remove("isUser");
    setIsAuthenticated(false);
    window.location.href = LOGIN_ROUTE;
  };

  return (
    <>
      <Header />
      <div className="containers">
        <div className="Ticket-top">
          <div className="Ticket-block">
            <div className="Ticket-Background">
              {isAuthedAdmin || isUserAuthed ? (
                <div>
                  <form className="form-ticket" action="">
                    <h1>Вы авторизованы</h1>
                    <button onClick={handleLogout}>Разлогиниться</button>
                  </form>
                </div>
              ) : (
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
                  {!isAuthenticated && (
                    <button
                      className="btnform"
                      onClick={() => {
                        window.location.href = REG_ROUTE;
                      }}
                    >
                      Регистрация
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TicketBody;
