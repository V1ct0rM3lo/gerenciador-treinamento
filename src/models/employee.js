async function createEmployeeTable(db) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            role TEXT NOT NULL
        );
    `);
}

module.exports = createEmployeeTable;