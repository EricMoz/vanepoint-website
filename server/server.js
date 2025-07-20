const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

const db = new sqlite3.Database('testimonials.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS testimonials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            testimonial_text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

app.post('/submit-testimonial', (req, res) => {
    console.log('Received form data:', req.body); // Debug log
    const { name, role, testimonial } = req.body;
    if (!name || !role || !testimonial) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    db.run(
        `INSERT INTO testimonials (name, role, testimonial_text) VALUES (?, ?, ?)`,
        [name, role, testimonial],
        function (err) {
            if (err) {
                console.error('Error inserting data:', err.message);
                return res.status(500).json({ error: 'Failed to save testimonial' });
            }
            // Log all entries
            db.all(`SELECT * FROM testimonials`, [], (err, rows) => {
                if (err) {
                    console.error('Error fetching testimonials:', err.message);
                } else {
                    console.log('Current testimonials:', rows);
                }
            });
            res.json({ message: 'Testimonial submitted successfully!' });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});