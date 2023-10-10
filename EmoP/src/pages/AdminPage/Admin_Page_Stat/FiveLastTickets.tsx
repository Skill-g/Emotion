import { useEffect, useState } from "react";

const FiveLastTickets = () => {
  const [fiveLatestTickets, setFiveLatestTickets] = useState<TicketData[]>([]);
  interface TicketData {
    setemoji: string;
    name: string;
    email: string;
    number: string;
  }

  const emojiMap: Record<number, string> = {
    1: "😀",
    2: "🙂",
    3: "😐",
    4: "🙁",
    5: "☹️",
  };

  useEffect(() => {
    fetch(`http://localhost:8000/GetFiveTickets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось получить данные");
        }
        return response.json();
      })
      .then((data: TicketData[]) => {
        setFiveLatestTickets(data);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  }, []);

  return (
    <div className="space-y-8 ml-auto mr-auto">
      {fiveLatestTickets.map((ticket, index) => (
        <div key={index} className="flex items-center">
          {emojiMap[parseInt(ticket.setemoji)]}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{ticket.name}</p>
            <p className="text-sm text-muted-foreground">{ticket.email}</p>
          </div>
          <div className="ml-auto font-medium">{ticket.number}</div>
        </div>
      ))}
    </div>
  );
};

export default FiveLastTickets;
