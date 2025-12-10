import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(GSDevTools, SplitText);

const scene = document.querySelector(".scene");
const wrapper = scene.querySelector(".wrapper");
const text = wrapper.querySelector(".text");

// Set up 3D space
gsap.set(scene, { perspective: 1000 });
gsap.set(wrapper, { transformStyle: "preserve-3d" });
gsap.set(text, { transformStyle: "preserve-3d" });

// Split text into characters
const chars = new SplitText(text, { type: "chars", tag: "span" }).chars;

// Sphere settings
const radius = 150; // Adjust size of the invisible sphere
const totalChars = chars.length - 1;

// Position each character around the sphere
chars.forEach((char, i) => {
  const angle = Math.round(360 / totalChars) * i;
  console.log(angle);
  char.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
});

// Animate continuous rotation
// const tl = gsap.timeline({
//   repeat: 1,
//   yoyo: true,
// });

// tl.to(chars, {
//   rotateX: 360,
//   duration: 2,
//   stagger: 0.1,
// });

// GSDevTools.create({ timeline: tl });
