import { useState } from "react";
const TicketBody = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "number" && !/^\d{0,11}$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketBody;
