import { Tickets, columns } from "@/app/Tickets/columns";
import { DataTable } from "@/app/Tickets/data-table";
import { ADMIN_ROUTE } from "@/app/consts";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ArrowLeft } from "lucide-react";
import React from "react";

async function getData(): Promise<Tickets[]> {
  try {
    const response = await fetch("http://localhost:8000/getTickets");
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const tickets = await response.json();
    return tickets;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
}

const Admin_Page_Tickets = () => {
  const [data, setData] = React.useState<Tickets[] | null>(null);

  React.useEffect(() => {
    getData()
      .then((tickets) => {
        setData(tickets);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="container mx-auto py-10 h-screen">
    <a href={ADMIN_ROUTE}><Button className="absolute left-5 top-5 text-center"><ArrowLeft/></Button></a>
        <ModeToggle></ModeToggle>
      {data ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
    </div>
    </ThemeProvider>
  );
};

export default Admin_Page_Tickets;
