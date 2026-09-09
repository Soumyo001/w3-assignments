let galleryImages = [];
let currentImage = 0;

let touchStartX = 0;
let touchEndX = 0;

export function initGalleryModal() {
  const openGalleryBtn = document.getElementById("openGalleryBtn");
  const closeGalleryBtn = document.getElementById("closeGalleryBtn");

  const galleryModal = document.getElementById("galleryModal");

  const desktopGallery = document.getElementById("desktopGallery");

  const mobileGalleryImage = document.getElementById("mobileGalleryImage");
  const galleryCounter = document.getElementById("galleryCounter");
  const mobileDots = document.getElementById("mobileDots");

  const nextImageBtn = document.getElementById("nextImage");
  const prevImageBtn = document.getElementById("prevImage");

  if (!openGalleryBtn || !galleryModal) return;

  // Open modal
  openGalleryBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/images");

      if (!response.ok) {
        throw new Error("Image API failed");
      }

      galleryImages = await response.json();
    } catch (error) {
      // fallback images from page gallery
      galleryImages = [
        ...document.querySelectorAll(".gallery-layout img")
      ]
        .map(img => img.src);
    }

    currentImage = 0;

    renderDesktop(desktopGallery);

    renderMobile(
      mobileGalleryImage,
      galleryCounter,
      mobileDots
    );

    galleryModal.classList.add("active");

    document.body.style.overflow = "hidden";
  });

  // Close modal
  closeGalleryBtn.addEventListener("click", closeModal);

  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeModal();
    }
  });

  // Next button
  nextImageBtn.addEventListener("click", () => {
    if (currentImage < galleryImages.length - 1) {
      currentImage++;

      updateMobileGallery(
        mobileGalleryImage,
        galleryCounter,
        mobileDots
      );
    }
  });

  // Previous button
  prevImageBtn.addEventListener("click", () => {
    if (currentImage > 0) {
      currentImage--;

      updateMobileGallery(
        mobileGalleryImage,
        galleryCounter,
        mobileDots
      );
    }
  });

  // Touch swipe
  mobileGalleryImage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  mobileGalleryImage.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;

      handleSwipe(
        mobileGalleryImage,
        galleryCounter,
        mobileDots
      );
    },
    { passive: true }
  );

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!galleryModal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    }

    if (e.key === "ArrowRight") {
      nextImageBtn.click();
    }

    if (e.key === "ArrowLeft") {
      prevImageBtn.click();
    }
  });
}

// Close modal function
function closeModal() {
  const galleryModal =
    document.getElementById("galleryModal");

  galleryModal.classList.remove("active");

  document.body.style.overflow = "";
}

// Desktop rendering
function renderDesktop(container) {
  if (!container) return;

  container.innerHTML = "";

  galleryImages.forEach((image) => {
    const img = document.createElement("img");

    img.src = image;

    img.alt = "Gallery image";

    container.appendChild(img);
  });
}

// Mobile rendering
function renderMobile(
  imageElement,
  counterElement,
  dotsElement
) {
  currentImage = 0;

  updateMobileGallery(
    imageElement,
    counterElement,
    dotsElement
  );
}

// Update mobile carousel
function updateMobileGallery(
  imageElement,
  counterElement,
  dotsElement
) {
  imageElement.src =
    galleryImages[currentImage];

  imageElement.alt =
    `Gallery image ${currentImage + 1}`;

  counterElement.innerText =
    `${currentImage + 1} / ${galleryImages.length}`;

  createDots(dotsElement);

  updateArrowState();
}

// Create sliding dots
function createDots(container) {
  container.innerHTML = "";

  const total =
    galleryImages.length;

  const visibleDots = 5;

  let start;

  if (currentImage <= 2) {
    start = 0;
  }
  else if (currentImage >= total - 3) {
    start = total - visibleDots;
  }
  else {
    start = currentImage - 2;
  }

  start = Math.max(
    0,
    start
  );

  for (
    let i = start;
    i < Math.min(start + visibleDots, total);
    i++
  ) {
    const dot =
      document.createElement("span");

    if (i === currentImage) {
      dot.classList.add("active");
    }

    dot.addEventListener(
      "click",
      () => {
        currentImage = i;

        updateMobileGallery(
          document.getElementById("mobileGalleryImage"),
          document.getElementById("galleryCounter"),
          document.getElementById("mobileDots")
        );
      }
    );

    container.appendChild(dot);
  }
}

// Swipe handler
function handleSwipe(
  imageElement,
  counterElement,
  dotsElement
) {
  const distance =
    touchStartX - touchEndX;

  const threshold = 50;

  if (distance > threshold) {
    if (currentImage < galleryImages.length - 1) {
      currentImage++;
    }
  }

  if (distance < -threshold) {
    if (currentImage > 0) {
      currentImage--;
    }
  }

  updateMobileGallery(
    imageElement,
    counterElement,
    dotsElement
  );
}

// Disable arrows at edges
function updateArrowState() {
  const prev =
    document.getElementById("prevImage");

  const next =
    document.getElementById("nextImage");

  if (!prev || !next) return;

  prev.disabled =
    currentImage === 0;

  next.disabled =
    currentImage === galleryImages.length - 1;

  prev.classList.toggle(
    "disabled",
    currentImage === 0
  );

  next.classList.toggle(
    "disabled",
    currentImage === galleryImages.length - 1
  );
}