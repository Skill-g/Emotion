import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const TicketBody = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    setemoji: "",
  });
  const handleEmojiChange = (e: { target: { value: any; }; }) => {
    const setemojiValue = e.target.value;
    let setemojiNumber = 0;
    switch (setemojiValue) {
      case "😀":
        setemojiNumber = 1;
        break;
      case "🙂":
        setemojiNumber = 2;
        break;
      case "😐":
        setemojiNumber = 3;
        break;
      case "🙁":
        setemojiNumber = 4;
        break;
      case "☹️":
        setemojiNumber = 5;
        break;
      default:
        setemojiNumber = 0;
    }
    setFormData({ ...formData, setemoji: setemojiNumber.toString() });
  };
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

    if (formData.setemoji === "") {
      title = "Ошибка";
      description = "Пожалуйста, выберите ваше состояние (emoji)";
      toast({
        title: title,
        description: description,
      });
      return;
    }

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
        description =
          "Наш сервер не может обработать вашу заявку, попробуйте позже";
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
                <div className="customEmojiSelect">
                  <h1>Выберете ваше состояние</h1>
                  <input
                    type="radio"
                    className="customEmojiSelect-input emojif customEmojiSelect-input emojiafter"
                    value="😀"
                    name="collection[emoji]"
                    checked={formData.setemoji === "1"}
                    onChange={handleEmojiChange}
                  />
                  <input
                    type="radio"
                    className="customEmojiSelect-input emojif customEmojiSelect-input emojiafter"
                    value="🙂"
                    name="collection[emoji]"
                    checked={formData.setemoji === "2"}
                    onChange={handleEmojiChange}
                  />
                  <input
                    type="radio"
                    className="customEmojiSelect-input emojif customEmojiSelect-input emojiafter"
                    value="😐"
                    name="collection[emoji]"
                    checked={formData.setemoji === "3"}
                    onChange={handleEmojiChange}
                  />
                  <input
                    type="radio"
                    className="customEmojiSelect-input emojif customEmojiSelect-input emojiafter"
                    value="🙁"
                    name="collection[emoji]"
                    checked={formData.setemoji === "4"}
                    onChange={handleEmojiChange}
                  />
                  <input
                    type="radio"
                    className="customEmojiSelect-input emojif customEmojiSelect-input emojiafter"
                    value="☹️"
                    name="collection[emoji]"
                    checked={formData.setemoji === "5"}
                    onChange={handleEmojiChange}
                  />
                </div>

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
