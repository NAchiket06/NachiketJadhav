const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const parallaxLayers = [...document.querySelectorAll("[data-speed]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const tiltCards = [...document.querySelectorAll(".tilt-card")];

function updateParallax() {
  if (prefersReducedMotion.matches) return;

  const scrollY = window.scrollY;

  parallaxLayers.forEach((layer) => {
    const speed = Number(layer.dataset.speed);
    const y = scrollY * speed;
    layer.style.transform = `translate3d(0, ${y}px, 0)`;
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupTilt() {
  if (prefersReducedMotion.matches) return;

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateY = ((offsetX / rect.width) - 0.5) * 10;
      const rotateX = -((offsetY / rect.height) - 0.5) * 10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupMarquee() {
  const track = document.querySelector(".marquee-track");
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

setupReveal();
setupTilt();
setupMarquee();
updateParallax();

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", updateParallax);