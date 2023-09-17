import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Toaster } from "./ui/toaster";
import { toast } from "./ui/use-toast";

export function TabsProfile() {
  const [formData, setFormData] = useState({
    name: "",
    newname: "",
    currentPassword: "",
    newPassword: "",
  });

  let title = "";
  let description = "";

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateUser = async () => {
    const { name, newname, currentPassword, newPassword } = formData;

    try {
      const response = await fetch("http://localhost:8000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldLogin: name,
          newLogin: newname,
          oldPassword: currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        title = "Данные изменены!";
        description =
          "В базе данных данные были измененны, теперь вы можете войти с новыми данными";
      }
    } catch (error) {
      title = "Ошибка";
      description =
        "Скорее всего база данных не функционирует, обратитесь к разработчику";
    } finally {
      toast({
        title: title,
        description: description,
      });
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px] h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Аккаунт</TabsTrigger>
        <TabsTrigger value="password">Пароль</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Аккаунт</CardTitle>
            <CardDescription>
              Тут вы можете поменять данные от аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <form action="">
              <div className="space-y-2">
                <Label htmlFor="name">Имя аккаунта</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-2"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newname">Новое имя</Label>
                <Input
                  id="newname"
                  name="newname"
                  type="text"
                  value={formData.newname}
                  onChange={handleChange}
                  className="border-2"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
          <Button
              onClick={() => {
                toast({
                  title: "Ожидайте!",
                  description: "Данные обрабатываются на сервере",
                });
                handleUpdateUser();
              }}
            >
              Сохранить изменения
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Пароль</CardTitle>
            <CardDescription>Тут вы можете поменять пароль</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <form action="">
              <div className="space-y-2">
                <Label htmlFor="current">Текущий пароль</Label>
                <Input
                  id="current"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  autoComplete="on"
                  className="border-2"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Новый пароль</Label>
                <Input
                  id="new"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  autoComplete="on"
                  className="border-2"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                toast({
                  title: "Ожидайте!",
                  description: "Данные обрабатываются на сервере",
                });
                handleUpdateUser();
              }}
            >
              Сохранить изменения
            </Button>

            <Toaster />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
