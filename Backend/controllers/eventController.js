import { createEvent } from '../models/eventModel.js';

// @desc Create a new event
// @route POST /api/events
export const addEvent = async (req, res) => {
  const { address, description, callerName, callerNumber, mdtNumber, category, type, priority } = req.body;

  if (!address || !description || !callerName || !callerNumber || !mdtNumber || !category || !type || !priority) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    const newEvent = await createEvent(req.body);
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
