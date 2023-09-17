export default function setupRoutes(app, db) {
  app.post("/addTicket", async (req, res) => {
    const { name, email, number, message } = req.body;

    try {
      const connection = await db();

      const sql =
        "INSERT INTO ticket (name, email, number, message) VALUES (?, ?, ?, ?)";
      const values = [name, email, number, message];

      await connection.execute(sql, values);

      connection.end();

      res
        .status(200)
        .json({ message: "Данные успешно добавлены в базу данных" });
    } catch (error) {
      console.error("Error inserting data into MySQL:", error);
      res.status(500).json({
        error: "Произошла ошибка при добавлении данных в базу данных",
      });
    }
  });

  app.post("/login", async (req, res) => {
    const { login, password } = req.body;

    try {
      const connection = await db();

      const [rows] = await connection.execute(
        "SELECT * FROM users WHERE login = ?",
        [login]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }

      const user = rows[0];

      if (user.password === password) {
        res
          .status(200)
          .json({ success: true, message: "Аутентификация успешна" });
      } else {
        res
          .status(401)
          .json({ success: false, error: "Неверный логин или пароль" });
      }

      connection.end();
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ error: "Произошла ошибка при аутентификации" });
    }
  });
  app.post("/updateUser", async (req, res) => {
    const { oldLogin, newLogin, newPassword, oldPassword } = req.body;

    try {
      const connection = await db();

      const [existingUserRows] = await connection.execute(
        "SELECT * FROM users WHERE login = ?",
        [oldLogin]
      );

      if (existingUserRows.length === 0) {
        return res
          .status(404)
          .json({ error: "Пользователь с указанным логином не найден" });
      }

      const user = existingUserRows[0];

      if (user.password !== oldPassword) {
        return res.status(401).json({ error: "Неверный старый пароль" });
      }

      const updateSql =
        "UPDATE users SET login = ?, password = ? WHERE login = ?";
      const updateValues = [newLogin, newPassword, oldLogin];

      await connection.execute(updateSql, updateValues);

      connection.end();

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
}
