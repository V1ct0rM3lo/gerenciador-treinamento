const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("employees").get();
        let employees = [];
        snapshot.forEach(doc => {
            employees.push({ id: doc.id, ...doc.data() });
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar funcionários" });
    }
});

module.exports = router;
