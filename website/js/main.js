const revealEls = document.querySelectorAll(".reveal, .reveal-card");

// Stagger cards within the same grid so they cascade in, one after
// another, instead of all rotating at the same instant.
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