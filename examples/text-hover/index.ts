import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(SplitText, GSDevTools);

type CharElements = { topChars: HTMLDivElement[]; bottomChars: HTMLDivElement[] };

const CHAR_GAP = 100;
const headings = document.querySelectorAll<HTMLHeadingElement>('.text');

headings.forEach((heading) => {
  new SplitText(heading, {
    type: 'chars',
    autoSplit: true,
    charsClass: 'char-container',
    onSplit: (splittedText) => {
      const charElements = deepSplitChar(splittedText);
      animateChars(charElements, heading);
    },
  });
});

function deepSplitChar(splittedText: SplitText): CharElements {
  const topChars: HTMLDivElement[] = [];
  const bottomChars: HTMLDivElement[] = [];

  splittedText.chars.forEach((char, i) => {
    const textContent = char.textContent || '';

    const topDiv = document.createElement('div');
    topDiv.classList.add('char', 'char-top');
    topDiv.textContent = textContent;

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('char', 'char-bottom');
    bottomDiv.style.setProperty('--char-gap', `${CHAR_GAP}px`);
    bottomDiv.textContent = textContent;

    char.textContent = '';
    char.appendChild(topDiv);
    char.appendChild(bottomDiv);
    topChars.push(topDiv);
    bottomChars.push(bottomDiv);
  });

  return { topChars, bottomChars };
}
function animateChars({ topChars, bottomChars }: CharElements, heading: HTMLHeadingElement) {
  // Create a separate timeline for each heading
  const defaults = { duration: 0.6, stagger: 0.02, ease: 'power3.out', overwrite: true };

  const elementHeight = topChars[0].offsetHeight + CHAR_GAP;
  gsap.set(bottomChars, { y: elementHeight, opacity: 1 });

  heading.addEventListener('mouseenter', () => {
    gsap.to(topChars, { yPercent: -100, ...defaults });
    gsap.to(bottomChars, { y: 0, ...defaults });
  });

  heading.addEventListener('mouseleave', () => {
    gsap.to(topChars, { yPercent: 0, ...defaults });
    gsap.to(bottomChars, { y: elementHeight, ...defaults });
  });
}
