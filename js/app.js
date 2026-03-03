// ===============================
// Rick and Morty Explorer App
// Con modo oscuro y filtro
// ===============================

const API_URL = "https://rickandmortyapi.com/api/character";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const statusFilter = document.getElementById("statusFilter");
const charactersContainer = document.getElementById("charactersContainer");
const errorMessage = document.getElementById("errorMessage");
const themeToggle = document.getElementById("themeToggle");

/**
 * Obtener personajes desde la API
 */
async function fetchCharacters(name = "", status = "") {
    try {
        errorMessage.textContent = "";
        charactersContainer.innerHTML = "";

        const response = await fetch(
            `${API_URL}?name=${name}&status=${status}`
        );

        if (!response.ok) {
            throw new Error("No se encontraron personajes.");
        }

        const data = await response.json();

        displayCharacters(data.results.slice(0, 10));

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

/**
 * Mostrar personajes en el DOM
 */
function displayCharacters(characters) {

    characters.forEach(character => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-body">
                <h3>${character.name}</h3>
                <p><strong>Especie:</strong> ${character.species}</p>
                <p><strong>Estado:</strong> ${character.status}</p>
            </div>
        `;

        charactersContainer.appendChild(card);
    });
}

/**
 * Evento búsqueda
 */
searchButton.addEventListener("click", () => {
    fetchCharacters(
        searchInput.value.trim(),
        statusFilter.value
    );
});

/**
 * Buscar con Enter
 */
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchCharacters(
            searchInput.value.trim(),
            statusFilter.value
        );
    }
});

/**
 * ===== MODO OSCURO / CLARO =====
 */

// Cargar tema guardado
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    fetchCharacters();
});

// Alternar tema
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});