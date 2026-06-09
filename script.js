const API_KEY = "6fd80f8e";

const filme = [
  "Interstellar","John Wick","Dune",
  "Avatar","Oppenheimer", "The Dark Knight", "Inception",
  "The Shawshank Redemption", "Forrest Gump", "The Matrix","Gladiator", "The Godfather", "Pulp Fiction", "Fight Club"
];

const seriale = [
  "Sherlock", "The Office","Friends",
  "The Crown","Breaking Bad", "Game of Thrones", "Stranger Things",
  "The Witcher", "The Mandalorian", "Black Mirror",
  "Peaky Blinders", "Dark", "Squid Game", "Chernobyl"
];

function getList(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}

function toggleList(key, titlu, btn) {
  let lista = getList(key);
  const idx = lista.indexOf(titlu);
  if (idx === -1) {
    lista.push(titlu);
    btn.classList.add("active");
    showToast(key === "favorite" ? `❤ Adăugat la Favorite` : `🔖 Adăugat la Watchlist`);
  } else {
    lista.splice(idx, 1);
    btn.classList.remove("active");
    showToast(key === "favorite" ? `Eliminat din Favorite` : `Eliminat din Watchlist`);
  }
  localStorage.setItem(key, JSON.stringify(lista));
}

function showToast(msg) {
  let toast = document.getElementById("toast-msg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-msg";
    toast.style.cssText = "position:fixed;bottom:28px;right:28px;background:#1a1a1f;border:1px solid #3b6ff5;color:#e8e8f0;padding:10px 18px;border-radius:8px;font-size:.88rem;font-weight:600;z-index:9999;opacity:0;transition:opacity .3s;pointer-events:none;";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

function creeazaCard(film, isGrid) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (isGrid) card.classList.add("card-grid");

  const favActive = getList("favorite").includes(film.Title) ? "active" : "";
  const wlActive  = getList("watchlist").includes(film.Title) ? "active" : "";

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${film.Poster}" alt="${film.Title}" class="card-poster">
      <div class="card-action-btns">
        <button class="card-action-btn fav-btn ${favActive}" title="Adauga la Favorite" data-titlu="${film.Title}">
          <svg fill="${favActive ? '#ef4444' : '#a1a1a96c'}" stroke="${favActive ? '#ef4444' : '#3b3b3b'}" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
        <button class="card-action-btn wl-btn ${wlActive}" title="Adauga la Watchlist" data-titlu="${film.Title}">
          <svg fill="${wlActive ? '#3b6ff5' : '#a1a1a96c'}" stroke="${wlActive ? '#3b6ff5' : '#3b3b3b'}" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-name">${film.Title}</div>
      <div class="card-year">${film.Year}</div>
      <div class="card-rating">⭐ ${film.imdbRating}</div>
    </div>
  `;

  card.querySelector(".fav-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    toggleList("favorite", film.Title, btn);
    const svg = btn.querySelector("svg");
    const isActive = btn.classList.contains("active");
    svg.setAttribute("fill", isActive ? "#ef4444" : "#6b6b80");
    svg.setAttribute("stroke", isActive ? "#ef4444" : "#2a2a38");
  });

  card.querySelector(".wl-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    toggleList("watchlist", film.Title, btn);
    const svg = btn.querySelector("svg");
    const isActive = btn.classList.contains("active");
    svg.setAttribute("fill", isActive ? "#3b6ff5" : "#6b6b80");
    svg.setAttribute("stroke", isActive ? "#3b6ff5" : "#2a2a38");
  });

  return card;
}

const filmCache = {};
const serialCache = {};

async function incarcaFilme(lista, containerId, cache) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (const titlu of lista) {
    try {
      let film = cache[titlu];
      if (!film) {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titlu)}&apikey=${API_KEY}`);
        film = await response.json();
        if (film.Response === "True") cache[titlu] = film;
      }
      if (film && film.Response === "True") {
        container.appendChild(creeazaCard(film, false));
      }
    } catch (error) {
      console.error("Eroare:", error);
    }
  }
}

