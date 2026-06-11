/* ---- Scroll reveal + staggered card cascade ---- */
const revealEls = document.querySelectorAll(".reveal, .reveal-card");

document.querySelectorAll(".reveal-card").forEach((el) => {
  const group = Array.prototype.filter.call(
    el.parentElement.children,
    (c) => c.classList.contains("reveal-card")
  );
  const i = group.indexOf(el);
  el.style.transitionDelay = (i % 6) * 90 + "ms";
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

/* ---- Hamburger menu ---- */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});

navMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

