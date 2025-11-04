// i18next-init.js

const resources = {
  fr: {
    translation: {
      title: "StivMab Consulting",
      navHome: "Accueil",
      navCoaching: "Coaching",
      navAbout: "À propos",
      navContact: "Contact",
      navLogin: "Connexion",
      heroTitle: "Bienvenue chez <span>StivMab Consulting</span>",
      heroSubtitle: "Votre partenaire pour réussir votre projet d’étude et d’investissement à l'étranger.",
      heroBtn: "Découvrir nos coachings",
      coachingTitle: "Nos coachings",
      levelLabel: "Niveau",
      allLevels: "Tous niveaux",
      loading: "Chargement des coachings..."
    }
  },
  en: {
    translation: {
      title: "StivMab Consulting",
      navHome: "Home",
      navCoaching: "Coaching",
      navAbout: "About",
      navContact: "Contact",
      navLogin: "Login",
      heroTitle: "Welcome to <span>StivMab Consulting</span>",
      heroSubtitle: "Your partner to succeed in your study and investment projects abroad.",
      heroBtn: "Discover our coaching",
      coachingTitle: "Our Coaching",
      levelLabel: "Level",
      allLevels: "All levels",
      loading: "Loading coachings..."
    }
  },
  de: {
    translation: {
      title: "StivMab Consulting",
      navHome: "Startseite",
      navCoaching: "Coaching",
      navAbout: "Über uns",
      navContact: "Kontakt",
      navLogin: "Login",
      heroTitle: "Willkommen bei <span>StivMab Consulting</span>",
      heroSubtitle: "Ihr Partner für erfolgreiche Studien- und Investitionsprojekte im Ausland.",
      heroBtn: "Entdecken Sie unser Coaching",
      coachingTitle: "Unsere Coachings",
      levelLabel: "Stufe",
      allLevels: "Alle Stufen",
      loading: "Coachings werden geladen..."
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const supportedLangs = ['fr', 'en', 'de'];

  // Récupère la langue sauvegardée ou détecte automatiquement
  let savedLang = localStorage.getItem('language') || navigator.language.split('-')[0] || 'fr';
  if (!supportedLangs.includes(savedLang)) savedLang = 'fr';

  // Initialisation de i18next
  i18next.init({
    lng: savedLang,
    fallbackLng: 'fr',
    resources: resources
  }, function(err, t) {
    updateContent();
  });

  // Fonction pour mettre à jour tous les textes
  function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = i18next.t(key);
      if (translation.includes('<')) {
        el.innerHTML = translation;
      } else {
        el.innerText = translation;
      }
    });
  }

  // Changer la langue et sauvegarder
  function changeLanguage(lang) {
    i18next.changeLanguage(lang, () => {
      updateContent();
      localStorage.setItem('language', lang);
      if (typeof fetchCoachings === "function") fetchCoachings();
    });
  }

  // --- Gestion du menu déroulant sur le logo ---
  const logoDropdown = document.querySelector(".logo-dropdown");
  const langMenu = logoDropdown.querySelector(".lang-menu");

  // Ouvrir/fermer le menu au clic sur le logo
  const logo = document.getElementById("logo");
  logo.addEventListener("click", (e) => {
    e.stopPropagation(); // empêche la propagation
    langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
  });

  // Changer de langue au clic sur un élément du menu et fermer le menu
  langMenu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", (e) => {
      const selectedLang = li.getAttribute("data-lang");
      changeLanguage(selectedLang);
      langMenu.style.display = "none"; // ferme le menu
    });
  });

  // Fermer le menu si clic en dehors
  document.addEventListener("click", () => {
    langMenu.style.display = "none";
  });
});
