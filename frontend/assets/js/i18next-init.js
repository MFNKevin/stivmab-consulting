// i18next-init.js

// This file initializes i18next using the http backend to load locale JSON files
// Locale files are expected at: /assets/locales/<lng>.json

document.addEventListener("DOMContentLoaded", () => {
  const supportedLangs = ['fr', 'en', 'de'];

  // Récupère la langue sauvegardée ou la langue du navigateur
  let savedLang = localStorage.getItem('language') || (navigator.language || 'fr').split('-')[0];
  if (!supportedLangs.includes(savedLang)) savedLang = 'fr';

  // Configure i18next to use http backend and browser language detector
  if (typeof i18next === 'undefined') {
    console.error('i18next is not loaded');
    return;
  }

  // Use the http backend if available
  if (typeof i18nextHttpBackend !== 'undefined') {
    i18next.use(i18nextHttpBackend);
  }
  if (typeof i18nextBrowserLanguageDetector !== 'undefined') {
    i18next.use(i18nextBrowserLanguageDetector);
  }

  i18next.init({
    lng: savedLang,
    fallbackLng: 'fr',
    debug: false,
    backend: {
      loadPath: '/assets/locales/{{lng}}.json'
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  }, function(err, t) {
    if (err) console.error('i18next init error', err);
    updateContent();
    if (typeof fetchCoachings === 'function') fetchCoachings();
  });

  // Update page content for data-i18n attributes
  function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = i18next.t(key);
      if (translation && translation.indexOf('<') !== -1) {
        el.innerHTML = translation;
      } else {
        el.innerText = translation || '';
      }
    });
  }

  // Expose a global changeLanguage for other scripts and inline handlers
  window.changeLanguage = function(lang) {
    if (!supportedLangs.includes(lang)) return;
    i18next.changeLanguage(lang, () => {
      updateContent();
      localStorage.setItem('language', lang);
      if (typeof fetchCoachings === 'function') fetchCoachings();
    });
  };

  // --- Gestion du menu déroulant sur le logo (si présent) ---
  const logoDropdown = document.querySelector(".logo-dropdown");
  const langMenu = logoDropdown ? logoDropdown.querySelector(".lang-menu") : null;
  const logo = document.getElementById("logo");
  if (logo && langMenu) {
    logo.addEventListener("click", (e) => {
      e.stopPropagation();
      langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
    });

    langMenu.querySelectorAll("li").forEach(li => {
      li.addEventListener("click", (e) => {
        const selectedLang = li.getAttribute("data-lang");
        window.changeLanguage(selectedLang);
        langMenu.style.display = "none";
      });
    });

    document.addEventListener("click", () => {
      langMenu.style.display = "none";
    });
  }
});
  fr: {
    translation: {
      // ==== Navigation ====
      title: "StivMab Consulting";
      navHome: "Accueil";
      navCoaching: "Coaching";
      navFormation: "Formation";
      navInvestissement: "Investissements";
      navContact: "Contact";
      navLogin: "Connexion";
      langLabel: "Français";

      // ==== Section Héro ====
      heroTitle: "Bienvenue chez <span>StivMab Consulting</span>";
      heroSubtitle: "Votre partenaire pour réussir votre projet D'immigration et d’investissement à l'étranger.";
      heroBtn: "Découvrir nos coachings";

      // ==== Section Présentation ====
      aboutTitle: "Qui sommes-nous ?";
      aboutText: "StivMab Consulting est un cabinet spécialisé dans l’accompagnement académique et l’investissement à l’étranger. Nous vous guidons pas à pas dans vos démarches pour concrétiser vos ambitions.";
      aboutwhat: "En savoir plus";
      aboutMission: "Notre mission : transformer vos projets en réussites concrètes.";

      // ==== Coaching ====
      coachingTitle: "Nos coachings";
      coachingSubtitle: "Découvrez nos programmes d’accompagnement personnalisés.";
      levelLabel: "Niveau";
      allLevels: "Tous niveaux";
      loading: "Chargement des coachings...";
      
      // ==== Section Services  ====     
      servicesTitle: "Nos Services";
      servicesSubtitle: "Découvrez nos programmes d’accompagnement personnalisés.";
      serviceStudy: "Études à l'étranger";
      serviceInvest: "Investissement international";
      serviceCareer: "Orientation & Carrière";
      service1Title: "Aide à l'obtention du passeport";
      service1Text: "Accompagnement administratif complet.";
      service2Title: "Aide à l'obtention du visa";
      service2Text: "Préparation dossier et coachings.";
      service3Title: "Accompagnement complet";
      service3Text: "Suivi personnalisé du processus.";
      service4Title: "Management";
      service4Text: "Conseil et gestion de projet.";
      servicewhat: "En savoir plus";


      // ==== Section Testimonials ====
      testimonialsTitle: "Témoignages";
      testimonialsTitle1: "Belvitas Lucas";
      testimonialsTitle2: "Morojink";
      testimonialsTitle3: "Client";
      testimonialsTitle4: "Client";
      testimonialsTitle5: "Service impeccable et rapide.";
      testimonialsTitle6: "Très bon accompagnement, très professionnel.";

      // ==== Section Contact ====
      contactTitle: "Contactez-nous";
      contactSubtitle: "Besoin d’aide ? Écrivez-nous ou planifiez un rendez-vous avec nos conseillers.";
      contactName: "Nom complet";
      contactEmail: "Adresse e-mail";
      contactMessage: "Votre message";
      contactBtn: "Envoyer";


       // ==== Section Projet ====
      projectTitle: "Nos Projets Réussis";
      projectSubtitle1: "Projet 1";
      projectSubtitle2: "Projet 2";
      projectSubtitle3: "Projet 3";

      
      // ==== Pied de page ====
      footerRights: "© 2025 StivMab Consulting. Tous droits réservés.";
      footerFollow: "Suivez-nous";
    }
  }

  en: {
    translation: {
      // ==== Navigation ====
      title: "StivMab Consulting";
      navHome: "Home";
      navCoaching: "Coaching";
      navFormation: "Formation";
      navInvestissement: "Investments";
      navContact: "Contact";
      navLogin: "Login";
      langLabel: "Anglais";

      // ==== Hero Section ====
      heroTitle: "Welcome to <span>StivMab Consulting</span>";
      heroSubtitle: "Your partner to succeed in your study and investment projects abroad.";
      heroBtn: "Discover our coaching";


      // ==== Section Services  ====     
      servicesTitle: "Our Services";
      servicesSubtitle: "Discover our personalized support programs.";
      serviceStudy: "Study Abroad";
      serviceInvest: "International Investment";
      serviceCareer: "Guidance & Career";
      service1Title: "Passport Assistance";
      service1Text: "Complete Administrative Support.";
      service2Title: "Visa Assistance";
      service2Text: "Application Preparation and Coaching.";
      service3Title: "Comprehensive Support";
      service3Text: "Personalized Process Monitoring.";
      service4Title: "Management";
      service4Text: "Consulting and Project Management.";
      servicewhat: "Learn More";
      
      // ==== About Section ====
      aboutTitle: "Who are we?";
      aboutText: "StivMab Consulting is a consulting firm specialized in academic support and international investment. We guide you every step of the way to make your ambitions a reality.";
      aboutwhat: "Learn more";
      aboutMission: "Our mission: turning your projects into concrete success.";

      // ==== Coaching Section ====
      coachingTitle: "Our Coachings";
      coachingSubtitle: "Discover our personalized coaching programs.";
      levelLabel: "Level";
      allLevels: "All levels";
      loading: "Loading coachings...";
      serviceStudy: "Study Abroad";
      serviceInvest: "International Investment";
      serviceCareer: "Career Guidance";

      // ==== Section Projet ====
      projectTitle: "Our Successful Projects";
      projectSubtitle1: "Project 1";
      projectSubtitle2: "Project 2";
      projectSubtitle3: "Project 3";

      // ==== Section Testimonials ====
      testimonialsTitle: "Testimonials";
      testimonialsTitle1: "Belvitas Lucas";
      testimonialsTitle2: "Morojink";
      testimonialsTitle3: "Customer";
      testimonialsTitle4: "Customer";
      testimonialsTitle5: "Impeccable and fast service.";
      testimonialsTitle6: "Excellent support, very professional.";

      // ==== Contact Section ====
      contactTitle: "Contact Us";
      contactSubtitle: "Need help? Write to us or book an appointment with our advisors.";
      contactName: "Full Name";
      contactEmail: "Email Address";
      contactMessage: "Your Message";
      contactBtn: "Send";

      // ==== Footer ====
      footerRights: "© 2025 StivMab Consulting. All rights reserved.";
      footerFollow: "Follow us";
    }
  }

  de: {
    translation: {
      // ==== Navigation ====
      title: "StivMab Consulting";
      navHome: "Startseite";
      navCoaching: "Coaching";
      navFormation: "Ausbildung";
      navInvestissement: "Investitionen";
      navContact: "Kontakt";
      navLogin: "Login";
      langLabel: "Allemand";

      // ==== Hero Abschnitt ====
      heroTitle: "Willkommen bei <span>StivMab Consulting</span>";
      heroSubtitle: "Ihr Partner für erfolgreiche Studien- und Investitionsprojekte im Ausland.";
      heroBtn: "Entdecken Sie unser Coaching";

      // ==== Über uns ====
      aboutTitle: "Wer sind wir?";
      aboutText: "StivMab Consulting ist ein Beratungsunternehmen, das sich auf akademische Unterstützung und internationale Investitionen spezialisiert hat. Wir begleiten Sie auf jedem Schritt Ihres Erfolgsweges.";
      aboutwhat: "Erfahren Sie mehr";
      aboutMission: "Unsere Mission: Ihre Projekte in echte Erfolge zu verwandeln.";

// ==== Section Services  ====     
      servicesTitle: "Unsere Dienstleistungen";
      servicesSubtitle: "Entdecken Sie unsere individuellen Förderprogramme.";
      serviceStudy: "Auslandsstudium";
      serviceInvest: "Internationale Investitionen";
      serviceCareer: "Beratung & Karriere";
      service1Title: "Passhilfe";
      service1Text: "Umfassende administrative Unterstützung.";
      service2Title: "Visumhilfe";
      service2Text: "Vorbereitung und Beratung bei der Antragstellung.";
      service3Title: "Umfassende Unterstützung";
      service3Text: "Individuelle Prozessüberwachung";
      service4Title: "Management";
      service4Text: "Beratung und Projektmanagement.";
      servicewhat: "Mehr erfahren";

      // ==== Coaching ====
      coachingTitle: "Unsere Coachings";
      coachingSubtitle: "Entdecken Sie unsere personalisierten Coaching-Programme.";
      levelLabel: "Stufe";
      allLevels: "Alle Stufen";
      loading: "Coachings werden geladen...";
      serviceStudy: "Studium im Ausland";
      serviceInvest: "Internationale Investitionen";
      serviceCareer: "Karriereberatung";


      // ==== Section Projet ====
      projectTitle: "Unsere erfolgreichen Projekte";
      projectSubtitle1: "Projekt 1";
      projectSubtitle2: "Projekt 2";
      projectSubtitle3: "Projekt 3";

// ==== Section Testimonials ====
      testimonialsTitle: "Kundenstimmen";
      testimonialsTitle1: "Belvitas Lucas";
      testimonialsTitle2: "Morojink";
      testimonialsTitle3: "Kunde";
      testimonialsTitle4: "Kunde";
      testimonialsTitle5: "Einwandfreier und schneller Service.";
      testimonialsTitle6: "Hervorragender Support, sehr professionell.";

      // ==== Kontakt ====
      contactTitle: "Kontaktieren Sie uns";
      contactSubtitle: "Brauchen Sie Hilfe? Schreiben Sie uns oder vereinbaren Sie einen Termin mit unseren Beratern.";
      contactName: "Vollständiger Name";
      contactEmail: "E-Mail-Adresse";
      contactMessage: "Ihre Nachricht";
      contactBtn: "Senden";

      // ==== Fußzeile ====
      footerRights: "© 2025 StivMab Consulting. Alle Rechte vorbehalten.";
      footerFollow: "Folgen Sie uns";
    }
  }



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
