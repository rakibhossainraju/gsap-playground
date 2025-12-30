import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(SplitText, GSDevTools);

type CharElements = { topChars: HTMLDivElement[]; bottomChars: HTMLDivElement[] };

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

  splittedText.chars.forEach((char) => {
    const textContent = char.textContent || '';

    const topDiv = document.createElement('div');
    topDiv.classList.add('char', 'char-top');
    topDiv.textContent = textContent;

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('char', 'char-bottom');
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
  const defaults: gsap.TweenVars = {
    duration: 0.6,
    ease: 'power3.out',
    overwrite: true,
  };

  const elementHeight = heading.offsetHeight;
  const elementWidth = heading.offsetWidth;
  gsap.set(bottomChars, { y: elementHeight, rotateX: -90 });

  heading.addEventListener('mouseenter', (e) => {
    gsap.to(topChars, {
      yPercent: -100,
      rotateX: 90,
      ...defaults,
      stagger: {
        each: 0.02,
        from: hoverPosition(elementWidth, e.offsetX),
      },
    });
    gsap.to(bottomChars, {
      y: 0,
      rotateX: 0,
      stagger: {
        each: 0.02,
        from: hoverPosition(elementWidth, e.offsetX),
      },
    });
  });

  heading.addEventListener('mouseleave', (e) => {
    gsap.to(topChars, {
      yPercent: 0,
      rotateX: 0,
      ...defaults,
      stagger: {
        each: 0.02,
        from: hoverPosition(elementWidth, e.offsetX),
      },
    });
    gsap.to(bottomChars, {
      y: elementHeight,
      rotateX: -90,
      ...defaults,
      stagger: {
        each: 0.02,
        from: hoverPosition(elementWidth, e.offsetX),
      },
    });
  });
}

function hoverPosition(elementWidth: number, mousePos: number): 'start' | 'center' | 'end' {
  const thirdWidth = Math.round(elementWidth / 3);
  if (mousePos < thirdWidth) {
    return 'start';
  } else if (mousePos > elementWidth - thirdWidth) {
    return 'end';
  } else {
    return 'center';
  }
}
