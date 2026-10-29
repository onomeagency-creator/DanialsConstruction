/* Danial's Construction — interactions & motion */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ===== رقم الواتساب (صيغة دولية بدون +) =====
  const WHATSAPP_NUMBER = "201225799224";

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const fmt = n => Math.round(n).toLocaleString("en-US");
  const openWA = text => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");


  /* ---------- Photo album fallback ----------
     الصور تُقرأ من فولدر images/. لو صورة مش موجودة، الموقع يعرض نسختها الأونلاين تلقائياً. */
  const useRemote = img => { if (img.dataset.remote && img.src !== img.dataset.remote) img.src = img.dataset.remote; };
  $$("img[data-remote]").forEach(img => {
    img.addEventListener("error", () => useRemote(img), { once: true });
    if (img.complete && img.naturalWidth === 0) useRemote(img);
  });
  $$("[data-bg]").forEach(el => {
    const prop = el.classList.contains("testi") ? "--bg" : "--img";
    const local = new URL(el.dataset.bg, location.href).href;
    const set = src => el.style.setProperty(prop, `url("${src}")`);
    const probe = new Image();
    probe.onload = () => set(local);
    probe.onerror = () => el.dataset.remote && set(el.dataset.remote);
    probe.src = local;
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  const pre = $("#preloader");
  document.body.classList.add("is-loading");
  let loaderDone = false;
  const hideLoader = () => {
    if (loaderDone) return; loaderDone = true;
    pre.classList.add("is-done");
    document.body.classList.remove("is-loading");
    setTimeout(() => pre.remove(), 1300);
  };
  addEventListener("load", () => setTimeout(hideLoader, 700));
  setTimeout(hideLoader, 3500);

  /* ---------- Header / progress / to-top / parallax ---------- */
  const header = $("#header"), toTop = $("#toTop"), bar = $("#progress");
  const heroSlides = $(".hero__slides"), para = $$("[data-parallax]"), mbar = $(".mbar");
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle("is-scrolled", y > 60);
    toTop.classList.toggle("is-visible", y > 700);
    mbar && mbar.classList.toggle("is-visible", y > innerHeight * 0.5);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    if (reduce) return;
    if (y < innerHeight) heroSlides.style.transform = `translateY(${y * 0.3}px)`;
    para.forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -+el.dataset.parallax}px)`;
    });
  };
  let ticking = false;
  addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => scrollTo({ top: 0 }));

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger"), nav = $("#nav");
  const closeMenu = () => { burger.classList.remove("is-open"); nav.classList.remove("is-open"); document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); };
  burger.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    burger.classList.toggle("is-open", open); nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open); burger.setAttribute("aria-expanded", String(open));
  });
  $$(".nav__foot a").forEach(l => l.addEventListener("click", closeMenu));
  $$(".nav__link").forEach(l => l.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  /* Active nav link */
  const linkObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) $$(".nav__link, .mbar a").forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach(s => linkObs.observe(s));

  /* ---------- Hero slider + rotating words ---------- */
  const slides = $$(".hero__slide"), heroDots = $$("#heroDots button");
  let hi = 0, heroTimer;
  const goHero = i => {
    slides[hi].classList.remove("is-active"); heroDots[hi].classList.remove("is-active");
    hi = (i + slides.length) % slides.length;
    slides[hi].classList.add("is-active"); heroDots[hi].classList.add("is-active");
  };
  const startHero = () => { clearInterval(heroTimer); heroTimer = setInterval(() => goHero(hi + 1), 6500); };
  heroDots.forEach((d, i) => d.addEventListener("click", () => { goHero(i); startHero(); }));
  startHero();

  const words = $$("#rotator b"); let wi = 0;
  if (words.length > 1) setInterval(() => {
    const cur = words[wi];
    cur.classList.remove("is-active"); cur.classList.add("is-out");
    setTimeout(() => cur.classList.remove("is-out"), 800);
    wi = (wi + 1) % words.length;
    words[wi].classList.add("is-active");
  }, 2800);

  /* ---------- Reveal on scroll ---------- */
  const revObs = new IntersectionObserver((entries, o) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); o.unobserve(e.target); }
  }), { threshold: 0, rootMargin: "0px 0px 12% 0px" });
  $$(".reveal, .img-reveal, .section-head .title").forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 60 + "ms";
    revObs.observe(el);
  });

  /* Counters */
  const countObs = new IntersectionObserver((entries, o) => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / 1800, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick); o.unobserve(el);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach(el => countObs.observe(el));

  /* Services swipe dots (mobile) */
  const svc = $(".services__grid"), svcDots = $$("#svcDots i");
  svc.addEventListener("scroll", () => {
    const cards = $$(".service", svc), mid = svc.getBoundingClientRect().left + svc.clientWidth / 2;
    let best = 0, bd = 1e9;
    cards.forEach((c, i) => { const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i; } });
    svcDots.forEach((d, i) => d.classList.toggle("is-active", i === best));
  }, { passive: true });

  /* ---------- About tabs ---------- */
  const tabs = $$(".tab"), panels = $$(".tab-panel");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("is-active")); panels.forEach(x => x.classList.remove("is-active"));
    t.classList.add("is-active"); panels[+t.dataset.tab].classList.add("is-active");
  }));

  /* ---------- Style picker ---------- */
  const sTabs = $$(".style-tab"), sPanels = $$(".style-panel");
  let si = 0, sTimer;
  const goStyle = i => {
    sTabs[si].classList.remove("is-active"); sPanels[si].classList.remove("is-active");
    si = i; sTabs[si].classList.add("is-active"); sPanels[si].classList.add("is-active");
  };
  const autoStyle = () => { clearInterval(sTimer); sTimer = setInterval(() => goStyle((si + 1) % sTabs.length), 7000); };
  sTabs.forEach((t, i) => t.addEventListener("click", () => { goStyle(i); clearInterval(sTimer); }));
  autoStyle();

  /* ---------- Portfolio filter + lightbox ---------- */
  const cards = $$(".card");
  $$(".filter").forEach(f => f.addEventListener("click", () => {
    $$(".filter").forEach(x => x.classList.remove("is-active"));
    f.classList.add("is-active");
    const cat = f.dataset.filter;
    cards.forEach(c => {
      const hide = cat !== "all" && c.dataset.cat !== cat;
      c.classList.toggle("is-hidden", hide);
      c.classList.remove("is-filtering");
      if (!hide) { void c.offsetWidth; c.classList.add("is-filtering", "is-in"); }
    });
  }));

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<button class="lightbox__close" aria-label="إغلاق">×</button><div><img alt=""><p></p></div>';
  document.body.appendChild(lb);
  cards.forEach(c => c.addEventListener("click", () => {
    $("img", lb).src = $("img", c).currentSrc || $("img", c).src;
    $("p", lb).textContent = $("h4", c).textContent;
    lb.classList.add("is-open");
  }));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.closest(".lightbox__close")) lb.classList.remove("is-open"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("is-open"); });

  /* ---------- Before / After ---------- */
  const ba = $("#ba"), before = $("#baBefore"), handle = $("#baHandle"), beforeImg = $(".ba__before");
  const setBA = v => { before.style.width = v + "%"; handle.style.left = v + "%"; };
  const sizeBA = () => { beforeImg.style.width = ba.offsetWidth + "px"; };
  $("#baRange").addEventListener("input", e => setBA(e.target.value));
  addEventListener("resize", sizeBA); sizeBA(); setBA(50);

  /* ---------- Smart cost calculator ---------- */
  const areaRange = $("#areaRange"), areaOut = $("#areaOut");
  const costOut = $("#costOut"), timeOut = $("#timeOut");
  const state = { unit: $("#unitChips .is-active"), pkg: $("#pkgChips .is-active") };
  const chipGroup = (id, key) => $$(`#${id} .chip`).forEach(ch => ch.addEventListener("click", () => {
    $$(`#${id} .chip`).forEach(x => x.classList.remove("is-active"));
    ch.classList.add("is-active"); state[key] = ch; calc();
  }));
  chipGroup("unitChips", "unit"); chipGroup("pkgChips", "pkg");

  let shown = { lo: 0, hi: 0 };
  const animateNum = (from, to) => {
    const t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / 600, 1), e = 1 - Math.pow(1 - p, 3);
      const lo = from.lo + (to.lo - from.lo) * e, hi = from.hi + (to.hi - from.hi) * e;
      costOut.textContent = `${(lo / 1e6).toFixed(2)} – ${(hi / 1e6).toFixed(2)}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const calc = () => {
    const a = +areaRange.value;
    areaOut.textContent = a;
    areaRange.style.setProperty("--p", ((a - areaRange.min) / (areaRange.max - areaRange.min)) * 100 + "%");
    const f = +state.unit.dataset.f, p = state.pkg.dataset;
    const next = { lo: a * +p.min * f, hi: a * +p.max * f };
    animateNum(shown, next); shown = next;
    const weeks = Math.round(Math.max(8, 6 + a * 0.06 * +p.w * 1.6 * f));
    timeOut.textContent = `${weeks - 2} – ${weeks + 2}`;
  };
  areaRange.addEventListener("input", calc);
  calc();

  $("#calcSend").addEventListener("click", () => {
    openWA(
`مرحباً Danial's Construction، أرغب في حجز معاينة.
نوع الوحدة: ${state.unit.dataset.v}
المساحة: ${areaRange.value} م²
مستوى التشطيب: ${state.pkg.dataset.v}
التكلفة التقديرية من الموقع: ${costOut.textContent} مليون جنيه
المدة التقديرية: ${timeOut.textContent} أسبوع`);
  });

  /* ---------- Testimonials ---------- */
  const quotes = $$(".quote"), tDots = $$("#testiDots button"); let ti = 0;
  const goT = i => {
    quotes[ti].classList.remove("is-active"); tDots[ti].classList.remove("is-active");
    ti = (i + quotes.length) % quotes.length;
    quotes[ti].classList.add("is-active"); tDots[ti].classList.add("is-active");
  };
  tDots.forEach((d, i) => d.addEventListener("click", () => goT(i)));
  setInterval(() => goT(ti + 1), 7000);

  /* ---------- Quote form -> WhatsApp ---------- */
  const form = $("#quoteForm"), msg = $("#formMsg");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    let ok = true;
    ["name", "phone"].forEach(k => {
      const v = (d[k] || "").trim();
      const bad = !v || (k === "phone" && !/^[0-9+\s]{8,15}$/.test(v));
      form.elements[k].classList.toggle("is-invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { msg.textContent = "من فضلك اكتب الاسم ورقم موبايل صحيح."; return; }
    openWA(
`طلب معاينة — موقع Danial's Construction
الاسم: ${d.name}
الموبايل: ${d.phone}
نوع الوحدة: ${d.unit}
المساحة: ${d.area || "-"} م²
مستوى التشطيب: ${d.pkg}
المنطقة: ${d.location || "-"}
تفاصيل: ${d.msg || "-"}`);
    msg.textContent = "شكراً لك! سنتواصل معك في أقرب وقت.";
    form.reset();
  });

  /* ---------- Desktop-only flourishes ---------- */
  if (fine && !reduce) {
    const cur = $("#cursor");
    let cx = 0, cy = 0, tx = 0, ty = 0;
    addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; cur.classList.add("is-on"); });
    document.addEventListener("mouseleave", () => cur.classList.remove("is-on"));
    const loop = () => { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; cur.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); };
    loop();
    $$("a, button, .card, input[type=range]").forEach(el => {
      el.addEventListener("mouseenter", () => cur.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cur.classList.remove("is-hover"));
    });

    $$(".magnetic").forEach(b => {
      b.addEventListener("mousemove", e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener("mouseleave", () => { b.style.transform = ""; });
    });
  } else {
    $("#cursor").remove();
  }
})();
