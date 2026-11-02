/* Pintaderas de El Museo Canario — interactions */
(function () {
  "use strict";

  /* ---------------- language toggle ---------------- */
  var body = document.body;
  var btnES = document.getElementById("btn-es");
  var btnEN = document.getElementById("btn-en");
  function setLang(lang, persist) {
    body.classList.remove("lang-es", "lang-en");
    body.classList.add("lang-" + lang);
    document.documentElement.lang = lang;
    if (btnES) btnES.classList.toggle("active", lang === "es");
    if (btnEN) btnEN.classList.toggle("active", lang === "en");
    if (persist) { try { localStorage.setItem("pintaderas-lang", lang); } catch (e) {} }
  }
  if (btnES && btnEN) {
    btnES.addEventListener("click", function () { setLang("es", true); });
    btnEN.addEventListener("click", function () { setLang("en", true); });
    var saved = null;
    try { saved = localStorage.getItem("pintaderas-lang"); } catch (e) {}
    setLang(saved === "es" || saved === "en" ? saved : "en", false);
  }

  /* ---------------- chapters dropdown ---------------- */
  document.querySelectorAll(".dropdown").forEach(function (dd) {
    var btn = dd.querySelector(".dropbtn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      dd.classList.toggle("open");
    });
    dd.addEventListener("mouseenter", function () { dd.classList.add("open"); });
    dd.addEventListener("mouseleave", function () { dd.classList.remove("open"); });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown.open").forEach(function (d) { d.classList.remove("open"); });
  });

  /* ---------------- reading progress ---------------- */
  var bar = document.getElementById("progress-bar");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- reveal on scroll ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  // also reveal figures as they enter
  var io2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.style.opacity = 1; en.target.style.transform = "none";
        io2.unobserve(en.target);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll(".img-block, .plate-card, .table-wrap").forEach(function (el) {
    el.style.opacity = 0; el.style.transform = "translateY(14px)";
    el.style.transition = "opacity .55s ease, transform .55s ease";
    io2.observe(el);
  });

  /* ---------------- lightbox ---------------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    function openLB(src, cap) {
      lbImg.src = src; lbCap.textContent = cap || "";
      lb.hidden = false; document.body.style.overflow = "hidden";
    }
    function closeLB() { lb.hidden = true; document.body.style.overflow = ""; }
    document.querySelectorAll(".prose .img-block img, .plate-card a, .strip-fig a").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var cap = "";
        var blk = el.closest(".img-block") || el.closest(".plate-card");
        if (blk) {
          var sib = blk.nextElementSibling;
          if (sib && (sib.classList.contains("fig-caption"))) cap = sib.textContent;
          else {
            var fc = blk.querySelector("figcaption");
            if (fc) cap = fc.textContent;
          }
        }
        openLB(el.tagName === "IMG" ? el.src : el.querySelector("img").src, cap);
      });
    });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lb-close")) closeLB(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLB(); });
  }

  /* ---------------- plates gallery filter ---------------- */
  var search = document.getElementById("plate-search");
  if (search) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".plate-card"));
    var count = document.getElementById("plate-count");
    function updCount(n) {
      if (count) count.textContent = n + " / " + cards.length;
    }
    updCount(cards.length);
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var hit = !q || (c.getAttribute("data-reg") || "").toLowerCase().indexOf(q) !== -1;
        c.style.display = hit ? "" : "none";
        if (hit) shown++;
      });
      updCount(shown);
    });
  }

  /* ---------------- motif stamping (canvas) ---------------- */
  function stampMotif(ctx, x, y, r, motif, color, rot) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = 0.82;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = Math.max(2, r * 0.09);
    var i, a;
    if (motif === "circles") {
      for (i = 1; i <= 4; i++) { ctx.beginPath(); ctx.arc(0, 0, r * i / 4.2, 0, 7); ctx.stroke(); }
    } else if (motif === "triangles") {
      for (i = 1; i <= 2; i++) {
        var rr = r * i / 2.2;
        ctx.beginPath();
        ctx.moveTo(0, -rr); ctx.lineTo(rr * 0.87, rr * 0.5); ctx.lineTo(-rr * 0.87, rr * 0.5);
        ctx.closePath(); ctx.stroke();
      }
    } else if (motif === "rhombus") {
      for (i = 1; i <= 2; i++) {
        var rr2 = r * i / 2.2;
        ctx.beginPath();
        ctx.moveTo(0, -rr2); ctx.lineTo(rr2, 0); ctx.lineTo(0, rr2); ctx.lineTo(-rr2, 0);
        ctx.closePath(); ctx.stroke();
      }
    } else if (motif === "broken") {
      ctx.beginPath();
      var steps = 6;
      for (i = 0; i <= steps; i++) {
        var px = -r + (2 * r) * i / steps;
        var py = (i % 2 === 0 ? 1 : -1) * r * 0.35;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-r, r * 0.55); ctx.lineTo(r, r * 0.55); ctx.stroke();
    } else if (motif === "biojival") {
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.7, -r * 0.5, r * 0.7, r * 0.2, 0, r * 0.55);
      ctx.bezierCurveTo(-r * 0.7, r * 0.2, -r * 0.7, -r * 0.5, 0, -r);
      ctx.stroke();
      for (i = 1; i <= 2; i++) { ctx.beginPath(); ctx.arc(0, 0, r * i / 3, 0, 7); ctx.stroke(); }
    } else { // squares
      for (i = 1; i <= 3; i++) {
        var s = r * i / 3.2;
        ctx.strokeRect(-s, -s, 2 * s, 2 * s);
      }
    }
    ctx.restore();
  }

  /* ---------------- hero canvas: ambient stamping ---------------- */
  var heroCanvas = document.getElementById("stamp-canvas");
  if (heroCanvas) {
    var hctx = heroCanvas.getContext("2d");
    var motifs = ["circles", "triangles", "rhombus", "broken", "biojival", "squares"];
    var tints = ["rgba(233,220,201,0.5)", "rgba(217,178,115,0.5)", "rgba(31,25,19,0.35)"];
    function sizeHero() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
      hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    }
    sizeHero();
    window.addEventListener("resize", sizeHero);
    var pressed = [];
    function pressOne() {
      var w = heroCanvas.width, h = heroCanvas.height;
      var x = 40 + Math.random() * (w - 80);
      var y = 40 + Math.random() * (h - 80);
      var m = motifs[Math.floor(Math.random() * motifs.length)];
      var r = 16 + Math.random() * 26;
      var rot = (Math.random() - 0.5) * 0.7;
      var col = tints[Math.floor(Math.random() * tints.length)];
      pressed.push({ x: x, y: y, r: r, m: m, c: col, rot: rot, born: performance.now() });
      if (pressed.length > 60) pressed.shift();
    }
    function draw(now) {
      hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      pressed.forEach(function (p) {
        var age = now - p.born;
        var alpha = age < 600 ? age / 600 : 1;
        hctx.globalAlpha = alpha;
        stampMotif(hctx, p.x, p.y, p.r, p.m, p.c, p.rot);
        hctx.globalAlpha = 1;
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
    setInterval(pressOne, 700);
    for (var i = 0; i < 12; i++) pressOne();
  }

  /* ---------------- workshop toy ---------------- */
  var toy = document.getElementById("toy-canvas");
  if (toy) {
    var tctx = toy.getContext("2d");
    var curMotif = "circles", curColor = "#A64B2A";
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function sizeToy() {
      var w = toy.clientWidth, h = toy.clientHeight || 420;
      toy.width = w * dpr; toy.height = 420 * dpr;
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeToy();
    window.addEventListener("resize", sizeToy);
    var dragging = false, lastStamp = 0;

    document.querySelectorAll("#motif-picker .tool").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("#motif-picker .tool").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        curMotif = b.getAttribute("data-motif");
      });
    });
    document.querySelectorAll("#color-picker .swatch").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("#color-picker .swatch").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        curColor = b.getAttribute("data-color");
      });
    });
    var clearBtn = document.getElementById("clear-canvas");
    if (clearBtn) clearBtn.addEventListener("click", function () {
      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.clearRect(0, 0, toy.width, toy.height);
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });

    function doStamp(e) {
      var rect = toy.getBoundingClientRect();
      var x = (e.clientX - rect.left) * (toy.width / dpr / rect.width);
      var y = (e.clientY - rect.top) * (toy.height / dpr / rect.height);
      var now = performance.now();
      if (dragging && now - lastStamp < 90) return;
      lastStamp = now;
      stampMotif(tctx, x, y, 22 + Math.random() * 8, curMotif, curColor, (Math.random() - 0.5) * 0.5);
    }
    toy.addEventListener("pointerdown", function (e) {
      dragging = true; toy.setPointerCapture(e.pointerId); doStamp(e);
    });
    toy.addEventListener("pointermove", function (e) { if (dragging) doStamp(e); });
    toy.addEventListener("pointerup", function () { dragging = false; });
    toy.addEventListener("pointerleave", function () { dragging = false; });
  }
})();
