import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
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

        const cookieName =
          user.role === "owner" || user.role === "admin"
            ? "isAuthAdmin"
            : "isUser";
        res.cookie(cookieName, "true", {
          httpOnly: false,
          maxAge: 86400 * 1000,
        });
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

      const decryptedOldPassword = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );

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

      res
        .status(200)
        .json({ message: "Данные пользователя успешно обновлены" });
    } catch (error) {
      console.error("Error updating user data:", error);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении данных пользователя" });
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

      res.status(201).json({
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
  app.get("/StatTickets", async (req, res) => {
    try {
      const tickets = await prisma.ticket.findMany({
        where: {
          created: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
      });
      const lastTicket = tickets[tickets.length - 1];
      const lastTicketId = lastTicket ? lastTicket.id : 0;
      const tickets_month = tickets.length;
      const setemojiValues = tickets.map((ticket) => ticket.setemoji);
      const likes = setemojiValues.filter((value) => value == 1 || value == 2);
      const dislikes = setemojiValues.filter(
        (value) => value == 4 || value == 5
      );
      res.status(200).json({
        tickets_all: lastTicketId,
        tickets_month: tickets_month,
        likes: likes.length,
        dislikes: dislikes.length,
      });
    } catch (error) {
      console.error("Error fetching ticket stats:", error);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении статистики заявок" });
    }
  });
  app.get("/MonthlyStats", async (req, res) => {
    try {
      const monthlyStats = [];

      for (let month = 0; month < 12; month++) {
        const startDate = new Date(new Date().getFullYear(), month, 1);
        const endDate = new Date(new Date().getFullYear(), month + 1, 1);

        const monthStats = {
          name: getMonthName(month),
          total: await prisma.ticket.count({
            where: {
              created: {
                gte: startDate,
                lt: endDate,
              },
            },
          }),
        };

        monthlyStats.push(monthStats);
      }

      res.status(200).json(monthlyStats);
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении месячной статистики" });
    }
    function getMonthName(month) {
      const monthNames = [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ];
      return monthNames[month];
    }
  });
  app.get("/GetFiveTickets", async (req, res) => {
    try {
      const fiveLatestTickets = await prisma.ticket.findMany({
        take: 5,
        orderBy: {
          created: 'asc',
        },
        select: {
          name: true,
          email: true,
          number: true,
          setemoji: true,
        },
      });
      

      res.status(200).json(fiveLatestTickets);
    } catch (error) {
      console.error("Error fetching five latest tickets:", error);
      res
        .status(500)
        .json({
          error: "Произошла ошибка при получении последних пяти заявок",
        });
    }
  });
}