async function incarcaGrid(lista, containerId, cache) {
  const container = document.getElementById(containerId);
  if (!container || container.childElementCount > 0) return;
  for (const titlu of lista) {
    try {
      let film = cache[titlu];
      if (!film) {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titlu)}&apikey=${API_KEY}`);
        film = await response.json();
        if (film.Response === "True") cache[titlu] = film;
      }
      if (film && film.Response === "True") {
        container.appendChild(creeazaCard(film, true));
      }
    } catch (error) {
      console.error("Eroare:", error);
    }
  }
}

function initSageti() {
  document.querySelectorAll(".slider-wrapper").forEach(wrapper => {
    const row = wrapper.querySelector(".cards-row");
    const btnNext = wrapper.querySelector(".arrow-next");
    const btnPrev = wrapper.querySelector(".arrow-prev");
    if (!row || !btnNext || !btnPrev) return;

    btnNext.addEventListener("click", () => {
      row.scrollBy({ left: 440, behavior: "smooth" });
    });
    btnPrev.addEventListener("click", () => {
      row.scrollBy({ left: -440, behavior: "smooth" });
    });
    row.addEventListener("scroll", () => {
      btnPrev.style.opacity = row.scrollLeft > 0 ? "1" : "0";
      btnPrev.style.pointerEvents = row.scrollLeft > 0 ? "auto" : "none";
    });
  });
}

function setTopnavActiv(index) {
  document.querySelectorAll(".topnav-link").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

function ascundeToate() {
  document.getElementById("page-acasa").style.display  = "none";
  document.getElementById("page-filme").style.display  = "none";
  document.getElementById("page-seriale").style.display = "none";
  document.getElementById("page-list").style.display   = "none";
}

function showPage(page) {
  ascundeToate();
  document.getElementById("page-" + page).style.display = "";

  if (page === "filme")   incarcaGrid(filme, "movies-grid", filmCache);
  if (page === "seriale") incarcaGrid(seriale, "series-grid", serialCache);

  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const activ = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (activ) activ.classList.add("active");

  setTopnavActiv(0);
}

function showListPage(listKey) {
  ascundeToate();
  document.getElementById("page-list").style.display = "";

  document.getElementById("list-page-title").textContent = listKey === "favorite" ? "Favorite" : "Watchlist";

  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const activ = document.querySelector(`.nav-item[data-list="${listKey}"]`);
  if (activ) activ.classList.add("active");
  setTopnavActiv(1);

  const container = document.getElementById("list-container");
  container.innerHTML = "";

  const lista = getList(listKey);

  if (lista.length === 0) {
    container.innerHTML = `<p style="color:var(--muted);font-size:.95rem;padding:20px 0;">Nu ai adăugat nimic încă.</p>`;
    return;
  }

  const allCache = { ...filmCache, ...serialCache };

  lista.forEach(titlu => {
    const film = allCache[titlu];
    if (film) {
      container.appendChild(creeazaCard(film, true));
    } else {
      fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titlu)}&apikey=${API_KEY}`)
        .then(r => r.json())
        .then(film => {
          if (film.Response === "True") {
            filmCache[film.Title] = film;
            container.appendChild(creeazaCard(film, true));
          }
        });
    }
  });
}

document.querySelectorAll(".nav-item[data-page]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(el.dataset.page);
  });
});

document.querySelectorAll(".nav-item[data-list]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showListPage(el.dataset.list);
  });
});

const topnavAcasa = document.getElementById("topnav-acasa");
if (topnavAcasa) {
  topnavAcasa.addEventListener("click", (e) => {
    e.preventDefault();
    showPage("acasa");
  });
}

async function init() {
  await Promise.all([
    incarcaFilme(filme, "movies-container", filmCache),
    incarcaFilme(seriale, "series-container", serialCache)
  ]);
  initSageti();
}

init();

