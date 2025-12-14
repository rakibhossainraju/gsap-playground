import gsap from 'gsap';
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(GSDevTools);

const scene = document.querySelector('.scene');
const wrapper = document.querySelector('.wrapper');
const text = document.querySelector('.text');

arrange3dText();

const tl = gsap.timeline();
tl.set(text, { opacity: 1 });
tl.from('.text span', {
  x: -100,
  opacity: 0,
  duration: 0.2,
  stagger: 0.08,
})
  .to(wrapper, {
    rotationY: 120,
    duration: 1,
    ease: 'none',
  })
  .to(
    scene,
    {
      scale: 1.5,
      perspectiveOrigin: '50% calc(50% - 150px)',
    },
    '<'
  )
  .to(
    wrapper,
    {
      rotationY: 360,
      duration: 10,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    },
    '>'
  );

function arrange3dText() {
  const textContent = text.textContent;
  text.innerHTML = '';
  const chars = [];
  textContent.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    text.appendChild(span);
    chars.push(span);
  });
  const totalChars = chars.length;
  const radius = 250;

  chars.forEach((char, i) => {
    const angle = (i / totalChars) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const rotateY = (i / totalChars) * 360;

    gsap.set(char, {
      x: x,
      z: z,
      rotationY: rotateY,
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
    });
  });
}
