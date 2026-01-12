import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'muhan_db', 
  password: '134679', 
  port: 5432,
});

pool.connect((err) => {
  if (err) console.error('DB 연결 실패:', err.stack);
  else console.log('PostgreSQL 연결 성공!');
});

app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)';
    await pool.query(query, [email, password, name]);
    res.status(200).json({ message: "무한상사 입사 처리가 완료되었습니다!" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0 && result.rows[0].password === password) {
      res.status(200).json({ message: "로그인 성공!", user: result.rows[0] });
    } else {
      res.status(401).json({ message: "로그인 실패" });
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});

app.listen(3000, () => {
  console.log('백엔드 서버 가동 중: http://localhost:3000');
});