window.addEventListener("DOMContentLoaded", () => {
  fetch("get_user.php")
    .then(r => r.json())
    .then(user => {
      if (!user || !user.username) {
        document.getElementById("authModal").classList.add("show");
      }
    })
    .catch(() => {
      document.getElementById("authModal").classList.add("show");
    });
});

function deschideProfilModal(user) {
  document.getElementById("profileInitials").textContent = user.username.slice(0, 2).toUpperCase();
  document.getElementById("profileName").textContent = user.username;
  document.getElementById("profileEmail").textContent = user.email;
  document.getElementById("edit-username").value = user.username;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("profileModal").classList.add("show");
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === limbaActiva);
  });
}

const traduceri = {
  ro: {
    nav_acasa: "Acasa", nav_filme: "Filme", nav_seriale: "Seriale",
    nav_favorite: "Favorite", nav_watchlist: "Watchlist",
    nav_recente: "Recente", nav_setari: "Setari",
    hero_title: "STRANGER THINGS", hero_desc: "Stranger Things este un serial SF și mister despre un grup de copii care descoperă experimente secrete, creaturi ciudate și o lume paralelă, după dispariția unui băiat.",
    btn_vizioneaza: "Vizioneaza", btn_detalii: "Vezi detalii",
    section_filme: "Filme populare", section_seriale: "Seriale populare",
    vezi_toate: "Vezi toate →",
    topnav_acasa: "Acasa", topnav_categorii: "Categorii", topnav_top: "Top",
    search_placeholder: "Cauta filme sau seriale...",
    continue_label: "CONTINUA VIZIONAREA",
    grid_filme: "Filme", grid_seriale: "Seriale",
    settings_notif_title: "Notificări email", settings_notif_desc: "Primește noutăți despre filme și seriale",
    lang_title: "Limbă interfață", lang_desc: "Schimbă limba site-ului",
    settings_dark_title: "Mod întunecat", settings_dark_desc: "Interfața cu fundal închis",
    settings_quality_title: "Calitate video", settings_quality_desc: "Rezoluția implicită la redare",
    tab_login: "Autentificare", tab_register: "Înregistrare",
    empty_list: "Nu ai adăugat nimic încă.",
  },
  en: {
    nav_acasa: "Home", nav_filme: "Movies", nav_seriale: "Series",
    nav_favorite: "Favorites", nav_watchlist: "Watchlist",
    nav_recente: "Recent", nav_setari: "Settings",
    hero_title: "STRANGER THINGS", hero_desc: "Stranger Things is a sci-fi mystery series about a group of kids who uncover secret experiments, strange creatures and a parallel world after a boy goes missing.",
    btn_vizioneaza: "Watch now", btn_detalii: "See details",
    section_filme: "Popular movies", section_seriale: "Popular series",
    vezi_toate: "See all →",
    topnav_acasa: "Home", topnav_categorii: "Categories", topnav_top: "Top", topnav_despre: "About",
    search_placeholder: "Search movies or series...",
    continue_label: "CONTINUE WATCHING",
    grid_filme: "Movies", grid_seriale: "Series",
    settings_notif_title: "Email notifications", settings_notif_desc: "Receive news about movies and series",
    lang_title: "Interface language", lang_desc: "Change the site language",
    settings_dark_title: "Dark mode", settings_dark_desc: "Interface with dark background",
    settings_quality_title: "Video quality", settings_quality_desc: "Default resolution for playback",
    tab_login: "Sign in", tab_register: "Register",
    empty_list: "You haven't added anything yet.",
  },
  ru: {
    nav_acasa: "Главная", nav_filme: "Фильмы", nav_seriale: "Сериалы",
    nav_favorite: "Избранное", nav_watchlist: "Список",
    nav_recente: "Недавние", nav_setari: "Настройки",
    hero_title: "STRANGER THINGS", hero_desc: "Очень странные дела — фантастический сериал о группе детей, которые обнаруживают секретные эксперименты, странных существ и параллельный мир после исчезновения мальчика.",
    btn_vizioneaza: "Смотреть", btn_detalii: "Подробнее",
    section_filme: "Популярные фильмы", section_seriale: "Популярные сериалы",
    vezi_toate: "Смотреть все →",
    topnav_acasa: "Главная", topnav_categorii: "Категории", topnav_top: "Топ", topnav_despre: "О нас",
    search_placeholder: "Поиск фильмов или сериалов...",
    continue_label: "ПРОДОЛЖИТЬ ПРОСМОТР",
    grid_filme: "Фильмы", grid_seriale: "Сериалы",
    settings_notif_title: "Email уведомления", settings_notif_desc: "Получайте новости о фильмах и сериалах",
    lang_title: "Язык интерфейса", lang_desc: "Изменить язык сайта",
    settings_dark_title: "Тёмный режим", settings_dark_desc: "Интерфейс с тёмным фоном",
    settings_quality_title: "Качество видео", settings_quality_desc: "Разрешение по умолчанию",
    tab_login: "Войти", tab_register: "Регистрация",
    empty_list: "Вы ещё ничего не добавили.",
  }
};

