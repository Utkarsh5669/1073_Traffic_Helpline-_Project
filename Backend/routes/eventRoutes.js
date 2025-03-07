import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// POST /api/events - Create a new event
router.post("/", async (req, res) => {
    try {
        const { address, latitude, longitude, incident_description, caller_name, caller_number, mdt_number, category, event_type, priority } = req.body;

        if (!address || !latitude || !longitude || !incident_description || !category || !priority) {
            return res.status(400).json({ success: false, error: "Missing required fields." });
        }

        const newEvent = await pool.query(
            `INSERT INTO events (address, latitude, longitude, incident_description, caller_name, caller_number, mdt_number, category, event_type, priority, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *`,
            [address, latitude, longitude, incident_description, caller_name, caller_number, mdt_number, category, event_type, priority]
        );

        res.status(201).json({ success: true, event: newEvent.rows[0] });

    } catch (error) {
        console.error("Error inserting event:", error);

        if (error.code === "23505") {
            return res.status(400).json({ success: false, error: "Duplicate entry. Please check your input." });
        }
        
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// GET /api/events - Retrieve all events
router.get("/", async (req, res) => {
    try {
        const events = await pool.query("SELECT * FROM events ORDER BY created_at DESC");

        if (events.rows.length === 0) {
            return res.status(404).json({ success: false, message: "No events found." });
        }

        res.json({ success: true, events: events.rows });

    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
// router.put("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         await pool.query("UPDATE events SET completed = $1 WHERE id = $2", [true, id]);
//         res.json({ success: true, message: "Event marked as completed" });
//     } catch (error) {
//         console.error("Error updating event:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


export default router;
