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

/* ---- Active nav link underline ---- */
const navLinks = navMenu.querySelectorAll("a:not(.nav-cta)");
const navIndicator = navMenu.querySelector(".nav-indicator");

function moveNavIndicator(link) {
  if (!navIndicator || !link) return;
  navIndicator.style.left = link.offsetLeft + "px";
  navIndicator.style.width = link.offsetWidth + "px";
}

function setActiveLink(link) {
  if (!link) return;
  navLinks.forEach((l) => l.classList.remove("active"));
  link.classList.add("active");
  moveNavIndicator(link);
}

navLinks.forEach((link) =>
  link.addEventListener("click", () => setActiveLink(link))
);

moveNavIndicator(navMenu.querySelector("a.active"));
window.addEventListener("resize", () =>
  moveNavIndicator(navMenu.querySelector("a.active"))
);

/* ---- Custom video player controls ---- */
const videoPlayer = document.querySelector(".video-player");

if (videoPlayer) {
  const video = videoPlayer.querySelector("video");
  const playBtn = videoPlayer.querySelector(".vp-play");
  const speedBtn = videoPlayer.querySelector(".vp-speed");
  const fullscreenBtn = videoPlayer.querySelector(".vp-fullscreen");
  const progress = videoPlayer.querySelector(".vp-progress");
  const progressFilled = videoPlayer.querySelector(".vp-progress-filled");

  const syncPlayState = () => {
    playBtn.classList.toggle("is-playing", !video.paused);
    videoPlayer.classList.toggle("is-paused", video.paused);
  };

  playBtn.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
  video.addEventListener("play", syncPlayState);
  video.addEventListener("pause", syncPlayState);
  syncPlayState();

  const speeds = [1, 1.5, 2, 0.5];
  let speedIndex = 0;
  speedBtn.addEventListener("click", () => {
    speedIndex = (speedIndex + 1) % speeds.length;
    video.playbackRate = speeds[speedIndex];
    speedBtn.textContent = `${speeds[speedIndex]}x`;
  });

  const updateProgress = () => {
    if (!video.duration) return;
    progressFilled.style.width = `${(video.currentTime / video.duration) * 100}%`;
  };
  video.addEventListener("timeupdate", updateProgress);

  const seek = (e) => {
    const rect = progress.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    if (video.duration) video.currentTime = ratio * video.duration;
  };
  progress.addEventListener("click", seek);

  fullscreenBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen();
    }
  });
  document.addEventListener("fullscreenchange", () => {
    fullscreenBtn.classList.toggle("is-fullscreen", !!document.fullscreenElement);
  });
}

/* ---- Update active nav link while scrolling through sections ---- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = navMenu.querySelector(`a[href="#${entry.target.id}"]`);
      if (link) setActiveLink(link);
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const section = document.querySelector(href);
  if (section) sectionObserver.observe(section);
});

