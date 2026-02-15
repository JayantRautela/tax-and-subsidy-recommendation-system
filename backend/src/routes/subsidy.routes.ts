import express from "express";
import { recommendSubsidies } from "../controllers/subsidy.controller.js";

const router = express.Router();

router.post("/recommend", recommendSubsidies);

export default router;
