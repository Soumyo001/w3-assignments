const modal = document.getElementById("galleryModal");
const track = document.getElementById("galleryTrack");
const viewport = document.getElementById("galleryViewport");
const counter = document.getElementById("galleryCounter");
const dotsWindow = document.getElementById("galleryDotsWindow");
const strip = document.getElementById("galleryDotsStrip");
const closeBtn = document.getElementById("galleryClose");
const prevBtn = document.getElementById("galleryPrev");
const nextBtn = document.getElementById("galleryNext");

const sliderMq = window.matchMedia("(max-width: 1024px)");

let images = [];
let total = 0;
let index = 0;
let loaded = false;
let dots = [];

const buildDots = () => {
  const visible = Math.min(total, 5);
  dotsWindow.style.width = `${visible * 8 + (visible - 1) * 6}px`;
  strip.innerHTML = images.map(() => `<span class="gmodal__dot"></span>`).join("");
  dots = [...strip.children];
};

// at most 5 dots
const updateDots = () => {
  const offsetMax = Math.max(0, total - 5);
  const offset = Math.min(Math.max(index - 2, 0), offsetMax);
  strip.style.transform = `translateX(${-offset * 14}px)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === index);
    const leftEdge = offset > 0 && i === offset;
    const rightEdge = offset + 4 < total - 1 && i === offset + 4;
    dot.classList.toggle("is-edge", leftEdge || rightEdge);
  });
};

const goTo = (i) => {
  index = Math.max(0, Math.min(i, total - 1));
  track.style.transform = sliderMq.matches ? `translateX(${-index * 100}%)` : "";
  counter.textContent = `${index + 1} / ${total}`;
  updateDots();
};

const load = async () => {
  const res = await fetch("/images");
  images = await res.json();
  total = images.length;
  track.innerHTML = images
    .map((src) => `<div class="gmodal__slide"><img src="${src}" alt="" /></div>`)
    .join("");
  buildDots();
  loaded = true;
};

const open = async () => {
  try {
    if (!loaded) await load();
  } catch (err) {
    return;
  }
  modal.hidden = false;
  document.body.classList.add("modal-open");
  viewport.scrollTop = 0;
  goTo(0);
};

const close = () => {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
};

export const initGallery = () => {
  const openBtn = document.getElementById("openGalleryBtn");
  if (!openBtn || !modal) return;

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  let startX = 0;
  let delta = 0;
  let dragging = false;
  viewport.addEventListener("touchstart", (e) => {
    if (!sliderMq.matches) return;
    startX = e.touches[0].clientX;
    delta = 0;
    dragging = true;
  }, { passive: true });
  viewport.addEventListener("touchmove", (e) => {
    if (dragging) delta = e.touches[0].clientX - startX;
  }, { passive: true });
  viewport.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(delta) > 50) goTo(delta < 0 ? index + 1 : index - 1);
  });

  sliderMq.addEventListener("change", () => goTo(index));
};