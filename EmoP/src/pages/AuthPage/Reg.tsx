/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN_ROUTE, SERVER_URL } from "@/app/consts";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import { useEffect, useState } from "react";

const RegistrationBody = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const isReg = localStorage.getItem("isRegistered");
    setIsRegistered(isReg === "true");
  }, []);

  const handleInputChange = (e: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isRegistered) {
      toast({
        title: "Ошибка!",
        description: "С данного компьютера уже была регистрация",
      });
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/reg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description:
            "Вы успешно зарегистрировались, вы будете перенаправлены на страницу 'Войти' через 5 секунд",
        });
        setTimeout(() => {
          window.location.href = LOGIN_ROUTE;
        }, 5000);
      } else if (response.status === 400) {
        toast({
          title: "Ошибка!",
          description: "Пользователь с таким логином уже зарегистрирован",
        });
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

  return (
    <>
      <Header />
      <div className="containers">
        <div className="Ticket-top">
          <div className="Ticket-block">
            <div className="Ticket-Background">
              <form className="form-ticket" onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
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
                <button>Зарегистрироваться</button>
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

export default RegistrationBody;
