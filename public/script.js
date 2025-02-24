// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_PROJETO_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_ID",
    appId: "SEU_APP_ID"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para abrir modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Função para fechar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Abrir os modais ao clicar nos botões
document.getElementById("addEmployeeBtn").addEventListener("click", () => openModal("employeeModal"));
document.getElementById("addTrainingBtn").addEventListener("click", () => openModal("trainingModal"));

// Adicionar funcionário ao Firebase
document.getElementById("employeeForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("employeeName").value;

    try {
        await addDoc(collection(db, "employees"), { name });
        alert("Funcionário adicionado com sucesso!");
        closeModal("employeeModal");
        document.getElementById("employeeForm").reset();
        loadEmployees();
    } catch (error) {
        console.error("Erro ao adicionar funcionário: ", error);
    }
});

// Carregar funcionários no select do Treinamento
async function loadEmployees() {
    const employeeSelect = document.getElementById("employeeId");
    employeeSelect.innerHTML = "<option value=''>Selecione um funcionário</option>";
    const querySnapshot = await getDocs(collection(db, "employees"));

    querySnapshot.forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.data().name;
        employeeSelect.appendChild(option);
    });
}

// Adicionar treinamento ao Firebase
document.getElementById("trainingForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const employeeId = document.getElementById("employeeId").value;
    const trainingType = document.getElementById("trainingType").value;
    const trainingDate = document.getElementById("trainingDate").value;

    if (!employeeId) {
        alert("Selecione um funcionário!");
        return;
    }

    try {
        await addDoc(collection(db, "trainings"), {
            employeeId,
            trainingType,
            trainingDate
        });

        alert("Treinamento adicionado com sucesso!");
        closeModal("trainingModal");
        document.getElementById("trainingForm").reset();
    } catch (error) {
        console.error("Erro ao adicionar treinamento: ", error);
    }
});

// Carregar funcionários ao iniciar
loadEmployees();
