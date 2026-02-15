import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import TaxRouter from "./routes/tax.routes.js";
import SubsidyRouter from "./routes/subsidy.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use('/api/v1/tax', TaxRouter);
app.use('/api/v1/subsidy', SubsidyRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})
.on("error", (err) => {
  console.error("Server error:", err);
});