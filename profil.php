<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: index.html");
    exit;
}
$user = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CineVerse – Profil</title>
  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>

  <aside class="sidebar">
    <div class="logo">
      <svg class="logo-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="3,1 19,10 3,19" fill="#0d0d0f" stroke="#3b6ff5" stroke-width="2" stroke-linejoin="round"/>
      </svg>Cine<span>Verse</span>
    </div>
    <nav>
      <a class="nav-item" href="index.html">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>
        Acasa
      </a>
      <a class="nav-item" href="#">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>
        Filme
      </a>
      <a class="nav-item" href="#">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        Seriale
      </a>
      <a class="nav-item" href="#">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        Favorite
      </a>
      <a class="nav-item" href="#">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
        Watchlist
      </a>
      <a class="nav-item" href="#">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Recente
      </a>
      <a class="nav-item active" href="profil.php">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        Setari
      </a>
    </nav>
    <div class="sidebar-bottom">
      <p class="continue-label">CONTINUA VIZIONAREA</p>
      <div class="continue-card">
        <div class="continue-thumb">THE HUNGER GAMES</div>
        <div class="continue-info">
          <p>The Hunger Games</p>
          <div class="progress-bar"><div class="progress-fill"></div></div>
          <span class="continue-time">51:23 – 2:22:32</span>
        </div>
      </div>
    </div>
  </aside>

  <div class="main">
    <header class="topnav">
      <nav class="topnav-links">
        <a class="topnav-link" href="index.html">Acasa</a>
        <a class="topnav-link" href="#">Categorii</a>
        <a class="topnav-link" href="#">Top</a>
      </nav>
      <div class="topnav-icons">
        <div class="icon-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </div>
        <div class="icon-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
        </div>
        <div class="avatar"></div>
      </div>
    </header>


    <div class="profil-page">

      <div class="profil-sidebar-card">
        <div class="profil-avatar">
          <?php echo strtoupper(substr($user['username'], 0, 2)); ?>
        </div>
        <h2 class="profil-username"><?php echo htmlspecialchars($user['username']); ?></h2>
        <p class="profil-useremail"><?php echo htmlspecialchars($user['email']); ?></p>

        <div class="profil-stats-vert">
<div class="psv-item">
    <span class="psv-num" id="favorite-count">0</span>
    <span class="psv-label">Favorite</span>
</div>

<div class="psv-item">
    <span class="psv-num" id="watchlist-count">0</span>
    <span class="psv-label">Watchlist</span>
</div>
          <div class="psv-divider"></div>
          <div class="psv-item">
            <span class="psv-num">0</span>
            <span class="psv-label">Vizionate</span>
          </div>
        </div>

        <a href="logout.php" class="btn-logout">Deconectare</a>
      </div>

      <div class="profil-main-card">

        <div class="settings-tabs">
          <button class="stab active" data-tab="profil">Profil</button>
          <button class="stab" data-tab="setari">Setări</button>
          <button class="stab" data-tab="securitate">Securitate</button>
        </div>

        <div class="stab-content active" id="stab-profil">
          <h3 class="settings-section-title">Informații personale</h3>
          <div class="form-group">
            <label>Nume utilizator</label>
            <input type="text" id="edit-username" value="<?php echo htmlspecialchars($user['username']); ?>">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="edit-email" value="<?php echo htmlspecialchars($user['email']); ?>">
          </div>
          <div class="form-group">
            <label>Biografie</label>
            <textarea id="edit-bio" placeholder="Scrie ceva despre tine..." rows="4"></textarea>
          </div>
          <button class="btn-primary btn-save" id="btn-save-profil">Salvează modificările</button>
          <div id="msg-profil" class="settings-msg"></div>
        </div>

        <div class="stab-content" id="stab-setari">
          <h3 class="settings-section-title">Preferințe</h3>
          <div class="settings-row">
            <div>
              <p class="settings-row-title">Notificări email</p>
              <p class="settings-row-desc">Primește noutăți despre filme și seriale</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="settings-row">
            <div>
<div class="settings-row">
  <div>
    <p class="settings-row-title">Limbă interfață</p>
    <p class="settings-row-desc">Schimbă limba site-ului (în curând disponibil complet)</p>
  </div>
  <button id="btn-limba" class="btn-limba">🇷🇴 Română</button>
</div>
          <div class="settings-row">
            <div>
              <p class="settings-row-title">Mod întunecat</p>
              <p class="settings-row-desc">Interfața cu fundal închis</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="settings-row">
            <div>
              <p class="settings-row-title">Calitate video implicită</p>
              <p class="settings-row-desc">Rezoluția folosită la redare</p>
            </div>
            <select class="settings-select">
              <option>Auto</option>
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
            </select>
          </div>
        </div>

        <div class="stab-content" id="stab-securitate">
          <h3 class="settings-section-title">Schimbă parola</h3>
          <div class="form-group">
            <label>Parola actuală</label>
            <input type="password" id="parola-veche" placeholder="••••••••">
          </div>
          <div class="form-group">
            <label>Parola nouă</label>
            <input type="password" id="parola-noua" placeholder="Minim 6 caractere">
          </div>
          <div class="form-group">
            <label>Confirmă parola nouă</label>
            <input type="password" id="parola-confirm" placeholder="Repetă parola">
          </div>
          <button class="btn-primary btn-save" id="btn-save-parola">Schimbă parola</button>
          <div id="msg-parola" class="settings-msg"></div>

          <div class="danger-zone">
            <p class="settings-row-title">Șterge contul</p>
            <p class="settings-row-desc">Această acțiune este permanentă și nu poate fi anulată.</p>
            <button class="btn-danger">Șterge contul meu</button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <script src="profil.js"></script>
  <script src="profil.js"></script>
</body>
</html>