console.log("profil.js incarcat");
document.querySelectorAll(".stab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".stab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".stab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("stab-" + btn.dataset.tab).classList.add("active");
  });
});

document.getElementById("btn-save-profil")?.addEventListener("click", async () => {
  const username = document.getElementById("edit-username").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const bio = document.getElementById("edit-bio").value.trim();
  const msg = document.getElementById("msg-profil");

  const formData = new FormData();
  formData.append("actiune", "update_profil");
  formData.append("username", username);
  formData.append("email", email);
  formData.append("bio", bio);

  try {
    const res = await fetch("procesare.php", { method: "POST", body: formData });
    const data = await res.json();
    msg.textContent = data.mesaj;
    msg.style.color = data.status === "succes" ? "#10b981" : "#ef4444";
  } catch {
    msg.textContent = "Eroare de rețea.";
    msg.style.color = "#ef4444";
  }
});

document.getElementById("btn-save-parola")?.addEventListener("click", async () => {
  const veche = document.getElementById("parola-veche").value;
  const noua = document.getElementById("parola-noua").value;
  const confirm = document.getElementById("parola-confirm").value;
  const msg = document.getElementById("msg-parola");

  if (noua !== confirm) {
    msg.textContent = "Parolele nu coincid.";
    msg.style.color = "#ef4444";
    return;
  }

  const formData = new FormData();
  formData.append("actiune", "schimba_parola");
  formData.append("parola_veche", veche);
  formData.append("parola_noua", noua);

  try {
    const res = await fetch("procesare.php", { method: "POST", body: formData });
    const data = await res.json();
    msg.textContent = data.mesaj;
    msg.style.color = data.status === "succes" ? "#10b981" : "#ef4444";
  } catch {
    msg.textContent = "Eroare de rețea.";
    msg.style.color = "#ef4444";
  }
});
function actualizeazaStatisticiProfil() {

    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const favoriteCount = document.getElementById("favorite-count");
    const watchlistCount = document.getElementById("watchlist-count");

    if (favoriteCount) {
        favoriteCount.textContent = favorite.length;
    }

    if (watchlistCount) {
        watchlistCount.textContent = watchlist.length;
    }
}

document.addEventListener("DOMContentLoaded", actualizeazaStatisticiProfil);