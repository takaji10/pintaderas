/* Pintaderas de El Museo Canario — interactions (v5) */
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

  /* ---------------- side flyout tabs ---------------- */
  document.querySelectorAll(".stab").forEach(function (stab) {
    var btn = stab.querySelector(".stab-btn");
    if (!btn || btn.tagName === "A") return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var wasOpen = stab.classList.contains("open");
      document.querySelectorAll(".stab.open").forEach(function (s) { s.classList.remove("open"); });
      if (!wasOpen) stab.classList.add("open");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".stab")) {
      document.querySelectorAll(".stab.open").forEach(function (s) { s.classList.remove("open"); });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".stab.open").forEach(function (s) { s.classList.remove("open"); });
    }
  });
  // close flyout when a link inside is followed
  document.querySelectorAll(".stab-fly a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.querySelectorAll(".stab.open").forEach(function (s) { s.classList.remove("open"); });
    });
  });

  /* ---------------- reveal on scroll ---------------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = 1; en.target.style.transform = "none";
          io2.unobserve(en.target);
        }
      });
    }, { threshold: 0.04 });
    document.querySelectorAll(".img-block, .plate-card, .table-wrap, .q-block").forEach(function (el) {
      el.style.opacity = 0; el.style.transform = "translateY(12px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
      io2.observe(el);
    });
  }

  /* ---------------- gallery lightbox ---------------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    var lbCount = lb.querySelector(".lb-count");
    var gallery = []; // {src, cap}
    var current = 0;

    function collectGallery() {
      gallery = [];
      document.querySelectorAll(".lang-block:not([hidden]) .img-block img, .lang-block:not([hidden]) .plate-card img, .lang-block:not([hidden]) .strip-fig a").forEach(function (el) {
        var src = el.tagName === "IMG" ? el.src : el.querySelector("img").src;
        var cap = "";
        var blk = el.closest(".img-block") || el.closest(".plate-card") || el.closest(".strip-fig");
        if (blk) {
          var sib = blk.nextElementSibling;
          if (sib && sib.classList.contains("fig-caption")) cap = sib.textContent;
          else {
            var fc = blk.querySelector("figcaption");
            if (fc) cap = fc.textContent;
          }
        }
        gallery.push({ src: src, cap: cap });
      });
    }
    function show(i) {
      if (!gallery.length) return;
      current = (i + gallery.length) % gallery.length;
      lbImg.src = gallery[current].src;
      lbCap.textContent = gallery[current].cap || "";
      lbCount.textContent = (current + 1) + " / " + gallery.length;
    }
    function openLB(target) {
      collectGallery();
      var idx = 0;
      var src = target.tagName === "IMG" ? target.src : target.querySelector("img").src;
      for (var i = 0; i < gallery.length; i++) { if (gallery[i].src === src) { idx = i; break; } }
      show(idx);
      lb.classList.add("open");
      lb.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function closeLB() {
      lb.classList.remove("open");
      lb.hidden = true;
      document.body.style.overflow = "";
    }
    document.querySelectorAll(".lang-block .img-block img, .lang-block .plate-card img").forEach(function (el) {
      el.addEventListener("click", function () { openLB(el); });
    });
    lb.querySelector(".lb-close").addEventListener("click", closeLB);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLB();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------------- plates gallery filter ---------------- */
  var search = document.getElementById("plate-search");
  if (search) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".lang-block:not([hidden]) .plate-card"));
    var count = document.getElementById("plate-count");
    var allCards = Array.prototype.slice.call(document.querySelectorAll(".plate-card"));
    // filter whichever language block is visible
    function visibleCards() {
      return allCards.filter(function (c) { return c.offsetParent !== null; });
    }
    function updCount(n, total) { if (count) count.textContent = n + " / " + total; }
    updCount(visibleCards().length, visibleCards().length);
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var vis = visibleCards();
      var shown = 0;
      vis.forEach(function (c) {
        var hit = !q || (c.getAttribute("data-reg") || "").toLowerCase().indexOf(q) !== -1;
        c.style.display = hit ? "" : "none";
        if (hit) shown++;
      });
      updCount(shown, vis.length);
    });
  }

  /* ---------------- quiz ---------------- */
  var quizDataEl = document.getElementById("quiz-data");
  if (quizDataEl) {
    var answers = JSON.parse(quizDataEl.textContent);
    var given = new Array(answers.length).fill(null);
    var verdicts = {
      ok: { es: "Correcto.", en: "Correct." },
      ko: { es: "No es correcto.", en: "Not correct." }
    };
    var finalMsgs = [
      { min: 6, es: "Dominas el catálogo. Enhorabuena.", en: "You know the catalogue inside out. Congratulations." },
      { min: 4, es: "Buena lectura. Casi todo atendido.", en: "A careful reader. Almost everything noticed." },
      { min: 2, es: "Un buen comienzo: el catálogo tiene más que contar.", en: "A good start: the catalogue has more to tell." },
      { min: 0, es: "El taller y las placas te esperan para otra visita.", en: "The workshop and the plates await another visit." }
    ];
    function curLang() { return body.classList.contains("lang-es") ? "es" : "en"; }
    function updateResult() {
      var res = document.querySelector(".q-result");
      if (!res) return;
      var answered = given.filter(function (g) { return g !== null; }).length;
      if (answered < answers.length) { res.hidden = true; return; }
      var score = given.filter(function (g, i) { return g === answers[i]; }).length;
      var msg = finalMsgs.find(function (m) { return score >= m.min; });
      res.querySelector(".q-score").textContent =
        (curLang() === "es" ? "Puntuación: " : "Score: ") + score + " / " + answers.length;
      res.querySelector(".q-verdict-final").textContent = msg[curLang()];
      res.hidden = false;
      res.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    document.querySelectorAll(".q-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qi = parseInt(btn.getAttribute("data-q"), 10) - 1;
        var oi = parseInt(btn.getAttribute("data-o"), 10);
        if (given[qi] !== null) return;
        given[qi] = oi;
        var block = btn.closest(".q-block");
        var verdict = block.querySelector(".q-verdict");
        block.querySelectorAll(".q-opt").forEach(function (b) { b.disabled = true; });
        if (oi === answers[qi]) {
          btn.classList.add("correct");
          verdict.textContent = verdicts.ok[curLang()];
          verdict.className = "q-verdict ok";
        } else {
          btn.classList.add("wrong");
          verdict.textContent = verdicts.ko[curLang()];
          verdict.className = "q-verdict ko";
          var right = block.querySelector('.q-opt[data-o="' + answers[qi] + '"]');
          if (right) right.classList.add("correct");
        }
        verdict.hidden = false;
        updateResult();
      });
    });
    var restart = document.getElementById("q-restart");
    if (restart) restart.addEventListener("click", function () {
      given = new Array(answers.length).fill(null);
      document.querySelectorAll(".q-opt").forEach(function (b) {
        b.disabled = false; b.classList.remove("correct", "wrong");
      });
      document.querySelectorAll(".q-verdict").forEach(function (v) { v.hidden = true; });
      var res = document.querySelector(".q-result");
      if (res) res.hidden = true;
      var first = document.querySelector(".q-block");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------------- motif stamping (canvas) ---------------- */
  function stampMotif(ctx, x, y, r, motif, color, rot) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = 0.82;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = Math.max(2, r * 0.09);
    var i;
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
      var w = toy.clientWidth || 900;
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
