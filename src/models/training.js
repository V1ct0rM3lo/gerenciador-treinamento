async function createTrainingTable(db) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS trainings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER NOT NULL,
            training_type TEXT NOT NULL,
            date_completed TEXT NOT NULL,
            expiration_date TEXT NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
    `);
}

module.exports = createTrainingTable;