let limbaActiva = localStorage.getItem("limba") || "ro";

function aplicaLimba(lang) {
  limbaActiva = lang;
  localStorage.setItem("limba", lang);
  const t = traduceri[lang];

  function setLastText(el, text) {
    if (!el) return;
    for (let i = el.childNodes.length - 1; i >= 0; i--) {
      if (el.childNodes[i].nodeType === 3) {
        el.childNodes[i].textContent = " " + text;
        return;
      }
    }
    el.appendChild(document.createTextNode(" " + text));
  }

  document.querySelectorAll(".nav-item").forEach(el => {
    const text = el.textContent.trim();
    if (el.dataset.page === "acasa")     setLastText(el, t.nav_acasa);
    if (el.dataset.page === "filme")     setLastText(el, t.nav_filme);
    if (el.dataset.page === "seriale")   setLastText(el, t.nav_seriale);
    if (el.dataset.list === "favorite")  setLastText(el, t.nav_favorite);
    if (el.dataset.list === "watchlist") setLastText(el, t.nav_watchlist);
    if (text.includes("Recente") || text.includes("Recent") || text.includes("Недавние"))
      setLastText(el, t.nav_recente);
    if (text.includes("Setari") || text.includes("Settings") || text.includes("Настройки"))
      setLastText(el, t.nav_setari);
  });

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) heroTitle.textContent = t.hero_title;
  const heroDesc = document.querySelector(".hero-desc");
  if (heroDesc) heroDesc.textContent = t.hero_desc;

  const btnVizioneaza = document.querySelector(".hero-buttons .btn-primary");
  if (btnVizioneaza) setLastText(btnVizioneaza, t.btn_vizioneaza);

  const btnDetalii = document.querySelector(".btn-ghost");
  if (btnDetalii) btnDetalii.textContent = t.btn_detalii;

  const sectionTitles = document.querySelectorAll(".section-title");
  if (sectionTitles[0]) sectionTitles[0].textContent = t.section_filme;
  if (sectionTitles[1]) sectionTitles[1].textContent = t.section_seriale;
  document.querySelectorAll(".vezi-toate").forEach(el => el.textContent = t.vezi_toate);

  const topLinks = document.querySelectorAll(".topnav-link");
  if (topLinks[0]) topLinks[0].textContent = t.topnav_acasa;
  if (topLinks[1]) topLinks[1].textContent = t.topnav_categorii;
  if (topLinks[2]) topLinks[2].textContent = t.topnav_top;
  if (topLinks[3]) topLinks[3].textContent = t.topnav_despre;
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.placeholder = t.search_placeholder;

  const continueLabel = document.querySelector(".continue-label");
  if (continueLabel) continueLabel.textContent = t.continue_label;

  const gridFilme = document.querySelector("#page-filme .grid-page-title");
  if (gridFilme) gridFilme.textContent = t.grid_filme;
  const gridSeriale = document.querySelector("#page-seriale .grid-page-title");
  if (gridSeriale) gridSeriale.textContent = t.grid_seriale;

  const settingsRows = document.querySelectorAll(".settings-row-title");
  const settingsDescs = document.querySelectorAll(".settings-row-desc");
  if (settingsRows[0]) settingsRows[0].textContent = t.settings_notif_title;
  if (settingsDescs[0]) settingsDescs[0].textContent = t.settings_notif_desc;
  if (settingsRows[1]) settingsRows[1].textContent = t.lang_title;
  if (settingsDescs[1]) settingsDescs[1].textContent = t.lang_desc;
  if (settingsRows[2]) settingsRows[2].textContent = t.settings_dark_title;
  if (settingsDescs[2]) settingsDescs[2].textContent = t.settings_dark_desc;
  if (settingsRows[3]) settingsRows[3].textContent = t.settings_quality_title;
  if (settingsDescs[3]) settingsDescs[3].textContent = t.settings_quality_desc;

  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  if (tabLogin) tabLogin.textContent = t.tab_login;
  if (tabRegister) tabRegister.textContent = t.tab_register;

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function initLimba() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => aplicaLimba(btn.dataset.lang));
  });
  aplicaLimba(limbaActiva);
}

