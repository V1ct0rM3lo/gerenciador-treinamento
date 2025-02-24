const express = require("express");
const cors = require("cors");
const db = require("./config/firebase"); // Importando Firestore corretamente
const employeeRoutes = require("./routes/employeeRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Servindo o frontend
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Rotas
app.use("/employees", employeeRoutes);
app.use("/trainings", trainingRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
