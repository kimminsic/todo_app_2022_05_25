import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host : "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "todoapp_2022_05_25",
  waitForConnections:true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const app = express();

const corsOptions ={
  origin: "https://cdpn.io",
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());

const appPort = 3000;

app.get(`/:user_id/todos`, async (req,res)=>{
  const {user_id}=req.params;

  const [todoRows] = await pool.query(`
  SELECT *
  FROM todo 
  WHERE user_id = ?
  ORDER BY id DESC`,
  [user_id]
  );

  res.json({
    resultCode:"S-1",
    msg:"성공",
    data: todoRows
  });
});

app.listen(appPort, () =>{
  console.log(`${appPort} start`);
});

