import pool from '../config/db.js';

// Create a new event
export const createEvent = async (eventData) => {
  const { address, description, callerName, callerNumber, mdtNumber, category, type, priority } = eventData;
  
  const query = `
    INSERT INTO events (address, description, caller_name, caller_number, mdt_number, category, type, priority)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
  `;

  const values = [address, description, callerName, callerNumber, mdtNumber, category, type, priority];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
