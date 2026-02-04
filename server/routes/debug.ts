import { Router, RequestHandler } from "express";
import { Employee } from "../models/Employee";

const router = Router();

// Temporary debug route: returns employees without auth checks
const debugEmployees: RequestHandler = async (_req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({ success: true, data: employees, count: employees.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

router.get("/employees", debugEmployees);

export { router as debugRouter };
