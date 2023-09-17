import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const TicketBody = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  let title = "";
  let description = "";

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "number" && !/^\d{0,11}$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/addTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
          title = "Отправлено!";
          description = "В скором времени мы примем меры";
      } else {
        title = "Ошибка";
        description = "Наш сервер не может обработать вашу заявку, попробуйте позже";
      }
    } catch (error) {
      title = "Ошибка";
      description = "Произошла ошибка при отправке заявки";
    } finally {
      toast({
        title: title,
        description: description,
      });
    }
  };

  return (
    <>
      <div className="containers">
        <div className="Ticket-top">
          <div className="Ticket-block">
            <div className="Ticket-Background">
              <form className="form-ticket" onSubmit={handleSubmit}>
                <h1>Обращения</h1>
                <input
                  type="text"
                  name="name"
                  placeholder="Введите Имя"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="number"
                  placeholder="+7 (999) 999-99-99"
                  value={formData.number}
                  onChange={handleInputChange}
                  maxLength={11}
                  minLength={11}
                />

                <textarea
                  name="message"
                  cols={10}
                  rows={4}
                  maxLength={90}
                  placeholder="Что вас беспокоит?"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                <button
                  onClick={() => {
                    toast({
                      title: "Ожидайте!",
                      description: "Ваша заявка обрабатывается на сервере",
                    });
                  }}
                  type="submit"
                  disabled={formData.number.length !== 11}
                  className={
                    formData.number.length !== 11
                      ? "black-background-button"
                      : ""
                  }
                >
                  {formData.number.length !== 11
                    ? "Заполните все поля"
                    : "Отправить"}
                </button>
                <Toaster />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketBody;
