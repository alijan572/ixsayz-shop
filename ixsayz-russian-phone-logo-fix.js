(function () {
  "use strict";

  const RU_PHONE_PLACEHOLDER = "+7 (999) 000-00-00";

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function normalizeRussianPhone(value) {
    let raw = digits(value);
    if (raw.length === 10 && raw.startsWith("9")) raw = "7" + raw;
    if (raw.length === 11 && raw.startsWith("8")) raw = "7" + raw.slice(1);
    if (raw.length !== 11 || !raw.startsWith("7")) return "";
    if (!raw.slice(1).startsWith("9")) return "";
    return "+" + raw;
  }

  function formatRussianPhone(value) {
    const normalized = normalizeRussianPhone(value);
    const raw = normalized ? digits(normalized) : digits(value).replace(/^8/, "7");
    const body = raw.startsWith("7") ? raw.slice(1, 11) : raw.slice(0, 10);
    let result = "+7";
    if (body.length > 0) result += " (" + body.slice(0, 3);
    if (body.length >= 3) result += ")";
    if (body.length > 3) result += " " + body.slice(3, 6);
    if (body.length > 6) result += "-" + body.slice(6, 8);
    if (body.length > 8) result += "-" + body.slice(8, 10);
    return result;
  }

  function fixLogo() {
    document.querySelectorAll(".solo-logo, .app-logo").forEach((node) => {
      node.textContent = "I";
      node.setAttribute("aria-label", "IXSAYZ");
    });
  }

  function fixPhoneInputs() {
    document.querySelectorAll("input[name='phone'], input[type='tel']").forEach((input) => {
      input.placeholder = RU_PHONE_PLACEHOLDER;
      input.inputMode = "tel";
      input.autocomplete = "tel";
      if (input.value) input.value = formatRussianPhone(input.value);
      if (input.dataset.ruPhoneReady) return;
      input.dataset.ruPhoneReady = "1";
      input.addEventListener("input", () => {
        input.value = formatRussianPhone(input.value);
      });
      input.addEventListener("blur", () => {
        const normalized = normalizeRussianPhone(input.value);
        if (normalized) input.value = formatRussianPhone(normalized);
      });
    });
  }

  function removeEmailMode() {
    document.querySelectorAll("[data-auth-mode='email']").forEach((node) => {
      node.remove();
    });
    document.querySelectorAll("[data-auth-mode='phone']").forEach((node) => {
      node.classList.add("active");
      node.textContent = "Телефон";
    });
  }

  function guardRussianPhone(event) {
    const form = event.target;
    if (!form || !["heroAuthForm", "authForm"].includes(form.id)) return;
    const phone = form.querySelector("input[name='phone'], input[type='tel']");
    if (!phone) return;
    const normalized = normalizeRussianPhone(phone.value);
    if (!normalized) {
      event.preventDefault();
      event.stopImmediatePropagation();
      phone.focus();
      showToast("Введите российский номер: +7 (999) 000-00-00");
      return;
    }
    phone.value = formatRussianPhone(normalized);
  }

  function showToast(message) {
    let node = document.querySelector(".toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast glass";
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("show");
    window.setTimeout(() => node.classList.remove("show"), 2300);
  }

  function applyFixes() {
    fixLogo();
    fixPhoneInputs();
    removeEmailMode();
  }

  document.addEventListener("submit", guardRussianPhone, true);
  document.addEventListener("DOMContentLoaded", applyFixes);
  new MutationObserver(applyFixes).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  applyFixes();
}());
