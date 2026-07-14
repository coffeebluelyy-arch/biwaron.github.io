const layoutWidth = 1560;
const landingLayoutHeight = 3302;
const aboutLayoutHeight = 3231;
const textilsystemLayoutHeight = 7878;
const forschungLayoutHeight = 30430;
const transformationLayoutHeight = 4441;
const aktivitaetLayoutHeight = 10534;

const pageScaleStage = document.querySelector(".page-scale-stage");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const revealItems = document.querySelectorAll(".reveal, .playful-a5");
const wiggleItems = document.querySelectorAll(".wiggle-hover");
const pointingItems = document.querySelectorAll(".pointing-hover");
const crazyShakeItems = document.querySelectorAll(".crazy-shake-hover");
const pointingDiagonalItems = document.querySelectorAll(".pointing-diagonal-hover");

function getLayoutHeight() {
  if (document.body.classList.contains("page-about-view")) {
    return aboutLayoutHeight;
  }

  if (document.body.classList.contains("page-textilsystem-view")) {
    return textilsystemLayoutHeight;
  }

  if (document.body.classList.contains("page-forschung-view")) {
    return forschungLayoutHeight;
  }

  if (document.body.classList.contains("page-transformation-view")) {
    return transformationLayoutHeight;
  }

  if (document.body.classList.contains("page-aktivitaet-view")) {
    return aktivitaetLayoutHeight;
  }

  return landingLayoutHeight;
}

function updatePageScale() {
  const root = document.documentElement;
  const viewportWidth = window.innerWidth;
  const layoutHeight = getLayoutHeight();
  const pageScale = Math.min(1, viewportWidth / layoutWidth);
  const visibleWidth = Math.min(layoutWidth, viewportWidth);
  const scaledHeight = layoutHeight * pageScale;

  root.style.setProperty("--page-scale", String(pageScale));
  root.style.setProperty("--page-visible-width", `${visibleWidth}px`);
  root.style.setProperty("--layout-height", `${layoutHeight}px`);

  if (pageScaleStage) {
    pageScaleStage.style.height = `${scaledHeight}px`;
  }
}

function restartAnimation(element, activeClass) {
  element.classList.remove(activeClass);

  void element.offsetWidth;

  element.classList.add(activeClass);
}

updatePageScale();

window.addEventListener("resize", updatePageScale);

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Navigation schließen" : "Navigation öffnen"
    );
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3,
      root: null,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

wiggleItems.forEach((wiggleItem) => {
  wiggleItem.addEventListener("mouseenter", () => {
    restartAnimation(wiggleItem, "is-wiggling");
  });

  wiggleItem.addEventListener("animationend", (event) => {
    if (event.animationName === "wiggleSoft") {
      wiggleItem.classList.remove("is-wiggling");
    }
  });
});

pointingItems.forEach((pointingItem) => {
  pointingItem.addEventListener("mouseenter", () => {
    restartAnimation(pointingItem, "is-pointing");
  });

  pointingItem.addEventListener("animationend", (event) => {
    if (event.animationName === "pointDown") {
      pointingItem.classList.remove("is-pointing");
    }
  });
});

crazyShakeItems.forEach((crazyShakeItem) => {
  crazyShakeItem.addEventListener("mouseenter", () => {
    restartAnimation(crazyShakeItem, "is-crazy-shaking");
  });

  crazyShakeItem.addEventListener("animationend", (event) => {
    if (event.animationName === "crazyShake") {
      crazyShakeItem.classList.remove("is-crazy-shaking");
    }
  });
});

pointingDiagonalItems.forEach((pointingDiagonalItem) => {
  pointingDiagonalItem.addEventListener("mouseenter", () => {
    restartAnimation(pointingDiagonalItem, "is-pointing-diagonal");
  });

  pointingDiagonalItem.addEventListener("animationend", (event) => {
    if (event.animationName === "pointDiagonalUpRight") {
      pointingDiagonalItem.classList.remove("is-pointing-diagonal");
    }
  });
});