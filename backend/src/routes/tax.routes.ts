import express from "express";
import {compareTaxController, calculateOldRegimeController, calculateNewRegimeController } from "../controllers/tax.controller.js";

const router = express.Router();

router.post("/compare", compareTaxController);
router.post("/calculate-old", calculateOldRegimeController);
router.post("/calculate-new", calculateNewRegimeController);

export default router;
