import express from "express";
import { getVisaRequirements } from "../controllers/visaController.js";

const router = express.Router();

// Route: GET /api/visa/requirements/:country
router.get("/requirements/:country", getVisaRequirements);

export default router;
