import { SERVER_URL } from "@/app/consts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarRange, Heart, HeartOff, Users } from "lucide-react";
import { useEffect, useState } from "react";


const TabsStat = () => {
    const [ticketStats, setTicketStats] = useState({
      tickets_all: 0,
      likes: 0,
      dislikes: 0,
      tickets_month: 0,
    });

useEffect(() => {

    fetch(`${SERVER_URL}/StatTickets`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Не удалось получить данные");
        }
        return response.json();
      })
      .then((data) => {
        setTicketStats({
          tickets_all: data.tickets_all,
          likes: data.likes,
          dislikes: data.dislikes,
          tickets_month: data.tickets_month,
        });
      })
      .catch((error) => {
        console.error("Error fetching ticket stats:", error);
      });
  }, []);


    return (
        <div>
        <Tabs defaultValue="overview" className="space-y-4 w-screen mt-20">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Количество обращений за все время
                  </CardTitle>
                  <Users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {ticketStats.tickets_all}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Количество обращений за месяц
                  </CardTitle>
                  <CalendarRange />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {ticketStats.tickets_month}
                  </div>
                  <p className="text-xs text-muted-foreground"></p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Положительные обращения
                  </CardTitle>
                  <Heart />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ticketStats.likes}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Отрицательные обращения
                  </CardTitle>
                  <HeartOff />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {ticketStats.dislikes}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardContent className="pl-2"></CardContent>
              </Card>
              <Card className="col-span-3">
                <CardContent></CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
    );
};

export default TabsStat;