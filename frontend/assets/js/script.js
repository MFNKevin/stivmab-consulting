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

/* ============================
   MENU HAMBURGER - JAVASCRIPT
============================ */

document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.getElementById('navbarMenu');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-links a');

  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  body.appendChild(overlay);

  // Toggle menu
  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
  }

  // Fermer le menu
  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  }

  // Event listeners
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
  }

  // Fermer en cliquant sur l'overlay
  overlay.addEventListener('click', closeMenu);

  // Fermer en cliquant sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Petit délai pour voir l'effet du clic
      setTimeout(closeMenu, 200);
    });
  });

  // Fermer avec la touche Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Gérer le redimensionnement de la fenêtre
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Fermer le menu si on passe à desktop
      if (window.innerWidth >= 992) {
        closeMenu();
      }
    }, 250);
  });

  // Support du touch pour mobile
  let touchStartX = 0;
  let touchEndX = 0;

  navMenu.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  navMenu.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    // Swipe vers la GAUCHE pour fermer (< -50px)
    if (touchEndX < touchStartX - 50) {
      closeMenu();
    }
  }
});

