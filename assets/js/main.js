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

  /* ---------------- mobile burger menu (slide-out drawer) ---------------- */
  var siteNav = document.querySelector(".site-nav");
  if (siteNav) {
    var topUl = siteNav.querySelector(":scope > ul");
    var langT = siteNav.querySelector(".lang-toggle");
    if (topUl && langT) {
      /* drawer skeleton */
      var backdrop = document.createElement("div");
      backdrop.className = "nav-drawer-backdrop";
      var drawer = document.createElement("nav");
      drawer.className = "nav-drawer";
      drawer.setAttribute("aria-label", "Menú / Menu");
      drawer.setAttribute("aria-hidden", "true");

      var dHead = document.createElement("div");
      dHead.className = "nav-drawer-head";
      var dClose = document.createElement("button");
      dClose.type = "button";
      dClose.className = "nav-drawer-close";
      dClose.setAttribute("aria-label", "Cerrar menú / Close menu");
      dClose.innerHTML = "×";
      dHead.appendChild(dClose);

      var dBody = document.createElement("div");
      dBody.className = "nav-drawer-body";

      /* clone the top-level items, expanding the chapters dropdown */
      Array.prototype.forEach.call(topUl.children, function (li) {
        if (li.classList.contains("dropdown")) {
          var grp = document.createElement("div");
          grp.className = "nav-drawer-group";
          var grpBtn = document.createElement("button");
          grpBtn.type = "button";
          grpBtn.className = "nav-drawer-grpbtn";
          grpBtn.innerHTML = li.querySelector(".dropbtn").innerHTML;
          var sub = document.createElement("div");
          sub.className = "nav-drawer-sub";
          li.querySelectorAll(".dropdown-menu a").forEach(function (a) {
            var c = a.cloneNode(true);
            c.addEventListener("click", function () { closeDrawer(); });
            sub.appendChild(c);
          });
          grpBtn.addEventListener("click", function () {
            grp.classList.toggle("open");
          });
          grp.appendChild(grpBtn);
          grp.appendChild(sub);
          dBody.appendChild(grp);
        } else {
          var a = li.querySelector("a");
          if (a) {
            var c = a.cloneNode(true);
            c.addEventListener("click", function () { closeDrawer(); });
            dBody.appendChild(c);
          }
        }
      });

      /* language toggle (mirrors the header buttons) */
      var dLang = document.createElement("div");
      dLang.className = "nav-drawer-lang";
      [["btn-es", "ES"], ["btn-en", "EN"]].forEach(function (pair) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = pair[1];
        b.addEventListener("click", function () {
          var real = document.getElementById(pair[0]);
          if (real) real.click();
          syncDrawerLang();
        });
        b.setAttribute("data-lang", pair[0] === "btn-es" ? "es" : "en");
        dLang.appendChild(b);
      });
      function syncDrawerLang() {
        var es = body.classList.contains("lang-es");
        dLang.querySelectorAll("button").forEach(function (b) {
          b.classList.toggle("active", (b.getAttribute("data-lang") === "es") === es);
        });
      }
      syncDrawerLang();

      drawer.appendChild(dHead);
      drawer.appendChild(dBody);
      drawer.appendChild(dLang);
      document.body.appendChild(backdrop);
      document.body.appendChild(drawer);

      /* burger button in the header */
      var burger = document.createElement("button");
      burger.type = "button";
      burger.className = "nav-burger";
      burger.setAttribute("aria-label", "Menú / Menu");
      burger.setAttribute("aria-expanded", "false");
      burger.innerHTML = "<span></span><span></span><span></span>";
      siteNav.appendChild(burger);

      var open = false;
      function openDrawer() {
        open = true;
        drawer.classList.add("open");
        backdrop.classList.add("open");
        burger.classList.add("open");
        burger.setAttribute("aria-expanded", "true");
        drawer.setAttribute("aria-hidden", "false");
        document.body.classList.add("nav-locked");
        syncDrawerLang();
      }
      function closeDrawer() {
        if (!open) return;
        open = false;
        drawer.classList.remove("open");
        backdrop.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        drawer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("nav-locked");
      }
      burger.addEventListener("click", function () { open ? closeDrawer() : openDrawer(); });
      dClose.addEventListener("click", closeDrawer);
      backdrop.addEventListener("click", closeDrawer);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeDrawer();
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 720) closeDrawer();
      });
    }
  }

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
    document.querySelectorAll(".lang-block .img-block img").forEach(function (el) {
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
  var IMP_N = 35;
  var IMGS = [];
  var imgLoads = [];
  for (var ii = 1; ii <= IMP_N; ii++) {
    (function (n) {
      var im = new Image();
      imgLoads.push(new Promise(function (res) { im.onload = res; im.onerror = res; }));
      im.src = "assets/stamps/stamp" + n + ".png?" + (window.ASSET_VER || "v=63");
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
    var W = 900, H = 420;                    // logical workshop size
    var frieze = false;                       // frieze band mode
    var strokes = [];                         // every impression, for re-render
    var fireGlow = 0;                         // firing animation state

    function sizeToy() {
      var w = toy.clientWidth || 900;
      var h = Math.round(w * H / W);          // keep the slab's aspect on any width
      toy.width = Math.round(w * dpr); toy.height = Math.round(h * dpr);
      toy.style.height = h + "px";
      // uniform logical -> device scale (fixes the squashed mobile slab)
      var s = dpr * (w / W);
      tctx.setTransform(s, 0, 0, s, 0, 0);
    }

    function drawSurface() {
      tctx.save();
      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.clearRect(0, 0, toy.width, toy.height);
      tctx.restore();
      // clay slab (logical coords; the sizeToy transform handles all scaling)
      var g = tctx.createRadialGradient(W * 0.3, H * 0.25, 40, W * 0.45, H * 0.5, W * 0.75);
      g.addColorStop(0, "#DDB77A"); g.addColorStop(0.55, "#C98F3D"); g.addColorStop(1, "#A96F33");
      tctx.fillStyle = g;
      tctx.beginPath();
      var r = 26;
      tctx.moveTo(r, 8);
      tctx.arcTo(W - 8, 8, W - 8, H - 8, r);
      tctx.arcTo(W - 8, H - 8, 8, H - 8, r);
      tctx.arcTo(8, H - 8, 8, 8, r);
      tctx.arcTo(8, 8, W - 8, 8, r);
      tctx.fill();
      // rounded-edge shadow for depth
      tctx.strokeStyle = "rgba(70,40,15,.35)";
      tctx.lineWidth = 6; tctx.stroke();
    }

    // ---- relief stamping: colour pass + shadow pass + highlight pass ----
    function stampImp(ctx, n, x, y, size, rot, color, alpha, depth) {
      var t = tinted(n, color);
      if (!t) return;
      ctx.save();
      ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
      // 1) carved shadow (offset down-right, darkened clay) — only for relief
      var d = depth || 0.5;
      ctx.save();
      ctx.globalAlpha = alpha * 0.5 * d;
      ctx.filter = "brightness(0.35)";
      ctx.drawImage(t, -size / 2 + size * 0.045 * d, -size / 2 + size * 0.05 * d, size, size);
      ctx.restore();
      // 2) pigment impression itself
      ctx.drawImage(t, -size / 2, -size / 2, size, size);
      // 3) raised catch-light on the upper edge (only when pressed deep)
      if (d > 0.55) {
        ctx.save();
        ctx.globalAlpha = (d - 0.55) * 0.9;
        ctx.filter = "brightness(1.9) blur(1px)";
        ctx.drawImage(t, -size / 2 - size * 0.02, -size / 2 - size * 0.028, size, size);
        ctx.restore();
      }
      ctx.restore();
      // 4) clay crumbs scattered around a deep press
      if (d > 0.6) {
        ctx.save();
        ctx.fillStyle = "rgba(122,84,36,.8)";
        for (var i = 0; i < 7; i++) {
          var a = Math.random() * Math.PI * 2, rr = size * (0.55 + Math.random() * 0.22);
          ctx.beginPath();
          ctx.arc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 1 + Math.random() * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function reRender() {
      drawSurface();
      strokes.forEach(function (s) { stampImp(tctx, s.n, s.x, s.y, s.size, s.rot, s.color, s.alpha, s.depth); });
      if (fireGlow > 0) {
        tctx.save();
        tctx.globalAlpha = Math.min(1, fireGlow);
        tctx.fillStyle = "rgba(255,120,30," + (0.25 * fireGlow) + ")";
        tctx.fillRect(0, 0, W, H);
        tctx.restore();
      }
    }

    Promise.all(imgLoads).then(function () {
      sizeToy();
      window.addEventListener("resize", function () { sizeToy(); reRender(); });
      var firstBtn = document.querySelector("#motif-picker .tool");
      if (firstBtn) firstBtn.classList.add("active");
      reRender();
    });

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
    // frieze toggle
    var friezeBtn = document.getElementById("frieze-toggle");
    if (friezeBtn) friezeBtn.addEventListener("click", function () {
      frieze = !frieze;
      friezeBtn.classList.toggle("active", frieze);
      friezeBtn.setAttribute("aria-pressed", String(frieze));
    });
    var clearBtn = document.getElementById("clear-canvas");
    if (clearBtn) clearBtn.addEventListener("click", function () {
      strokes = []; fireGlow = 0; reRender();
    });

    // ---- fire & share: kiln animation, then a downloadable museum card ----
    var fireBtn = document.getElementById("fire-btn");
    if (fireBtn) fireBtn.addEventListener("click", function () {
      if (!strokes.length) return;
      fireBtn.disabled = true;
      var t0 = performance.now();
      (function glow() {
        var k = (performance.now() - t0) / 1600;
        fireGlow = k < 1 ? Math.sin(k * Math.PI) : 0;
        reRender();
        if (k < 1) requestAnimationFrame(glow);
        else { fireGlow = 0; fireBtn.disabled = false; makeCard(); }
      })();
    });

    function makeCard() {
      var off = document.createElement("canvas");
      off.width = 1000; off.height = 700;
      var c = off.getContext("2d");
      // parchment card
      c.fillStyle = "#F3EBDA"; c.fillRect(0, 0, 1000, 700);
      c.strokeStyle = "#A64B2A"; c.lineWidth = 10; c.strokeRect(28, 28, 944, 644);
      c.strokeStyle = "rgba(166,75,42,.45)"; c.lineWidth = 3; c.strokeRect(48, 48, 904, 604);
      // the artwork (clay slab with impressions, fitted)
      var s = Math.min(820 / toy.width, 420 / toy.height);
      var dw = toy.width * s, dh = toy.height * s;
      c.drawImage(toy, 90 + (820 - dw) / 2, 90 + (420 - dh) / 2, dw, dh);
      // caption
      c.fillStyle = "#5A2F14";
      c.font = "italic 30px Georgia, serif"; c.textAlign = "center";
      var d = new Date();
      var es = "Pintadera estampada en el taller digital · " + d.toLocaleDateString("es-ES");
      var en = "Pintadera stamped in the digital workshop · " + d.toLocaleDateString("en-GB");
      var body = document.body;
      c.fillText(body.classList.contains("lang-es") ? es : en, 500, 570);
      c.font = "22px Georgia, serif"; c.fillStyle = "#8A6A45";
      c.fillText("tras Pintaderas de El Museo Canario (2013) · after Pintaderas of El Museo Canario", 500, 615);
      var a = document.createElement("a");
      a.download = "pintadera-workshop.png";
      a.href = off.toDataURL("image/png");
      a.click();
    }

    // ---- pointer: pressure via hold time; frieze stamps a full band ----
    var lastClick = 0, pressTimer = null, pressDepth = 0.5;
    function logicalXY(e) {
      var rect = toy.getBoundingClientRect();
      var sc = (toy.clientWidth || 900) / W;
      return { x: (e.clientX - rect.left) / sc, y: (e.clientY - rect.top) / sc };
    }
    function inClay(p) {
      return p.x > 14 && p.x < W - 14 && p.y > 14 && p.y < H - 14;
    }
    function oneStamp(p, depth) {
      var size = 88 + Math.random() * 30 + depth * 26;
      var rot = (Math.random() - 0.5) * 0.55;
      strokes.push({ n: curImp, x: p.x, y: p.y, size: size, rot: rot, color: curColor, alpha: 0.72 + depth * 0.2, depth: depth });
      reRender();
    }
    function friezeBand(p) {
      // a rhythmic horizontal band of the chosen motif across the clay
      var size = 92, gap = size * 0.62, y = Math.max(70, Math.min(H - 70, p.y));
      var n = Math.floor((W - 140) / gap);
      for (var i = 0; i < n; i++) {
        var x = 90 + gap * i + gap / 2;
        strokes.push({ n: curImp, x: x, y: y + (Math.random() - 0.5) * 3, size: size,
                       rot: (Math.random() - 0.5) * 0.06, color: curColor, alpha: 0.8, depth: 0.6 });
      }
      reRender();
    }
    toy.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      var now = performance.now();
      if (now - lastClick < 120) return;
      lastClick = now;
      var p = logicalXY(e);
      if (!inClay(p)) return;
      if (frieze) { friezeBand(p); return; }
      pressDepth = 0.5;
      oneStamp(p, pressDepth);
      // hold = deeper press (capped)
      var p0 = p;
      pressTimer = setInterval(function () {
        pressDepth = Math.min(1, pressDepth + 0.12);
        oneStamp(p0, pressDepth);
      }, 260);
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
      toy.addEventListener(ev, function () { if (pressTimer) { clearInterval(pressTimer); pressTimer = null; } });
    });
    toy.addEventListener("pointermove", function (e) {
      if (e.buttons !== 0) e.preventDefault();
    });
  }

  /* ---------------- hero stamp: random from the set, slow rotation ---------------- */
  if (heroStamp) {
    var VER = window.ASSET_VER || "v=63";
    var HERO_EXCLUDE = [];   // final curated set — nothing excluded from the hero
    var lastN = parseInt((heroStamp.src.match(/stamp(\d+)/) || [0, 23])[1], 10);
    function randStamp() {
      var n = lastN;
      do { n = 1 + Math.floor(Math.random() * 35); }
      while (n === lastN || HERO_EXCLUDE.indexOf(n) !== -1);
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
    setInterval(swap, 10000);
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

    /* fixed sidebar navigation (wide screens): mirrors the toc links */
    var sidebar = document.createElement("nav");
    sidebar.className = "section-sidebar";
    sidebar.setAttribute("aria-label", "Section navigation");
    heads.forEach(function (h) {
      var a = document.createElement("a");
      a.href = h.link.getAttribute("href");
      a.innerHTML = h.link.innerHTML;   // keeps the l-es / l-en spans
      h.sideLink = a;
      sidebar.appendChild(a);
    });
    document.body.appendChild(sidebar);

    /* ghost stamp in each section bar (like the homepage cards) —
       deterministic per section id, injected in both languages */
    document.querySelectorAll('.prose h2[id^="sec-"]').forEach(function (h) {
      if (h.querySelector(".sec-stamp")) return;
      var id = h.id || "";
      var hash = 0;
      for (var i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
      var img = document.createElement("img");
      img.className = "sec-stamp";
      img.src = "assets/stamps/stamp" + (1 + (hash % 35)) + "_sand.png?" +
        (window.ASSET_VER || "v=66");
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.style.transform = "translateY(-50%) rotate(" + ((hash % 9) - 4) + "deg)";
      h.appendChild(img);
      var span = document.createElement("span");
      span.className = "sec-title";
      while (h.firstChild !== img) span.appendChild(h.firstChild);
      h.insertBefore(span, img);
    });

    /* reading indicator: fixed chip showing current section + percent */
    var chip = document.createElement("div");
    chip.className = "reading-chip";
    chip.innerHTML = '<span class="rc-pct"></span><span class="rc-sec"></span>';
    document.body.appendChild(chip);
    var chipPct = chip.querySelector(".rc-pct"), chipSec = chip.querySelector(".rc-sec");
    function updateToc() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var y = h.scrollTop + 120;
      var pct = max > 0 ? Math.round((h.scrollTop / max) * 100) : 0;
      chipPct.textContent = pct + "%";
      var cur = null;
      heads.forEach(function (h2) {
        h2.vis = h2.block.offsetWidth > 0;
        if (h2.vis && h2.el.offsetTop <= y) cur = h2;
      });
      chipSec.textContent = cur ? cur.link.textContent.trim() : "";
      chip.classList.toggle("bare", !cur);
      heads.forEach(function (h2) {
        h2.link.classList.toggle("here", h2.vis && h2 === cur);
        if (h2.sideLink) {
          h2.sideLink.classList.toggle("here", h2.vis && h2 === cur);
          h2.sideLink.style.display = h2.vis ? "" : "none";
        }
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
    /* keep the chip's section name in the active language */
    if (btnES) btnES.addEventListener("click", updateToc);
    if (btnEN) btnEN.addEventListener("click", updateToc);
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

  /* ---------------- photographic annex: in-flow expansion band ----------------
     One reusable band element, inserted below the clicked tile in the grid.
     The FULL-BLEED wrapper (100vw) is never clipped: only the inner clay
     "bleed" layer animates (max-height + opacity). Content (caption, museum
     record, mentions) is cloned in from the tile. The band image hands off
     to the lightbox for full size. */
  var band = document.createElement("div");
  band.className = "plate-band";
  band.innerHTML =
    '<div class="band-bleed"><div class="band-content">' +
    '<button class="band-close" type="button" aria-label="Close">×</button>' +
    '<figure class="band-fig"><img src="" alt=""></figure>' +
    '<div class="band-info"></div></div></div>';
  var bleed = band.querySelector(".band-bleed");
  var bandImg = band.querySelector(".band-fig img");
  var bandInfo = band.querySelector(".band-info");
  var bandCard = null;      // currently open tile (null = closed)

  function fillBand(card) {
    var img = card.querySelector("img");
    var cap = card.querySelector(".plate-cap");
    var ficha = card.querySelector(".plate-ficha");
    bandImg.src = img ? img.src : "";
    bandInfo.innerHTML = "";
    if (cap) {
      var h = document.createElement("p");
      h.className = "band-cap";
      h.textContent = cap.textContent;
      bandInfo.appendChild(h);
    }
    var hasRecord = false;
    if (ficha) {
      var body = ficha.querySelector(".ficha-body");
      if (body) {
        bandInfo.appendChild(body.cloneNode(true));
        hasRecord = true;
      }
    }
    if (!hasRecord) {
      var none = document.createElement("p");
      none.className = "band-none";
      none.innerHTML =
        '<span class="l-es">No hay ficha catalográfica disponible para esta pieza en el catálogo en línea de El Museo Canario.</span>' +
        '<span class="l-en">No catalogue record is available for this piece in El Museo Canario\'s online catalogue.</span>';
      bandInfo.appendChild(none);
    }
    band.classList.toggle("solo", !hasRecord);
  }

  function openBand(card) {
    if (bandCard === card) { closeBand(); return; }   // same tile toggles shut
    closeBand(true);                                   // move/restart elsewhere
    bandCard = card;
    fillBand(card);
    card.parentNode.insertBefore(band, card.nextSibling);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { band.classList.add("open"); });
    });
    setTimeout(function () {
      if (bandCard === card) band.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 280);
  }
  function closeBand(instant) {
    if (!bandCard) return;
    bandCard = null;
    if (instant) {
      if (band.parentNode) band.parentNode.removeChild(band);
      return;
    }
    band.classList.remove("open");
    setTimeout(function () {
      if (!bandCard && band.parentNode) band.parentNode.removeChild(band);
    }, 500);
  }

  band.querySelector(".band-close").addEventListener("click", function () { closeBand(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && bandCard && !(lb && lb.classList.contains("open"))) closeBand();
  });
  bandImg.addEventListener("click", function () {
    if (lb) openLB(bandImg);   // full size, with prev/next through the plates
  });

  document.querySelectorAll(".plate-card").forEach(function (card) {
    card.classList.add("clickable");
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;            // pills/links navigate
      var reg = card.getAttribute("data-reg") || "";
      if (/^\d+$/.test(reg)) openBand(card);        // inventory tiles: the band
      else { var im = card.querySelector("img"); if (im && lb) openLB(im); }  // tech plates: lightbox
    });
  });
})();
