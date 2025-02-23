import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// POST /api/events - Create a new event
router.post("/", async (req, res) => {
    try {
        const { address, incident_description, caller_name, caller_number, mdt_number, category, event_type, priority} = req.body;

        const newEvent = await pool.query(
            "INSERT INTO events (address, incident_description, caller_name, caller_number, mdt_number, category, event_type, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [address, incident_description, caller_name, caller_number, mdt_number, category, event_type, priority]
        );

        res.status(201).json(newEvent.rows[0]);
    } catch (error) {
        console.error("Error inserting event:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/events - Retrieve all events
router.get("/", async (req, res) => {
    try {
        const events = await pool.query("SELECT * FROM events ORDER BY created_at DESC");
        res.json(events.rows);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
