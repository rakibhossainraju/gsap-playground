import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

const headings = document.querySelectorAll<HTMLHeadingElement>('.text');

headings.forEach((heading) => {
  const splittedText = new SplitText(heading, {
    type: 'chars',
    autoSplit: true,
    charsClass: 'char-container',
    onSplit: animateText,
  });
});

function animateText(splittedText: SplitText) {
  splittedText.chars.forEach((char, i) => {
    const textContent = char.textContent || '';

    const topDiv = document.createElement('div');
    topDiv.classList.add('char-top');
    topDiv.textContent = textContent;

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('char-bottom');
    bottomDiv.textContent = textContent;

    char.textContent = '';
    char.appendChild(topDiv);
    char.appendChild(bottomDiv);
  });
}
