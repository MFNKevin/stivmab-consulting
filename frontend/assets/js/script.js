// URL de ton API FastAPI
const API_URL = "http://127.0.0.1:8000/coachings";

async function fetchCoachings() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erreur lors de la récupération des coachings");
    const data = await response.json();
    displayCoachings(data);
  } catch (error) {
    console.error(error);
    document.getElementById("coachings-container").innerHTML = "<p>Impossible de charger les coachings.</p>";
  }
}

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