function initSistemAutentificare() {
  const avatarBtn    = document.getElementById("avatar-btn");
  const authModal    = document.getElementById("authModal");
  const closeModal   = document.getElementById("closeModal");
  const tabLogin     = document.getElementById("tab-login");
  const tabRegister  = document.getElementById("tab-register");
  const loginForm    = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  function initTrimitereDate() {
    async function trimiteDateFormular(e, formular) {
      e.preventDefault();
      const mesajVechi = formular.querySelector(".form-message");
      if (mesajVechi) mesajVechi.remove();
      const formData = new FormData(formular);
      try {
        const response = await fetch("procesare.php", { method: "POST", body: formData });
        const rezultat = await response.json();
        const mesajDiv = document.createElement("div");
        mesajDiv.classList.add("form-message");
        mesajDiv.textContent = rezultat.mesaj;
        if (rezultat.status === "succes") {
          mesajDiv.style.color = "#10b981";
          formular.reset();
          formular.insertBefore(mesajDiv, formular.querySelector("button"));
          setTimeout(() => {
            authModal.classList.remove("show");
            fetch("get_user.php").then(r => r.json()).then(user => {
              if (user && user.username) deschideProfilModal(user);
            }).catch(() => {});
          }, 1500);
        } else {
          mesajDiv.style.color = "#ef4444";
          formular.insertBefore(mesajDiv, formular.querySelector("button"));
        }
      } catch (error) {
        console.error("Eroare la comunicarea cu serverul:", error);
        alert("A apărut o eroare de rețea. Asigură-te că rulezi proiectul pe un server local (XAMPP)!");
      }
    }
    if (loginForm)    loginForm.addEventListener("submit",    (e) => trimiteDateFormular(e, loginForm));
    if (registerForm) registerForm.addEventListener("submit", (e) => trimiteDateFormular(e, registerForm));
  }

  initTrimitereDate();

  if (avatarBtn) {
    avatarBtn.addEventListener("click", () => {
      fetch("get_user.php").then(r => r.json()).then(user => {
        if (user && user.username) deschideProfilModal(user);
        else authModal.classList.add("show");
      }).catch(() => { authModal.classList.add("show"); });
    });
  }

  if (closeModal) closeModal.addEventListener("click", () => authModal.classList.remove("show"));
  window.addEventListener("click", (e) => { if (e.target === authModal) authModal.classList.remove("show"); });

  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active"); tabRegister.classList.remove("active");
    loginForm.classList.add("active"); registerForm.classList.remove("active");
  });
  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active"); tabLogin.classList.remove("active");
    registerForm.classList.add("active"); loginForm.classList.remove("active");
  });
}

