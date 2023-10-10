import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
const Recharts = () => {
  const [monthlyStats, setMonthlyStats] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/MonthlyStats`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Не удалось получить данные");
        }
        return response.json();
      })
      .then((data) => {
        setMonthlyStats(data);
      })
      .catch((error) => {
        console.error("Error fetching monthly stats:", error);
      });
  }, []);

  return (
    <div className="statblock rounded-xl  bg-card text-card-foreground shadow col-span-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={monthlyStats}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />

          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Recharts;
