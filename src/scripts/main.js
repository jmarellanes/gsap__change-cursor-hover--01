import gsap from "gsap";

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const images = document.querySelectorAll(".portfolio-item img");

let posX = 0;
let posY = 0;
let mouseX = 0;
let mouseY = 0;
let mouseVelocityX = 0;

gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.8 });
gsap.set(follower, { xPercent: -50, yPercent: -50 });

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseVelocityX = e.movementX;
});

gsap.ticker.add((time, deltaTime) => {
  const dt = 1.0 - (1.0 - 0.15) ** (deltaTime / 16);

  posX += (mouseX - posX) * dt;
  posY += (mouseY - posY) * dt;

  gsap.set(follower, { x: posX, y: posY });
  gsap.set(cursor, { x: mouseX, y: mouseY });
});

images.forEach((image) => {
  image.addEventListener("mouseenter", () => {
    const spinDirection = mouseVelocityX >= 0 ? "normal" : "reverse";
    cursor.style.setProperty("--spin-dir", spinDirection);

    cursor.classList.add("active");
    follower.classList.add("active");

    gsap.to(cursor, {
      scale: 12,
      duration: 0.25,
      ease: "back.out(2)",
      overwrite: true,
    });

    gsap.to(follower, {
      opacity: 0,
      scale: 1,
      duration: 0.25,
      ease: "back.out(2)",
      overwrite: true,
    });
  });

  image.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    follower.classList.remove("active");

    gsap.to(cursor, {
      scale: 0.8,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(follower, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });
  });
});

document.body.classList.add("custom-cursor-active");