function initProfilModal() {
  const profileModal      = document.getElementById("profileModal");
  const closeProfileModal = document.getElementById("closeProfileModal");

  document.querySelectorAll(".nav-item").forEach(link => {
    if (link.textContent.trim().includes("Setari")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        fetch("get_user.php").then(r => r.json()).then(user => {
          if (user && user.username) deschideProfilModal(user);
          else document.getElementById("authModal").classList.add("show");
        }).catch(() => { document.getElementById("authModal").classList.add("show"); });
      });
    }
  });

  document.querySelectorAll(".stab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".stab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".stab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("stab-" + btn.dataset.tab).classList.add("active");
    });
  });

  if (closeProfileModal) closeProfileModal.addEventListener("click", () => profileModal.classList.remove("show"));
  window.addEventListener("click", (e) => { if (e.target === profileModal) profileModal.classList.remove("show"); });
}

initSistemAutentificare();
initProfilModal();

(function() {
  const btn   = document.getElementById("btn-despre");
  const modal = document.getElementById("despreModal");
  const close = document.getElementById("closeDespreModal");

  if (btn)   btn.addEventListener("click", (e) => { e.preventDefault(); modal.classList.add("show"); });
  if (close) close.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("show"); });
})();

initLimba();

const themeBtn = document.getElementById("theme-toggle");
const darkModeToggle = document.getElementById("dark-mode-toggle");

const temaSalvata = localStorage.getItem("tema");
if (temaSalvata === "light") {
  document.body.classList.add("light");
  if (darkModeToggle) darkModeToggle.checked = false;
}

function aplicaTema(tema) {
  if (tema === "light") {
    document.body.classList.add("light");
    if (darkModeToggle) darkModeToggle.checked = false;
  } else {
    document.body.classList.remove("light");
    if (darkModeToggle) darkModeToggle.checked = true;
  }
  localStorage.setItem("tema", tema);
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const light = document.body.classList.contains("light");
    aplicaTema(light ? "dark" : "light");
  });
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("change", () => {
    aplicaTema(darkModeToggle.checked ? "dark" : "light");
  });
}

const searchInput = document.getElementById("search-input");
const searchDropdown = document.getElementById("search-dropdown");

let searchTimeout;

if (searchInput) {
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    const query = searchInput.value.trim();
    if (query.length < 2) {
      searchDropdown.classList.remove("open");
      searchDropdown.innerHTML = "";
      return;
    }
    searchTimeout = setTimeout(() => {
      cautaFilm(query);
    }, 400);
  });
}

async function cautaFilm(text) {
  searchDropdown.classList.add("open");
  searchDropdown.innerHTML = `<div class="search-loading">Se caută...</div>`;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(text)}&apikey=${API_KEY}`
    );
    const data = await response.json();
    if (!data.Search) {
      searchDropdown.innerHTML = `<div class="search-no-result">Niciun rezultat găsit</div>`;
      return;
    }
    searchDropdown.innerHTML = "";
    data.Search.slice(0, 8).forEach(item => {
      const result = document.createElement("div");
      result.className = "search-result-item";
      result.innerHTML = `
        <img src="${item.Poster !== "N/A" ? item.Poster : ""}">
        <div class="search-result-info">
          <div class="search-result-title">${item.Title}</div>
          <div class="search-result-meta">${item.Year} • ${item.Type}</div>
        </div>
      `;
      result.addEventListener("click", async () => {
        const filmResponse = await fetch(
          `https://www.omdbapi.com/?i=${item.imdbID}&apikey=${API_KEY}`
        );
        const film = await filmResponse.json();
        alert(
          `${film.Title}\n\n` +
          `⭐ IMDb: ${film.imdbRating}\n` +
          `📅 ${film.Year}\n\n` +
          `${film.Plot}`
        );
      });
      searchDropdown.appendChild(result);
    });
  } catch (error) {
    searchDropdown.innerHTML = `<div class="search-no-result">Eroare la căutare</div>`;
    console.error(error);
  }
}

document.addEventListener("click", (e) => {
  if (!document.getElementById("search-wrapper").contains(e.target)) {
    searchDropdown.classList.remove("open");
  }
});