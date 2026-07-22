(function () {
  "use strict";

  var STORAGE_KEY = "checklistEmergenciaState";
  var HOGAR_KEY = "checklistEmergenciaHogar";
  var THEME_KEY = "checklistTheme";
  var HOUSEHOLD_UI_KEY = "checklistHouseholdBarOpen";
  var MIN_SCALE = 80;
  var MAX_SCALE = 160;
  var STEP = 10;
  var DESKTOP_MQ = "(min-width: 900px)";
  var activeTabId = null;
  var hogar = { adultos: 1, menores: 0 };
  var itemById = {};
  var checklistState = {};

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function personUnits(h) {
    return h.adultos + h.menores * HOGAR_RULES.minorFactor;
  }

  function formatHogarShort(h) {
    var parts = [];
    parts.push(h.adultos + (h.adultos === 1 ? " adulto" : " adultos"));
    if (h.menores > 0) {
      parts.push(h.menores + (h.menores === 1 ? " menor" : " menores"));
    }
    return parts.join(", ");
  }

  function formatUnits(units) {
    var rounded = Math.round(units * 100) / 100;
    return String(rounded).replace(".", ",");
  }

  function tierDayLabel(days) {
    return (typeof TIER_DAY_LABELS !== "undefined" && TIER_DAY_LABELS[days]) ||
      days + " días";
  }

  function formatItemLabel(item, h, tierDays) {
    var scale = item.scale || { kind: "none" };
    var text = item.text;
    var units = personUnits(h);
    var heads = h.adultos + h.menores;
    var days = tierDays || 7;

    if (scale.kind === "liters") {
      var perDay = scale.perDay != null ? scale.perDay : HOGAR_RULES.waterLitersPerDay;
      var total = Math.ceil(units * perDay * days);
      return (
        total +
        " L " +
        text +
        " · " +
        formatHogarShort(h) +
        " · " +
        tierDayLabel(days) +
        " (" +
        formatUnits(units) +
        " pers.-eq. × " +
        days +
        " días × " +
        perDay +
        " L)"
      );
    }

    if (scale.kind === "heads") {
      var label = text + " · × " + heads + (heads === 1 ? " persona" : " personas");
      if (scale.timed) label += " · " + tierDayLabel(days) + " (" + days + " días)";
      return label;
    }

    if (scale.kind === "equiv") {
      var eq =
        text +
        " · para " +
        formatUnits(units) +
        " pers.-eq. (" +
        formatHogarShort(h) +
        ")";
      if (scale.timed) eq += " · " + tierDayLabel(days);
      return eq;
    }

    return text;
  }

  function renderTiers(tiers, h) {
    return tiers
      .map(function (tier) {
        var days = tier.days || 7;
        var itemsHtml = tier.items
          .map(function (item) {
            return (
              "<li><label>" +
              '<input type="checkbox" data-id="' +
              escapeHtml(item.id) +
              '">' +
              '<span class="txt">' +
              escapeHtml(formatItemLabel(item, h, days)) +
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
  }

  function isContactsCat(cat) {
    return cat && cat.type === "contacts";
  }

  function isPlacesCat(cat) {
    return cat && cat.type === "places";
  }

  function isGuidesCat(cat) {
    return cat && cat.type === "guides";
  }

  function isReferenceCat(cat) {
    return isContactsCat(cat) || isPlacesCat(cat) || isGuidesCat(cat);
  }

  function mapsUrlForPlace(place) {
    if (place.lat != null && place.lng != null && !place.mapsQuery) {
      return (
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(place.lat + "," + place.lng)
      );
    }
    var q =
      place.mapsQuery ||
      (place.lat != null && place.lng != null
        ? place.lat + "," + place.lng
        : place.address
          ? place.label + " " + place.address
          : place.label);
    return (
      "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q)
    );
  }

  function indexItems(data) {
    itemById = {};
    data.forEach(function (cat) {
      if (isReferenceCat(cat) || !cat.tiers) return;
      cat.tiers.forEach(function (tier) {
        tier.items.forEach(function (item) {
          itemById[item.id] = { item: item, days: tier.days || 7 };
        });
      });
    });
  }

  /** Móviles UY → dígitos internacionales sin + (wa.me/598…). */
  function normalizeWhatsApp(num) {
    var digits = String(num || "").replace(/\D/g, "");
    if (/^0\d{8}$/.test(digits)) return "598" + digits.slice(1);
    if (/^9\d{7}$/.test(digits)) return "598" + digits;
    if (/^5980\d{8}$/.test(digits)) return "598" + digits.slice(4);
    if (/^598\d{8,9}$/.test(digits)) return digits;
    return digits;
  }

  function formatWhatsAppDisplay(waDigits) {
    if (/^5989\d{7}$/.test(waDigits)) {
      return (
        "0" +
        waDigits.slice(3, 5) +
        " " +
        waDigits.slice(5, 8) +
        " " +
        waDigits.slice(8)
      );
    }
    return waDigits || "";
  }

  /** Enlace a chat: en Android fuerza com.whatsapp (no Business). */
  function waChatUrl(waDigits) {
    var text = encodeURIComponent("hola");
    var httpsUrl =
      "https://api.whatsapp.com/send?phone=" + waDigits + "&text=" + text;
    var ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
    if (/Android/i.test(ua)) {
      return (
        "intent://send?phone=" +
        waDigits +
        "&text=" +
        text +
        "#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url=" +
        encodeURIComponent(httpsUrl) +
        ";end"
      );
    }
    return httpsUrl;
  }

  function waIconLink(waDigits, label) {
    // phone solo dígitos; no escapeHtml (rompe & en query).
    var href = waChatUrl(waDigits);
    return (
      '<a class="wa-icon" href="' +
      href +
      '" rel="noopener noreferrer" aria-label="WhatsApp de ' +
      escapeHtml(label) +
      '" title="Abrir chat de WhatsApp (app normal)">' +
      '<span class="wa-icon-mark" aria-hidden="true">W</span>' +
      "</a>"
    );
  }

  function renderContacts(cat) {
    var intro = cat.intro
      ? '<p class="contacts-intro">' + escapeHtml(cat.intro) + "</p>"
      : "";
    var list = (cat.contacts || [])
      .map(function (c) {
        var waDigits =
          c.whatsapp != null && c.whatsapp !== ""
            ? normalizeWhatsApp(c.whatsapp)
            : "";
        var display =
          c.display ||
          (waDigits ? formatWhatsAppDisplay(waDigits) : null) ||
          c.tel ||
          "Sin número";
        var note = c.note
          ? '<span class="contact-note">' + escapeHtml(c.note) + "</span>"
          : "";
        var cls = "contact-row" + (c.placeholder ? " is-placeholder" : "");
        var action = "";

        if (waDigits) {
          action = waIconLink(waDigits, c.label);
        } else if (c.whatsapp != null) {
          action = '<span class="wa-icon is-disabled" aria-hidden="true"><span class="wa-icon-mark">W</span></span>';
        } else if (c.tel) {
          action =
            '<a class="contact-action" href="tel:' +
            escapeHtml(c.tel) +
            '">Llamar</a>';
        } else {
          action = '<span class="contact-action is-disabled">Llamar</span>';
        }

        return (
          '<li class="' +
          cls +
          '"><div class="contact-text"><strong>' +
          escapeHtml(c.label) +
          '</strong><span class="contact-number">' +
          escapeHtml(display) +
          "</span>" +
          note +
          "</div>" +
          action +
          "</li>"
        );
      })
      .join("");

    return intro + '<ul class="contacts-list">' + list + "</ul>";
  }

  function renderPlaces(cat) {
    var intro = cat.intro
      ? '<p class="contacts-intro">' + escapeHtml(cat.intro) + "</p>"
      : "";
    var list = (cat.places || [])
      .map(function (p) {
        var href = mapsUrlForPlace(p);
        var addr = p.address
          ? '<span class="contact-note">' + escapeHtml(p.address) + "</span>"
          : "";
        return (
          '<li class="contact-row place-row">' +
          '<a class="place-link" href="' +
          escapeHtml(href) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<span class="contact-text"><strong>' +
          escapeHtml(p.label) +
          "</strong>" +
          addr +
          "</span>" +
          '<span class="contact-action">Maps</span>' +
          "</a></li>"
        );
      })
      .join("");

    return intro + '<ul class="contacts-list">' + list + "</ul>";
  }

  function renderGuides(cat) {
    var intro = cat.intro
      ? '<p class="contacts-intro">' + escapeHtml(cat.intro) + "</p>"
      : "";
    var list = (cat.guides || [])
      .map(function (g, index) {
        var steps = (g.steps || [])
          .map(function (step) {
            return "<li>" + escapeHtml(step) + "</li>";
          })
          .join("");
        return (
          '<details class="guide-card"' +
          (index === 0 ? " open" : "") +
          ">" +
          "<summary>" +
          escapeHtml(g.title) +
          "</summary>" +
          '<ol class="guide-steps">' +
          steps +
          "</ol>" +
          "</details>"
        );
      })
      .join("");
    return intro + '<div class="guides-list">' + list + "</div>";
  }

  function renderChecklist(data, container, h) {
    container.setAttribute("role", "presentation");
    var currentTab = activeTabId;
    container.innerHTML = data
      .map(function (cat) {
        var hiddenAttr =
          currentTab && cat.id !== currentTab ? " hidden" : "";
        if (!currentTab) hiddenAttr = cat.id === data[0].id ? "" : " hidden";
        var body = isGuidesCat(cat)
          ? renderGuides(cat)
          : isPlacesCat(cat)
            ? renderPlaces(cat)
            : isContactsCat(cat)
              ? renderContacts(cat)
              : renderTiers(cat.tiers || [], h);
        return (
          '<section class="category tab-panel' +
          (isReferenceCat(cat) ? " category-contacts" : "") +
          '" id="' +
          escapeHtml(cat.id) +
          '" role="tabpanel" aria-labelledby="tab-' +
          escapeHtml(cat.id) +
          '"' +
          hiddenAttr +
          ">" +
          '<div class="cat-head"><span class="emoji" aria-hidden="true">' +
          escapeHtml(cat.emoji) +
          "</span><h2>" +
          escapeHtml(cat.title) +
          "</h2></div>" +
          body +
          "</section>"
        );
      })
      .join("");
  }

  function applyCheckedState() {
    document.querySelectorAll('input[type="checkbox"][data-id]').forEach(function (cb) {
      var id = cb.getAttribute("data-id");
      if (checklistState[id]) {
        cb.checked = true;
        cb.closest("li").classList.add("checked");
      }
    });
    updateProgress();
  }

  function refreshQuantities(h) {
    document.querySelectorAll('input[type="checkbox"][data-id]').forEach(function (cb) {
      var id = cb.getAttribute("data-id");
      var entry = itemById[id];
      if (!entry) return;
      var span = cb.parentNode.querySelector(".txt");
      if (span) span.textContent = formatItemLabel(entry.item, h, entry.days);
    });
  }

  function updateProgress() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"][data-id]');
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

  function renderNav(data, listEl) {
    listEl.setAttribute("role", "tablist");
    listEl.setAttribute("aria-orientation", "vertical");
    listEl.innerHTML = data
      .map(function (cat, index) {
        var selected = index === 0 ? "true" : "false";
        return (
          '<li role="presentation">' +
          '<button type="button" role="tab" id="tab-' +
          escapeHtml(cat.id) +
          '" data-nav-id="' +
          escapeHtml(cat.id) +
          '" aria-controls="' +
          escapeHtml(cat.id) +
          '" aria-selected="' +
          selected +
          '" tabindex="' +
          (index === 0 ? "0" : "-1") +
          '">' +
          '<span class="emoji" aria-hidden="true">' +
          escapeHtml(cat.emoji) +
          "</span><span>" +
          escapeHtml(cat.title) +
          "</span></button></li>"
        );
      })
      .join("");
  }

  function resolveTabId(requested) {
    if (requested && CHECKLIST.some(function (c) { return c.id === requested; })) {
      return requested;
    }
    return CHECKLIST[0].id;
  }

  function showTab(id, options) {
    options = options || {};
    var tabId = resolveTabId(id);
    if (tabId === activeTabId && !options.force) return;
    activeTabId = tabId;

    document.querySelectorAll(".tab-panel").forEach(function (panel) {
      panel.hidden = panel.id !== tabId;
    });

    document.querySelectorAll('#sideNavList [role="tab"]').forEach(function (tab) {
      var on = tab.getAttribute("data-nav-id") === tabId;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      tab.classList.toggle("is-active", on);
    });

    if (options.updateHash !== false) {
      var nextHash = "#" + tabId;
      if (location.hash !== nextHash) {
        if (options.replace) history.replaceState(null, "", nextHash);
        else history.pushState(null, "", nextHash);
      }
    }
  }

  function isDesktop() {
    return window.matchMedia(DESKTOP_MQ).matches;
  }

  function closeSideNav() {
    var toggle = document.getElementById("menuToggle");
    var overlay = document.getElementById("navOverlay");
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú de categorías");
    }
    if (overlay) overlay.hidden = true;
  }

  function closeInfo() {
    var toggle = document.getElementById("infoToggle");
    var panel = document.getElementById("infoPanel");
    document.body.classList.remove("info-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
    if (panel) panel.hidden = true;
  }

  function openInfo() {
    closeSideNav();
    var toggle = document.getElementById("infoToggle");
    var panel = document.getElementById("infoPanel");
    var overlay = document.getElementById("navOverlay");
    document.body.classList.add("info-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (panel) panel.hidden = false;
    if (overlay) overlay.hidden = false;
  }

  function initSideNav() {
    var toggle = document.getElementById("menuToggle");
    var overlay = document.getElementById("navOverlay");
    var listEl = document.getElementById("sideNavList");
    if (!toggle || !overlay || !listEl) return;

    renderNav(CHECKLIST, listEl);

    function openNav() {
      if (isDesktop()) return;
      closeInfo();
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú de categorías");
      overlay.hidden = false;
      var active = listEl.querySelector('[role="tab"][aria-selected="true"]');
      if (active) active.focus();
    }

    toggle.addEventListener("click", function () {
      if (document.body.classList.contains("nav-open")) closeSideNav();
      else openNav();
    });

    overlay.addEventListener("click", function () {
      closeSideNav();
      closeInfo();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (document.body.classList.contains("info-open")) {
        closeInfo();
        document.getElementById("infoToggle").focus();
      } else if (document.body.classList.contains("nav-open")) {
        closeSideNav();
        toggle.focus();
      }
    });

    listEl.addEventListener("click", function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      showTab(tab.getAttribute("data-nav-id"));
      if (!isDesktop()) closeSideNav();
    });

    listEl.addEventListener("keydown", function (e) {
      var tabs = Array.prototype.slice.call(listEl.querySelectorAll('[role="tab"]'));
      var idx = tabs.indexOf(document.activeElement);
      if (idx < 0) return;
      var next = idx;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (idx + 1) % tabs.length;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        next = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[next].focus();
      showTab(tabs[next].getAttribute("data-nav-id"));
    });

    window.matchMedia(DESKTOP_MQ).addEventListener("change", function (mq) {
      if (mq.matches) closeSideNav();
    });

    window.addEventListener("hashchange", function () {
      showTab(location.hash.slice(1), { updateHash: false, force: true });
    });
    window.addEventListener("popstate", function () {
      showTab(location.hash.slice(1), { updateHash: false, force: true });
    });

    showTab(location.hash.slice(1), { replace: true, force: true });
  }

  function loadHogar() {
    try {
      var raw = JSON.parse(localStorage.getItem(HOGAR_KEY));
      if (raw && typeof raw.adultos === "number" && typeof raw.menores === "number") {
        return {
          adultos: clamp(raw.adultos, HOGAR_RULES.minAdults, HOGAR_RULES.maxAdults),
          menores: clamp(raw.menores, HOGAR_RULES.minMinors, HOGAR_RULES.maxMinors)
        };
      }
    } catch (e) { /* ignore */ }
    return {
      adultos: HOGAR_RULES.defaultAdults,
      menores: HOGAR_RULES.defaultMinors
    };
  }

  function saveHogar(h) {
    localStorage.setItem(
      HOGAR_KEY,
      JSON.stringify({ adultos: h.adultos, menores: h.menores })
    );
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function syncHogarUi() {
    document.getElementById("adultCount").textContent = String(hogar.adultos);
    document.getElementById("minorCount").textContent = String(hogar.menores);
    document.getElementById("adultMinus").disabled = hogar.adultos <= HOGAR_RULES.minAdults;
    document.getElementById("adultPlus").disabled = hogar.adultos >= HOGAR_RULES.maxAdults;
    document.getElementById("minorMinus").disabled = hogar.menores <= HOGAR_RULES.minMinors;
    document.getElementById("minorPlus").disabled = hogar.menores >= HOGAR_RULES.maxMinors;
  }

  function setHogar(next) {
    hogar = {
      adultos: clamp(next.adultos, HOGAR_RULES.minAdults, HOGAR_RULES.maxAdults),
      menores: clamp(next.menores, HOGAR_RULES.minMinors, HOGAR_RULES.maxMinors)
    };
    saveHogar(hogar);
    syncHogarUi();
    refreshQuantities(hogar);
  }

  function initHouseholdBar() {
    var toggle = document.getElementById("householdToggle");
    var bar = document.getElementById("householdBar");

    function setBarOpen(open) {
      document.body.classList.toggle("household-collapsed", !open);
      if (toggle) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute(
          "aria-label",
          open ? "Ocultar ajustes del hogar" : "Mostrar ajustes del hogar"
        );
      }
      if (bar) bar.setAttribute("aria-hidden", open ? "false" : "true");
      try {
        localStorage.setItem(HOUSEHOLD_UI_KEY, open ? "1" : "0");
      } catch (e) { /* ignore */ }
    }

    var savedOpen = true;
    try {
      var raw = localStorage.getItem(HOUSEHOLD_UI_KEY);
      if (raw === "0") savedOpen = false;
      if (raw === "1") savedOpen = true;
    } catch (e) { /* ignore */ }
    setBarOpen(savedOpen);

    if (toggle) {
      toggle.addEventListener("click", function () {
        setBarOpen(document.body.classList.contains("household-collapsed"));
      });
    }

    syncHogarUi();
    document.getElementById("adultMinus").addEventListener("click", function () {
      setHogar({ adultos: hogar.adultos - 1, menores: hogar.menores });
    });
    document.getElementById("adultPlus").addEventListener("click", function () {
      setHogar({ adultos: hogar.adultos + 1, menores: hogar.menores });
    });
    document.getElementById("minorMinus").addEventListener("click", function () {
      setHogar({ adultos: hogar.adultos, menores: hogar.menores - 1 });
    });
    document.getElementById("minorPlus").addEventListener("click", function () {
      setHogar({ adultos: hogar.adultos, menores: hogar.menores + 1 });
    });
  }

  function initThemeToggle() {
    var btn = document.getElementById("themeToggle");
    var meta = document.getElementById("metaThemeColor");
    if (!btn) return;

    function currentTheme() {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    }

    function applyTheme(theme) {
      var next = theme === "light" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      if (meta) {
        var styles = getComputedStyle(document.documentElement);
        meta.setAttribute("content", styles.getPropertyValue("--theme-meta").trim() || (next === "light" ? "#F3EEE4" : "#1B2733"));
      }
      btn.setAttribute(
        "aria-label",
        next === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      );
    }

    applyTheme(currentTheme());
    btn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  function initInfoPanel() {
    var toggle = document.getElementById("infoToggle");
    var closeBtn = document.getElementById("infoClose");
    if (!toggle) return;

    document.getElementById("infoIntro").textContent = APP_COPY.intro;
    document.getElementById("infoPrincipleTitle").textContent = APP_COPY.principleTitle;
    document.getElementById("infoPrinciple").textContent = APP_COPY.principle;
    document.getElementById("infoHouseholdHint").textContent = APP_COPY.householdHint;

    toggle.addEventListener("click", function () {
      if (document.body.classList.contains("info-open")) closeInfo();
      else openInfo();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeInfo);
  }

  function initFontControls() {
    var scale = parseInt(localStorage.getItem("checklistFontScale"), 10) || 100;
    var pctEl = document.getElementById("fontPct");

    function applyScale() {
      document.documentElement.style.fontSize = scale + "%";
      if (pctEl) pctEl.textContent = scale + "%";
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
    try {
      checklistState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      checklistState = {};
    }

    var root = document.getElementById("checklist");
    root.addEventListener("change", function (e) {
      var cb = e.target;
      if (!cb || cb.type !== "checkbox" || !cb.getAttribute("data-id")) return;
      var id = cb.getAttribute("data-id");
      checklistState[id] = cb.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistState));
      cb.closest("li").classList.toggle("checked", cb.checked);
      updateProgress();
    });

    applyCheckedState();

    document.getElementById("resetBtn").addEventListener("click", function () {
      if (!confirm("¿Reiniciar todos los ítems marcados?")) return;
      checklistState = {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistState));
      document.querySelectorAll('input[type="checkbox"][data-id]').forEach(function (cb) {
        cb.checked = false;
        cb.closest("li").classList.remove("checked");
      });
      updateProgress();
    });
  }

  function initServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    var reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("./sw.js?v=32", { updateViaCache: "none" })
        .then(function (reg) {
          reg.update();
          if (reg.waiting) {
            reg.waiting.postMessage({ type: "SKIP_WAITING" });
          }
          reg.addEventListener("updatefound", function () {
            var worker = reg.installing;
            if (!worker) return;
            worker.addEventListener("statechange", function () {
              if (
                worker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                worker.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });
        })
        .catch(function (err) {
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

  function fillStaticCopy() {
    var title = document.getElementById("appTitle");
    var eyebrow = document.getElementById("appEyebrow");
    if (title) title.textContent = APP_COPY.title;
    if (eyebrow) {
      eyebrow.innerHTML =
        escapeHtml(APP_COPY.eyebrow) +
        '<span class="tag">' +
        escapeHtml(APP_COPY.eyebrowTag) +
        "</span>";
    }
    document.title = APP_COPY.title + " — " + APP_COPY.eyebrowTag;
  }

  var root = document.getElementById("checklist");
  if (
    !root ||
    typeof CHECKLIST === "undefined" ||
    !CHECKLIST.length ||
    typeof APP_COPY === "undefined" ||
    typeof HOGAR_RULES === "undefined"
  ) {
    console.error("Checklist: faltan datos (checklist.js / ui.js)");
    return;
  }

  indexItems(CHECKLIST);
  hogar = loadHogar();
  fillStaticCopy();
  renderChecklist(CHECKLIST, root, hogar);
  initSideNav();
  initThemeToggle();
  initInfoPanel();
  initFontControls();
  initHouseholdBar();
  initChecklistPersistence();
  initServiceWorker();
  initInstallPrompt();
})();
