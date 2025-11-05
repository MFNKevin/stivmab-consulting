// i18next-init.js

const resources = {
  fr: {
    translation: {
      // ==== Navigation ====
      title: "StivMab Consulting",
      navHome: "Accueil",
      navCoaching: "Coaching",
      navFormation: "Formation",
      navInvestissement: "Investissements",
      navContact: "Contact",
      navLogin: "Connexion",

      // ==== Section Héro ====
      heroTitle: "Bienvenue chez <span>StivMab Consulting</span>",
      heroSubtitle: "Votre partenaire pour réussir votre projet d’étude et d’investissement à l'étranger.",
      heroBtn: "Découvrir nos coachings",

      // ==== Section Présentation ====
      aboutTitle: "Qui sommes-nous ?",
      aboutText: "StivMab Consulting est un cabinet spécialisé dans l’accompagnement académique et l’investissement à l’étranger. Nous vous guidons pas à pas dans vos démarches pour concrétiser vos ambitions.",
      aboutMission: "Notre mission : transformer vos projets en réussites concrètes.",

      // ==== Section Services / Coaching ====
      coachingTitle: "Nos coachings",
      coachingSubtitle: "Découvrez nos programmes d’accompagnement personnalisés.",
      levelLabel: "Niveau",
      allLevels: "Tous niveaux",
      loading: "Chargement des coachings...",
      serviceStudy: "Études à l'étranger",
      serviceInvest: "Investissement international",
      serviceCareer: "Orientation & Carrière",

      // ==== Section Contact ====
      contactTitle: "Contactez-nous",
      contactSubtitle: "Besoin d’aide ? Écrivez-nous ou planifiez un rendez-vous avec nos conseillers.",
      contactName: "Nom complet",
      contactEmail: "Adresse e-mail",
      contactMessage: "Votre message",
      contactBtn: "Envoyer",

      // ==== Pied de page ====
      footerRights: "© 2025 StivMab Consulting. Tous droits réservés.",
      footerFollow: "Suivez-nous"
    }
  },

  en: {
    translation: {
      // ==== Navigation ====
      title: "StivMab Consulting",
      navHome: "Home",
      navCoaching: "Coaching",
      navFormation: "Formation",
      navInvestissement: "Investments",
      navContact: "Contact",
      navLogin: "Login",

      // ==== Hero Section ====
      heroTitle: "Welcome to <span>StivMab Consulting</span>",
      heroSubtitle: "Your partner to succeed in your study and investment projects abroad.",
      heroBtn: "Discover our coaching",

      // ==== About Section ====
      aboutTitle: "Who are we?",
      aboutText: "StivMab Consulting is a consulting firm specialized in academic support and international investment. We guide you every step of the way to make your ambitions a reality.",
      aboutMission: "Our mission: turning your projects into concrete success.",

      // ==== Coaching Section ====
      coachingTitle: "Our Coachings",
      coachingSubtitle: "Discover our personalized coaching programs.",
      levelLabel: "Level",
      allLevels: "All levels",
      loading: "Loading coachings...",
      serviceStudy: "Study Abroad",
      serviceInvest: "International Investment",
      serviceCareer: "Career Guidance",

      // ==== Contact Section ====
      contactTitle: "Contact Us",
      contactSubtitle: "Need help? Write to us or book an appointment with our advisors.",
      contactName: "Full Name",
      contactEmail: "Email Address",
      contactMessage: "Your Message",
      contactBtn: "Send",

      // ==== Footer ====
      footerRights: "© 2025 StivMab Consulting. All rights reserved.",
      footerFollow: "Follow us"
    }
  },

  de: {
    translation: {
      // ==== Navigation ====
      title: "StivMab Consulting",
      navHome: "Startseite",
      navCoaching: "Coaching",
      navFormation: "Ausbildung",
      navInvestissement: "Investitionen",
      navContact: "Kontakt",
      navLogin: "Login",

      // ==== Hero Abschnitt ====
      heroTitle: "Willkommen bei <span>StivMab Consulting</span>",
      heroSubtitle: "Ihr Partner für erfolgreiche Studien- und Investitionsprojekte im Ausland.",
      heroBtn: "Entdecken Sie unser Coaching",

      // ==== Über uns ====
      aboutTitle: "Wer sind wir?",
      aboutText: "StivMab Consulting ist ein Beratungsunternehmen, das sich auf akademische Unterstützung und internationale Investitionen spezialisiert hat. Wir begleiten Sie auf jedem Schritt Ihres Erfolgsweges.",
      aboutMission: "Unsere Mission: Ihre Projekte in echte Erfolge zu verwandeln.",

      // ==== Coaching ====
      coachingTitle: "Unsere Coachings",
      coachingSubtitle: "Entdecken Sie unsere personalisierten Coaching-Programme.",
      levelLabel: "Stufe",
      allLevels: "Alle Stufen",
      loading: "Coachings werden geladen...",
      serviceStudy: "Studium im Ausland",
      serviceInvest: "Internationale Investitionen",
      serviceCareer: "Karriereberatung",

      // ==== Kontakt ====
      contactTitle: "Kontaktieren Sie uns",
      contactSubtitle: "Brauchen Sie Hilfe? Schreiben Sie uns oder vereinbaren Sie einen Termin mit unseren Beratern.",
      contactName: "Vollständiger Name",
      contactEmail: "E-Mail-Adresse",
      contactMessage: "Ihre Nachricht",
      contactBtn: "Senden",

      // ==== Fußzeile ====
      footerRights: "© 2025 StivMab Consulting. Alle Rechte vorbehalten.",
      footerFollow: "Folgen Sie uns"
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
