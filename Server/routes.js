import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function setupRoutes(app) {
  app.post("/addTicket", async (req, res) => {
    const { name, email, number, message } = req.body;

    try {
      await prisma.ticket.create({
        data: {
          name,
          email,
          number,
          message,
        },
      });

      res.status(200).json({ message: "Данные успешно добавлены в базу данных" });
    } catch (error) {
      console.error("Error inserting data into Prisma:", error);
      res.status(500).json({
        error: "Произошла ошибка при добавлении данных в базу данных",
      });
    }
  });

  app.post("/login", async (req, res) => {
    const { login, password } = req.body;

    try {
      const user = await prisma.users.findFirst({
        where: {
          login,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }

      if (user.password === password) {
        res.status(200).json({ success: true, message: "Аутентификация успешна" });
      } else {
        res.status(401).json({ success: false, error: "Неверный логин или пароль" });
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ error: "Произошла ошибка при аутентификации" });
    }
  });

  app.post("/updateUser", async (req, res) => {
    const { oldLogin, newLogin, newPassword, oldPassword } = req.body;

    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          login: oldLogin,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Неверный логин или пароль" });
      }

      if (existingUser.password !== oldPassword) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }

      await prisma.users.update({
        where: {
          login: oldLogin,
        },
        data: {
          login: newLogin,
          password: newPassword,
        },
      });

      res.status(200).json({ message: "Данные пользователя успешно обновлены" });
    } catch (error) {
      console.error("Error updating user data:", error);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении данных пользователя" });
    }
  });
  app.post("/reg", async (req, res) => {
    const { login, password } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          login,
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ error: "Пользователь с таким логином уже существует" });
      }
  
      const role = (await prisma.users.count()) === 0 ? "owner" : "user";
  
      const newUser = await prisma.users.create({
        data: {
          login,
          password,
          role,
        },
      });
  
      res.status(201).json({ message: "Пользователь успешно зарегистрирован", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Произошла ошибка при регистрации пользователя" });
    }
  });
}