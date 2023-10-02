/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import TextMask from "react-text-mask";

const TicketBody = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    setemoji: "",
  });
  const phoneNumberMask = [
    "+",
    "7",
    " ",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  const [showFields, setShowFields] = useState(true);

  const isPhoneNumberValid = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(
    formData.number
  );
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    setShowFields(!checked);
  };

  useEffect(() => {
    setShowFields(!checked);
  }, [checked]);

  const emojis = [
    { emoji: "😀", label: "Ваше состояние отличное!" },
    { emoji: "🙂", label: "Вам хорошо!" },
    { emoji: "😐", label: "Все нормально, но вам не хорошо и не плохо" },
    { emoji: "🙁", label: "Вам не хорошо" },
    { emoji: "☹️", label: "Вам кардинально не нравится ваше состояние" },
  ];

  const handleEmojiChange = (e: { target: { value: any } }) => {
    const setemojiValue = e.target.value;
    const setemojiNumber =
      emojis.findIndex((emoji) => emoji.emoji === setemojiValue) + 1;
    setFormData({ ...formData, setemoji: setemojiNumber.toString() });
  };
  let title = "";
  let description = "";

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!checked && formData.setemoji === "") {
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
                {showFields && (
                  <>
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
                    <TextMask
                      mask={phoneNumberMask}
                      guide={false}
                      type="tel"
                      name="number"
                      placeholder="+7 (999) 999-99-99"
                      value={formData.number}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <textarea
                  name="message"
                  cols={10}
                  rows={4}
                  maxLength={90}
                  placeholder="Что вас беспокоит?"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                <div className="flex text-white items-end">
                  <Checkbox
                    className="checkbox"
                    data-state={checked}
                    onClick={handleChange}
                  >
                    <input type="checkbox" />
                  </Checkbox>
                  <p className="ml-2 mb-0.5">Я хочу оставить заявку анонимно</p>
                </div>
                <div className="customEmojiSelect">
                  <h1>Выберете ваше состояние</h1>
                  {emojis.map((emoji, index) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger>
                        <input
                          type="radio"
                          className="customEmojiSelect-input emojif customEmojiSelect-input emojiafter"
                          value={emoji.emoji}
                          name="collection[emoji]"
                          checked={formData.setemoji === (index + 1).toString()}
                          onChange={handleEmojiChange}
                        />
                        <HoverCardContent>{emoji.label}</HoverCardContent>
                      </HoverCardTrigger>
                    </HoverCard>
                  ))}
                </div>

                <button
                  onClick={() => {
                    toast({
                      title: "Ожидайте!",
                      description: "Ваша заявка обрабатывается на сервере",
                    });
                  }}
                  type="submit"
                  disabled={!isPhoneNumberValid && !checked}
                  className={
                    !isPhoneNumberValid && !checked
                      ? "black-background-button"
                      : ""
                  }
                >
                  {!isPhoneNumberValid && !checked
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
