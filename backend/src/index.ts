import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})