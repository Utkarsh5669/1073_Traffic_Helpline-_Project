import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// ✅ Middleware to validate responder input
const validateResponder = (req, res, next) => {
    const { rank, name, belt_no, phone_number, department } = req.body;

    if (!rank || !name || !belt_no || !phone_number) {
        return res.status(400).json({ error: "All required fields must be provided" });
    }

    next();
};

// ✅ GET /api/responders - Fetch all responders
router.get("/", async (req, res) => {
    try {
        const responders = await pool.query("SELECT * FROM responders ORDER BY id ASC");
        res.json({ responders: responders.rows });
    } catch (error) {
        console.error("❌ Error fetching responders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ GET /api/responders/:id - Fetch a single responder by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const responder = await pool.query("SELECT * FROM responders WHERE id = $1", [id]);

        if (responder.rows.length === 0) {
            return res.status(404).json({ error: "Responder not found" });
        }

        res.json({ responder: responder.rows[0] });
    } catch (error) {
        console.error("❌ Error fetching responder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ POST /api/responders - Add a new responder
router.post("/", validateResponder, async (req, res) => {
    try {
        const { rank, name, belt_no, phone_number, department } = req.body;

        const newResponder = await pool.query(
            `INSERT INTO responders (rank, name, belt_no, phone_number, department) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [rank, name, belt_no, phone_number, department || "Traffic"]
        );

        res.status(201).json({ message: "Responder added successfully", responder: newResponder.rows[0] });
    } catch (error) {
        console.error("❌ Error adding responder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ PUT /api/responders/:id - Update responder details
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rank, name, belt_no, phone_number, department } = req.body;

        const updateResponder = await pool.query(
            `UPDATE responders 
            SET rank = $1, name = $2, belt_no = $3, phone_number = $4, department = $5 
            WHERE id = $6 RETURNING *`,
            [rank, name, belt_no, phone_number, department || "Traffic", id]
        );

        if (updateResponder.rows.length === 0) {
            return res.status(404).json({ error: "Responder not found" });
        }

        res.json({ message: "Responder updated successfully", responder: updateResponder.rows[0] });
    } catch (error) {
        console.error("❌ Error updating responder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ DELETE /api/responders/:id - Delete a responder
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResponder = await pool.query("DELETE FROM responders WHERE id = $1 RETURNING *", [id]);

        if (deleteResponder.rows.length === 0) {
            return res.status(404).json({ error: "Responder not found" });
        }

        res.json({ message: "Responder deleted successfully", deletedResponder: deleteResponder.rows[0] });
    } catch (error) {
        console.error("❌ Error deleting responder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
