const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("trainings").get();
        let trainings = [];
        const today = new Date();

        snapshot.forEach(doc => {
            let data = doc.data();
            let expirationDate = new Date(data.expiration_date);
            let daysRemaining = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));

            trainings.push({ id: doc.id, days_remaining: daysRemaining, ...data });
        });

        res.json(trainings);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar treinamentos" });
    }
});

module.exports = router;
