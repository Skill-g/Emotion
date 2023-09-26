import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export default function setupRoutes(app) {
  app.post("/addTicket", async (req, res) => {
    const { name, email, number, message, setemoji } = req.body;

    try {
      await prisma.ticket.create({
        data: {
          name,
          email,
          number,
          message,
          setemoji,
        },
      });

      res
        .status(200)
        .json({ message: "Данные успешно добавлены в базу данных" });
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
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const token = generateToken(user.id);
  
  
        res
          .status(200)
          .json({ success: true, message: "Аутентификация успешна", token });
      } else {
        res
          .status(401)
          .json({ success: false, error: "Неверный логин или пароль" });
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
  

      const decryptedOldPassword = await bcrypt.compare(oldPassword, existingUser.password);
  
      if (!decryptedOldPassword) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); 
  
      await prisma.users.update({
        where: {
          id: existingUser.id,
        },
        data: {
          login: newLogin,
          password: hashedNewPassword,
        },
      });
  
      res.status(200).json({ message: "Данные пользователя успешно обновлены" });
    } catch (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ error: "Произошла ошибка при обновлении данных пользователя" });
    }
  });
  app.post("/reg", async (req, res) => {
    const { login, password } = req.body;

    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          login,
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Пользователь с таким логином уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const role = (await prisma.users.count()) === 0 ? "owner" : "user";

      const newUser = await prisma.users.create({
        data: {
          login,
          password: hashedPassword,
          role,
        },
      });

      res
        .status(201)
        .json({
          message: "Пользователь успешно зарегистрирован",
          user: newUser,
        });
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ error: "Произошла ошибка при регистрации пользователя" });
    }
  });
  app.get("/getTickets", async (req, res) => {
    function numberToEmoji(number) {
      const emojiMap = {
        1: "😀",
        2: "🙂",
        3: "😐",
        4: "🙁",
        5: "☹️",
      };
      return emojiMap[number] || "❓";
    }

    try {
      const tickets = await prisma.ticket.findMany();
      const ticketsWithEmoji = tickets.map((ticket) => ({
        ...ticket,
        setemoji: numberToEmoji(ticket.setemoji),
      }));
      res.status(200).json(ticketsWithEmoji);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Произошла ошибка при получении заявок" });
    }
  });
}
