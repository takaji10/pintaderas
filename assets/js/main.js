/* Pintaderas de El Museo Canario — interactions (v1 design) */
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
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
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
  }

  /* ---------------- gallery lightbox (class-controlled) ---------------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    var lbCount = lb.querySelector(".lb-count");
    var gallery = [];
    var current = 0;

    function collectGallery() {
      gallery = [];
      document.querySelectorAll(".lang-block:not([hidden]) .img-block img, .lang-block:not([hidden]) .plate-card > img").forEach(function (el) {
        var cap = "";
        var blk = el.closest(".img-block") || el.closest(".plate-card");
        if (blk) {
          var sib = blk.nextElementSibling;
          if (sib && sib.classList.contains("fig-caption")) cap = sib.textContent;
          else {
            var fc = blk.querySelector("figcaption");
            if (fc) {
              var pc = fc.querySelector(".plate-cap");
              cap = pc ? pc.textContent : fc.textContent;
            }
          }
        }
        gallery.push({ src: el.src, cap: cap });
      });
    }
    function show(i) {
      if (!gallery.length) return;
      current = (i + gallery.length) % gallery.length;
      lbImg.src = gallery[current].src;
      lbCap.textContent = gallery[current].cap || "";
      lbCount.textContent = (current + 1) + " / " + gallery.length;
    }
    function openLB(img) {
      collectGallery();
      var idx = 0;
      for (var i = 0; i < gallery.length; i++) { if (gallery[i].src === img.src) { idx = i; break; } }
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
    document.querySelectorAll(".lang-block .img-block img, .lang-block .plate-card > img").forEach(function (el) {
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
    var allCards = Array.prototype.slice.call(document.querySelectorAll(".plate-card"));
    var count = document.getElementById("plate-count");
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

  /* ---------------- stamp impression images ---------------- */
  var IMP_N = 25;
  var IMGS = [];
  var imgLoads = [];
  for (var ii = 1; ii <= IMP_N; ii++) {
    (function (n) {
      var im = new Image();
      imgLoads.push(new Promise(function (res) { im.onload = res; im.onerror = res; }));
      im.src = "assets/stamps/stamp" + n + ".png?" + (window.ASSET_VER || "v=31");
      IMGS[n] = im;
    })(ii);
  }
  var tintCache = {};
  function tinted(n, color) {
    var key = n + "|" + color;
    if (tintCache[key]) return tintCache[key];
    var img = IMGS[n];
    if (!img || !img.complete || !img.naturalWidth) return null;
    var c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    var cx = c.getContext("2d");
    cx.drawImage(img, 0, 0);
    cx.globalCompositeOperation = "source-in";
    cx.fillStyle = color;
    cx.fillRect(0, 0, c.width, c.height);
    tintCache[key] = c;
    return c;
  }
  function stampImp(ctx, n, x, y, size, rot, color, alpha) {
    var t = tinted(n, color);
    if (!t) return;
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
    ctx.drawImage(t, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  /* ---------------- hero canvas: ambient impressions ---------------- */
  var heroCanvas = document.getElementById("stamp-canvas");
  var heroStamp = document.getElementById("hero-stamp");
  if (heroCanvas) {
    var hctx = heroCanvas.getContext("2d");
    var tints = ["rgba(233,220,201,0.55)", "rgba(217,178,115,0.5)", "rgba(31,25,19,0.4)"];
    Promise.all(imgLoads).then(function () {
      function sizeHero() {
        heroCanvas.width = heroCanvas.offsetWidth;
        heroCanvas.height = heroCanvas.offsetHeight;
        hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        pressed = [];   // re-seed after resize (rotation/orientation change)
        computeExcl();
      }
      sizeHero();
      window.addEventListener("resize", sizeHero);
      var pressed = [];
      var excl = null;   // keep-out circle around the central hero stamp
      function computeExcl() {
        if (!heroStamp) { excl = null; return; }
        var a = heroStamp.getBoundingClientRect();
        var b = heroCanvas.getBoundingClientRect();
        if (!a.width || !b.width) { excl = null; return; }
        excl = {
          x: a.left + a.width / 2 - b.left,
          y: a.top + a.height / 2 - b.top,
          r: Math.max(a.width, a.height) * 0.62
        };
      }
      computeExcl();
      function overlaps(x, y, s) {
        // bounding-circle test: no stamp may overlap another
        var r = s * 0.55;
        if (excl) {
          var dx = x - excl.x, dy = y - excl.y;
          if (dx * dx + dy * dy < (excl.r + r) * (excl.r + r)) return true;
        }
        for (var i = 0; i < pressed.length; i++) {
          var p = pressed[i];
          var dx = x - p.x, dy = y - p.y;
          var minD = r + p.s * 0.55;
          if (dx * dx + dy * dy < minD * minD) return true;
        }
        return false;
      }
      function pressOne() {
        var w = heroCanvas.width, h = heroCanvas.height;
        if (w < 40 || h < 40) return;
        var small = w < 700;                       // phones/tablets: smaller seals
        var sMin = small ? 44 : 100;
        var sMax = small ? 130 : 300;
        for (var tries = 0; tries < 24; tries++) {
          var s = sMin + Math.random() * (sMax - sMin);
          var x = s * 0.5 + 8 + Math.random() * Math.max(1, w - s - 16);
          var y = s * 0.5 + 8 + Math.random() * Math.max(1, h - s - 16);
          if (!overlaps(x, y, s)) {
            pressed.push({
              x: x, y: y, s: s,
              rot: (Math.random() - 0.5) * 1.2,
              n: 1 + Math.floor(Math.random() * IMP_N),
              c: tints[Math.floor(Math.random() * tints.length)],
              born: performance.now()
            });
            if (pressed.length > 12) pressed.shift();
            return;
          }
        }
        // canvas is full: retire the oldest impression to keep it breathing
        pressed.shift();
      }
      function draw(now) {
        hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        pressed.forEach(function (p) {
          var age = now - p.born;
          var alpha = age < 600 ? age / 600 : 1;
          stampImp(hctx, p.n, p.x, p.y, p.s, p.rot, p.c, alpha * 0.9);
        });
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
      setInterval(pressOne, 1200);
      for (var j = 0; j < 6; j++) pressOne();
    });
  }

  /* ---------------- workshop toy: real matrix impressions ---------------- */
  var toy = document.getElementById("toy-canvas");
  if (toy) {
    var tctx = toy.getContext("2d");
    var curImp = 1, curColor = "#A64B2A";
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function sizeToy() {
      var w = toy.clientWidth || 900;
      toy.width = w * dpr; toy.height = 420 * dpr;
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    Promise.all(imgLoads).then(function () {
      sizeToy();
      window.addEventListener("resize", sizeToy);
      var firstBtn = document.querySelector("#motif-picker .tool");
      if (firstBtn) firstBtn.classList.add("active");
    });
    var dragging = false, lastStamp = 0;
    var lastClick = 0;

    document.querySelectorAll("#motif-picker .tool").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("#motif-picker .tool").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        curImp = parseInt(b.getAttribute("data-imp"), 10) || 1;
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
      if (now - lastClick < 120) return;   // debounce double-taps
      lastClick = now;
      stampImp(tctx, curImp, x, y, 88 + Math.random() * 30, (Math.random() - 0.5) * 0.55, curColor, 0.85);
    }
    // single press per click — no drag stamping
    toy.addEventListener("pointerdown", function (e) {
      doStamp(e);
    });
    toy.addEventListener("pointermove", function (e) {
      // suppress any drag behaviour
      if (e.buttons !== 0) e.preventDefault();
    });
  }

  /* ---------------- hero stamp: random from the set, slow rotation ---------------- */
  if (heroStamp) {
    var VER = window.ASSET_VER || "v=31";
    var lastN = parseInt((heroStamp.src.match(/stamp(\d+)/) || [0, 17])[1], 10);
    function randStamp() {
      var n = lastN;
      while (n === lastN) n = 1 + Math.floor(Math.random() * 25);
      return n;
    }
    function swap() {
      lastN = randStamp();
      heroStamp.style.opacity = 0;
      setTimeout(function () {
        heroStamp.src = "assets/stamps/stamp" + lastN + "_sand.png?" + VER;
        heroStamp.style.opacity = 1;
      }, 450);
    }
    heroStamp.style.transition = "opacity .45s ease";
    setInterval(swap, 7000);
  }

  /* ---------------- section jump menu: scrollspy + progress ticks ---------------- */
  var tocs = document.querySelectorAll(".page-toc");
  if (tocs.length && bar) {
    var heads = [];
    document.querySelectorAll(".page-toc a").forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      var block = a.closest(".lang-block");
      if (el && block) heads.push({ el: el, link: a, block: block });
    });
    // tick marks on the progress bar
    var ticks = document.createElement("div");
    ticks.className = "progress-ticks";
    heads.forEach(function (h) {
      var t = document.createElement("span");
      t.className = "progress-tick";
      ticks.appendChild(t);
      h.tick = t;
    });
    bar.parentNode.appendChild(ticks);
    function updateToc() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var y = h.scrollTop + 120;
      var cur = null;
      heads.forEach(function (h2) {
        h2.vis = h2.block.offsetWidth > 0;
        if (h2.vis && h2.el.offsetTop <= y) cur = h2;
      });
      heads.forEach(function (h2) {
        h2.link.classList.toggle("here", h2.vis && h2 === cur);
        if (h2.tick) h2.tick.classList.toggle("here", h2.vis && h2 === cur);
      });
      if (max > 0) {
        ticks.style.display = "block";
        heads.forEach(function (h2) {
          if (!h2.vis) return;
          var p = (h2.el.offsetTop / max) * 100;
          if (h2.tick) h2.tick.style.left = Math.min(p, 100) + "%";
        });
      }
    }
    document.addEventListener("scroll", updateToc, { passive: true });
    updateToc();
  }

  /* ---------------- back to top ---------------- */
  var top = document.createElement("button");
  top.type = "button";
  top.className = "back-top";
  top.setAttribute("aria-label", "Volver arriba / Back to top");
  top.innerHTML = "↑";
  document.body.appendChild(top);
  function topVis() {
    top.classList.toggle("show", document.documentElement.scrollTop > 600);
  }
  document.addEventListener("scroll", topVis, { passive: true });
  top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  topVis();
})();
