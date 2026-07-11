// script.js
(() => {
  const DEFAULT_LANG = 'en';
  const DEFAULT_THEME = 'dark'; // dark is primary

  const translations = {
    en: {
      title: 'Token Scratch Web3 Standards',
      desc: 'Create your first token from scratch using Web3 standards. Metamask and RPC configured; deployed via Remix IDE.',
      overview: 'Token Overview',
      steps: 'Quick Steps',
      actions: 'Demo Actions',
      copySnippet: 'Copy sample snippet',
      openRemix: 'Open Remix (link)',
      footer: 'Built for training HTML5 CSS3 JS with semantics and accessibility.',
      themeDark: 'Dark',
      themeLight: 'Light',
      actionsDesc: 'These buttons are UI-only helpers for your local demo.'
    },
    pt: {
      title: 'Token Scratch Padrões Web3',
      desc: 'Crie seu primeiro token do zero usando padrões Web3. Metamask e RPC configurados; deploy via Remix IDE.',
      overview: 'Visão Geral do Token',
      steps: 'Passos Rápidos',
      actions: 'Ações de Demonstração',
      copySnippet: 'Copiar snippet de exemplo',
      openRemix: 'Abrir Remix (link)',
      footer: 'Construído para treinar HTML5 CSS3 JS com semântica e acessibilidade.',
      themeDark: 'Escuro',
      themeLight: 'Claro',
      actionsDesc: 'Esses botões são apenas auxiliares de UI para sua demo local.'
    },
    es: {
      title: 'Token Scratch Estándares Web3',
      desc: 'Crea tu primer token desde cero usando estándares Web3. Metamask y RPC configurados; desplegado con Remix IDE.',
      overview: 'Resumen del Token',
      steps: 'Pasos Rápidos',
      actions: 'Acciones de Demostración',
      copySnippet: 'Copiar fragmento de ejemplo',
      openRemix: 'Abrir Remix (enlace)',
      footer: 'Construido para entrenar HTML5 CSS3 JS con semántica y accesibilidad.',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      actionsDesc: 'Estos botones son solo ayudas de UI para tu demo local.'
    }
  };

  // Elements
  const htmlEl = document.documentElement;
  const langSelect = document.getElementById('lang-select');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const siteTitle = document.getElementById('site-title');
  const heroDesc = document.getElementById('hero-desc');
  const overviewTitle = document.getElementById('overview-title');
  const actionsTitle = document.getElementById('actions-title');
  const copyBtn = document.getElementById('copy-snippet');
  const openRemixBtn = document.getElementById('open-remix');
  const actionsDesc = document.getElementById('actions-desc');
  const footerText = document.getElementById('footer-text');

  // Load preferences
  const savedLang = localStorage.getItem('ui-lang') || DEFAULT_LANG;
  const savedTheme = localStorage.getItem('ui-theme') || DEFAULT_THEME;

  // Initialize UI
  function applyLanguage(lang) {
    const t = translations[lang] || translations[DEFAULT_LANG];
    siteTitle.textContent = t.title;
    heroDesc.textContent = t.desc;
    overviewTitle.textContent = t.overview;
    actionsTitle.textContent = t.actions;
    copyBtn.textContent = t.copySnippet;
    openRemixBtn.textContent = t.openRemix;
    actionsDesc.textContent = t.actionsDesc;
    footerText.textContent = t.footer;
    themeText.textContent = (getTheme() === 'dark') ? t.themeDark : t.themeLight;
    // set lang attribute for accessibility
    document.documentElement.lang = (lang === 'en') ? 'en' : (lang === 'pt') ? 'pt-BR' : 'es';
    // announce change for screen readers
    const live = document.getElementById('aria-live');
    if (live) live.textContent = t.title;
  }

  function setTheme(theme) {
    if (theme === 'light') {
      htmlEl.classList.add('light');
      themeToggle.setAttribute('aria-pressed', 'false');
      // sun icon
      themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true">
        <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.03-2.61l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM17 11v2h3v-2h-3zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/>
      </svg>`;
    } else {
      htmlEl.classList.remove('light');
      themeToggle.setAttribute('aria-pressed', 'true');
      // moon icon
      themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
      </svg>`;
    }
    // update theme text label
    const lang = localStorage.getItem('ui-lang') || DEFAULT_LANG;
    themeText.textContent = (theme === 'dark') ? translations[lang].themeDark : translations[lang].themeLight;
    localStorage.setItem('ui-theme', theme);
  }

  function getTheme() {
    return localStorage.getItem('ui-theme') || DEFAULT_THEME;
  }

  // Event handlers
  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('ui-lang', lang);
    applyLanguage(lang);
  });

  themeToggle.addEventListener('click', () => {
    const newTheme = (getTheme() === 'dark') ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Buttons
  copyBtn.addEventListener('click', () => {
    const tpl = document.getElementById('sample-snippet').textContent.trim();
    navigator.clipboard?.writeText(tpl).then(() => {
      copyBtn.textContent = translations[localStorage.getItem('ui-lang') || DEFAULT_LANG].copySnippet + ' ✓';
      setTimeout(() => applyLanguage(localStorage.getItem('ui-lang') || DEFAULT_LANG), 1200);
    }).catch(() => {
      alert('Copy failed. Please copy manually.');
    });
  });

  openRemixBtn.addEventListener('click', () => {
    // open Remix IDE in a new tab (user can use it locally)
    window.open('https://remix.ethereum.org', '_blank', 'noopener');
  });

  // Initialize selects and theme
  function init() {
    langSelect.value = savedLang;
    applyLanguage(savedLang);
    setTheme(savedTheme);

    // Accessibility: add aria-live region for announcements
    const live = document.createElement('div');
    live.id = 'aria-live';
    live.setAttribute('aria-live', 'polite');
    live.className = 'visually-hidden';
    document.body.appendChild(live);

    // Keyboard: allow toggle with Enter/Space
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

  init();
})();
