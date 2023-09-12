import cors from 'cors';
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 8000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emotion',
};

const connectToDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
};

app.use(express.json());


app.use(cors());


app.post('/addTicket', async (req, res) => {
  const {name, email, number, message } = req.body;

  try {
    const connection = await connectToDB();


    const sql = 'INSERT INTO ticket (name, email, number, message) VALUES (?, ?, ?, ?)';
    const values = [name, email, number, message];
    
    await connection.execute(sql, values);

    connection.end();

    res.status(200).json({ message: 'Данные успешно добавлены в базу данных' });
  } catch (error) {
    console.error('Error inserting data into MySQL:', error);
    res.status(500).json({ error: 'Произошла ошибка при добавлении данных в базу данных' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
