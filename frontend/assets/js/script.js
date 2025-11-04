// URL de l'API
const API_URL = "http://127.0.0.1:8000/coachings";

// Récupération des coachings
async function fetchCoachings() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayCoachings(data);
  } catch (error) {
    console.error("Erreur lors du chargement des coachings:", error);
  }
}

// Affichage dans la page
function displayCoachings(coachings) {
  const container = document.getElementById("coachings-container");
  container.innerHTML = "";

  coachings.forEach(coaching => {
    const card = document.createElement("div");
    card.classList.add("coaching-card");

    card.innerHTML = `
      <h3>${coaching.titre}</h3>
      <p>${coaching.description}</p>
      <p><strong>Niveau:</strong> ${coaching.niveau || "Tous niveaux"}</p>
    `;

    container.appendChild(card);
  });
}

// Appel de la fonction
fetchCoachings();
