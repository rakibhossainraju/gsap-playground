import gsap from "gsap";

const wrapper = document.querySelector(".wrapper");
const text = document.querySelector(".text");

const textContent = text.textContent;
text.innerHTML = "";

const chars = [];
textContent.split("").forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  text.appendChild(span);
  chars.push(span);
});
const totalChars = chars.length;
const radius = 190; // Distance from center

chars.forEach((char, i) => {
  // Calculate angle for this character
  const angle = (i / totalChars) * Math.PI * 2;

  // Calculate position on circle
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // Calculate rotation to face outward
  const rotateY = (i / totalChars) * 360;

  // Position the character
  gsap.set(char, {
    x: x,
    z: z,
    rotationY: rotateY,
    left: "50%",
    top: "50%",
    xPercent: -50,
    yPercent: -50,
  });
});

// Animate continuous rotation
gsap.to(wrapper, {
  rotationY: 360,
  duration: 15,
  ease: "none",
  repeat: -1,
});
