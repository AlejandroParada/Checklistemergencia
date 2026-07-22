(function () {
  "use strict";

  var STORAGE_KEY = "checklistEmergenciaState";
  var MIN_SCALE = 80;
  var MAX_SCALE = 160;
  var STEP = 10;
  var DESKTOP_MQ = "(min-width: 900px)";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderChecklist(data, container) {
    var html = data
      .map(function (cat) {
        var tiersHtml = cat.tiers
          .map(function (tier) {
            var itemsHtml = tier.items
              .map(function (item) {
                return (
                  "<li><label>" +
                  '<input type="checkbox" data-id="' +
                  escapeHtml(item.id) +
                  '">' +
                  '<span class="txt">' +
                  escapeHtml(item.text) +
                  "</span></label></li>"
                );
              })
              .join("");
            return (
              '<div class="tier"><span class="tag">' +
              escapeHtml(tier.tag) +
              '</span><ul class="items">' +
              itemsHtml +
              "</ul></div>"
            );
          })
          .join("");
        return (
          '<section class="category" id="' +
          escapeHtml(cat.id) +
          '">' +
          '<div class="cat-head"><span class="emoji">' +
          escapeHtml(cat.emoji) +
          "</span><h2>" +
          escapeHtml(cat.title) +
          "</h2></div>" +
          tiersHtml +
          "</section>"
        );
      })
      .join("");
    container.innerHTML = html;
  }

  function renderNav(data, listEl) {
    listEl.innerHTML = data
      .map(function (cat) {
        return (
          "<li><a href=\"#" +
          escapeHtml(cat.id) +
          '" data-nav-id="' +
          escapeHtml(cat.id) +
          '"><span class="emoji" aria-hidden="true">' +
          escapeHtml(cat.emoji) +
          "</span><span>" +
          escapeHtml(cat.title) +
          "</span></a></li>"
        );
      })
      .join("");
  }

  function initSideNav() {
    var toggle = document.getElementById("menuToggle");
    var overlay = document.getElementById("navOverlay");
    var sideNav = document.getElementById("sideNav");
    var listEl = document.getElementById("sideNavList");
    if (!toggle || !overlay || !sideNav || !listEl) return;

    renderNav(CHECKLIST, listEl);

    function isDesktop() {
      return window.matchMedia(DESKTOP_MQ).matches;
    }

    function openNav() {
      if (isDesktop()) return;
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú de categorías");
      overlay.hidden = false;
      var first = listEl.querySelector("a");
      if (first) first.focus();
    }

    function closeNav() {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú de categorías");
      overlay.hidden = true;
    }

    function toggleNav() {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
    }

    toggle.addEventListener("click", toggleNav);
    overlay.addEventListener("click", closeNav);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeNav();
        toggle.focus();
      }
    });

    listEl.addEventListener("click", function (e) {
      var link = e.target.closest("a[href^='#']");
      if (!link) return;
      if (!isDesktop()) closeNav();
    });

    window.matchMedia(DESKTOP_MQ).addEventListener("change", function (mq) {
      if (mq.matches) closeNav();
    });

    initActiveSectionObserver(listEl);
  }

  function initActiveSectionObserver(listEl) {
    var sections = document.querySelectorAll("main#checklist section.category[id]");
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var linksById = {};
    listEl.querySelectorAll("a[data-nav-id]").forEach(function (a) {
      linksById[a.getAttribute("data-nav-id")] = a;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          Object.keys(linksById).forEach(function (key) {
            linksById[key].classList.toggle("is-active", key === id);
          });
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initFontControls() {
    var scale = parseInt(localStorage.getItem("checklistFontScale"), 10) || 100;

    function applyScale() {
      document.documentElement.style.fontSize = scale + "%";
      document.getElementById("fontPct").textContent = scale + "%";
      localStorage.setItem("checklistFontScale", scale);
    }

    document.getElementById("fontPlus").addEventListener("click", function () {
      scale = Math.min(MAX_SCALE, scale + STEP);
      applyScale();
    });
    document.getElementById("fontMinus").addEventListener("click", function () {
      scale = Math.max(MIN_SCALE, scale - STEP);
      applyScale();
    });
    applyScale();
  }

  function initChecklistPersistence() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"][data-id]');
    var state = {};
    try {
      state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      state = {};
    }

    function updateProgress() {
      var total = checkboxes.length;
      var done = 0;
      checkboxes.forEach(function (cb) {
        if (cb.checked) done++;
      });
      var pct = total ? Math.round((done / total) * 100) : 0;
      document.getElementById("progressFill").style.width = pct + "%";
      document.getElementById("progressLabel").textContent =
        done + " / " + total + " marcados";
    }

    checkboxes.forEach(function (cb) {
      var id = cb.getAttribute("data-id");
      if (state[id]) {
        cb.checked = true;
        cb.closest("li").classList.add("checked");
      }
      cb.addEventListener("change", function () {
        state[id] = cb.checked;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        cb.closest("li").classList.toggle("checked", cb.checked);
        updateProgress();
      });
    });
    updateProgress();

    document.getElementById("resetBtn").addEventListener("click", function () {
      if (!confirm("¿Reiniciar todos los ítems marcados?")) return;
      checkboxes.forEach(function (cb) {
        cb.checked = false;
        cb.closest("li").classList.remove("checked");
      });
      state = {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateProgress();
    });
  }

  function initServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function (err) {
        console.warn("SW registration failed:", err);
      });
    });
  }

  function initInstallPrompt() {
    var deferredPrompt = null;
    var banner = document.getElementById("installBanner");
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferredPrompt = e;
      banner.style.display = "block";
    });
    document.getElementById("installBtn").addEventListener("click", function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        banner.style.display = "none";
      });
    });
    window.addEventListener("appinstalled", function () {
      banner.style.display = "none";
    });
  }

  var root = document.getElementById("checklist");
  if (!root || typeof CHECKLIST === "undefined") {
    console.error("Checklist: falta #checklist o data/checklist.js");
    return;
  }

  renderChecklist(CHECKLIST, root);
  initSideNav();
  initFontControls();
  initChecklistPersistence();
  initServiceWorker();
  initInstallPrompt();
})();
