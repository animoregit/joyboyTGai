/* ============================================================
   Joyboy AI — interactions
   assets/js/main.js
   No dependencies. Safe to delete any block you don't want.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 2. Sticky nav + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  if (nav) {
    var onScroll = function () {
      var y = window.scrollY;
      nav.classList.toggle("is-stuck", y > 24);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (y / max) * 100 : 0;
        progress.style.width = Math.min(100, pct).toFixed(2) + "%";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ---------- 3. Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    var close = function () {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- 4. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el) {
    var d = el.getAttribute("data-delay");
    if (d) el.style.setProperty("--d", d);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Pointer-follow spotlight on cards ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- 6. Magnetic buttons ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var raf = null;
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        var y = (e.clientY - (r.top + r.height / 2)) * 0.32;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          btn.style.transform = "translate(" + x + "px," + y + "px)";
        });
      });
      btn.addEventListener("pointerleave", function () {
        if (raf) cancelAnimationFrame(raf);
        btn.style.transform = "";
      });
    });
  }

  /* ---------- 7. Hero logo — 3D tilt following the cursor ---------- */
  var heroLogo = document.getElementById("heroLogo");
  if (heroLogo && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
    var wrap = heroLogo.closest(".hero__logo-wrap");
    var heroSection = document.querySelector(".hero");
    if (wrap && heroSection) {
      var tiltRaf = null;
      heroSection.addEventListener("pointermove", function (e) {
        var r = heroSection.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
        var py = (e.clientY - r.top) / r.height - 0.5;
        if (tiltRaf) cancelAnimationFrame(tiltRaf);
        tiltRaf = requestAnimationFrame(function () {
          heroLogo.style.transform =
            "perspective(400px) rotateY(" + px * 26 + "deg) rotateX(" + -py * 26 + "deg) scale(1.06)";
        });
      });
      heroSection.addEventListener("pointerleave", function () {
        if (tiltRaf) cancelAnimationFrame(tiltRaf);
        heroLogo.style.transform = "";
      });
    }
  }

  /* ---------- 8. Subtle hero parallax on scroll ---------- */
  if (!reduceMotion) {
    var glow = document.querySelector(".hero__glow");
    var hero = document.querySelector(".hero");
    if (glow && hero) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < hero.offsetHeight) {
            glow.style.transform =
              "translateX(-50%) translateY(" + y * 0.18 + "px) scale(" + (1 + y * 0.0004) + ")";
          }
          ticking = false;
        });
      }, { passive: true });
    }
  }
})();
