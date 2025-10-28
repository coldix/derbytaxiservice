/*
# ==========================================
# Project:     Derby Taxi Service ~ derbytaxiservice.com.au
# Author:      Colin Dixon BSc, DipEd, Cert IV TAE
# Contact:     crdixon@gmail.com
# Timestamp:   28/10/2025 05:05 PM AWST (Derby)
# Version:     25.10.007
# File Name:   script.js
# Description: Solid modal control, theme pill, footer inject, date/time defaults
# ==========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // THEME
  const pill = document.getElementById("theme-pill");
  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");
  const setTheme = (t) => {
    body.dataset.theme = t;
    localStorage.setItem("theme", t);
    if (t === "light") {
      icon.textContent = "☀️";
      label.textContent = "Light";
    } else {
      icon.textContent = "🌙";
      label.textContent = "Dark";
    }
  };
  setTheme(localStorage.getItem("theme") || "dark");
  pill?.addEventListener("click", () =>
    setTheme(body.dataset.theme === "dark" ? "light" : "dark")
  );

  // FOOTER (leave your static text in HTML—this is a safety net if you want it dynamic)
  const f = document.getElementById("footer");
  if (f && !f.dataset.locked) {
    const v = document.querySelector('meta[name="version"]')?.content ?? "";
    const ts = document.querySelector('meta[name="timestamp"]')?.content ?? "";
    const y = new Date().getFullYear();
    f.innerHTML = `© ${y} Derby Taxi Service.  v${v} — ${ts}  Web design by <b>oze.au</b>`;
  }

  // MODAL HELPERS
  const show = (m) => {
    m.classList.add("show");
    m.setAttribute("aria-hidden", "false");
  };
  const hide = (m) => {
    m.classList.remove("show");
    m.setAttribute("aria-hidden", "true");
  };

  // Disclaimer modal
  const discModal = document.getElementById("disclaimer-modal");
  document
    .getElementById("disclaimer-btn")
    ?.addEventListener("click", () => show(discModal));
  document
    .getElementById("close-disclaimer")
    ?.addEventListener("click", () => hide(discModal));
  document
    .getElementById("close-disclaimer-btn")
    ?.addEventListener("click", () => hide(discModal));
  discModal?.addEventListener("click", (e) => {
    if (e.target === discModal) hide(discModal);
  });

  // Enquiry modal
  const enqModal = document.getElementById("enquiry-modal");
  const openEnq = () => show(enqModal);
  document.getElementById("enquireBtn")?.addEventListener("click", openEnq);
  document.getElementById("enquire-pill")?.addEventListener("click", openEnq);
  document
    .getElementById("close-enquiry")
    ?.addEventListener("click", () => hide(enqModal));
  enqModal?.addEventListener("click", (e) => {
    if (e.target === enqModal) hide(enqModal);
  });

  // Defaults for date/time
  const form = document.getElementById("enquiry-form");
  if (form) {
    const d = form.querySelector('input[name="pickupDate"]');
    const t = form.querySelector('input[name="pickupTime"]');
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    d.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}`;
    t.value = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const summary = `--- TAXI ENQUIRY ---
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Postcode: ${data.postcode || "-"}
Passengers: ${data.passengers}
Pickup: ${data.pickupDate} ${data.pickupTime}
From: ${data.pickupAddress}
To: ${data.destinationAddress}
Requirements: ${data.specialRequirements || "-"}

Derby Taxi Service
Phone: 0477 313 313
Email: info@derbytaxiservice.com.au`;
      // Copy & open mailto
      navigator.clipboard?.writeText(summary).catch(() => {});
      window.location.href = `mailto:info@derbytaxiservice.com.au?subject=Website Enquiry&body=${encodeURIComponent(
        summary
      )}`;
      hide(enqModal);
    });
  }
});
