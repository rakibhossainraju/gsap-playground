import gsap from 'gsap';
import GSDevTools from 'gsap/GSDevTools';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import { domainToUnicode } from 'node:url';
gsap.registerPlugin(GSDevTools, MorphSVGPlugin);

// const svg = document.querySelector('svg.demo');
// const polyline = svg?.querySelector('polyline');
//
// if (!polyline) {
//   throw new Error('Could not find polyline element');
// }
// const FLATTEN_HORIZONTAL: number[][] = [
//   [100, 200],
//   [200, 200],
//   [300, 200],
// ];
// const ARCH_UP: number[][] = [
//   [100, 200],
//   [200, 300],
//   [300, 200],
// ];
// const RESET_FLAT: number[][] = [
//   [100, 200],
//   [200, 200],
//   [300, 200],
// ];
// const RETURN_VERTICAL: number[][] = [
//   [200, 200],
//   [200, 100],
//   [200, 200],
// ];
//
// const tl = gsap.timeline({ defaults: { ease: 'bounce', duration: 1 } });
//
// tl.to(polyline, { attr: { points: FLATTEN_HORIZONTAL }, delay: 0.5 })
//   .to(polyline, { attr: { points: ARCH_UP } })
//   .to(polyline, { attr: { points: RESET_FLAT }, ease: 'none', duration: 0.2 })
//   .to(polyline, { attr: { points: RETURN_VERTICAL }, ease: 'none', duration: 0.3 });
//
// GSDevTools.create({ animate: tl });
const NUMBER_PATHS = {
  0: 'M3.96 121.92L16.32 108.96H45.96L57.6 121.92H3.96ZM0.360001 63L13.32 75.48V104.88L0.360001 116.64V63ZM61.44 116.64L48.48 104.28V74.76L61.44 63V116.64ZM3.84 -1.85966e-05H57.48L45.6 12.96H16.2L3.84 -1.85966e-05ZM2.26498e-06 58.8V5.15998L12.96 16.8V46.56L2.26498e-06 58.8ZM61.08 5.15998V58.8L48.12 47.16V17.52L61.08 5.15998Z',
  1: 'M61.44 111.48L48.48 99.12V69.6L61.44 57.8399V111.48ZM61.08 -5.48363e-05V53.6399L48.12 41.9999V12.36L61.08 -5.48363e-05Z',
  2: 'M3.6 121.92L15.96 108.96H45.6L57.24 121.92H3.6ZM5.96046e-07 63L12.96 75.48V104.88L5.96046e-07 116.64V63ZM13.92 67.32C11.12 65.08 8.28 62.88 5.4 60.72L13.92 54.36H46.68L55.08 60.72L46.68 67.32H13.92ZM3.48 -1.85966e-05H57.12L45.24 12.96H15.84L3.48 -1.85966e-05ZM60.72 5.15998V58.8L47.76 47.16V17.52L60.72 5.15998Z',
  3: 'M0.359995 121.92L12.48 108.96H42.24L53.88 121.92H0.359995ZM57.6 116.64L44.76 104.28V74.76L57.6 63V116.64ZM10.44 67.32C7.71999 65.08 4.92 62.88 2.04 60.72L10.44 54.36H43.2L51.6 60.72L43.2 67.32H10.44ZM-5.36442e-06 -1.85966e-05H53.76L42 12.96H12.36L-5.36442e-06 -1.85966e-05ZM57.24 5.15998V58.8L44.4 47.16V17.52L57.24 5.15998Z',
  4: 'M61.44 111.48L48.48 99.12V69.6L61.44 57.8399V111.48ZM14.28 62.1599C11.48 59.9199 8.64 57.7199 5.76 55.5599L14.28 49.1999H47.04L55.44 55.5599L47.04 62.1599H14.28ZM2.26498e-06 53.6399V-5.48363e-05L12.96 11.6399V41.3999L2.26498e-06 53.6399ZM61.08 -5.48363e-05V53.6399L48.12 41.9999V12.36L61.08 -5.48363e-05Z',
  5: 'M3.96 121.92L16.32 108.96H45.96L57.6 121.92H3.96ZM61.44 116.64L48.48 104.28V74.76L61.44 63V116.64ZM14.28 67.32C11.48 65.08 8.64 62.88 5.76 60.72L14.28 54.36H47.04L55.44 60.72L47.04 67.32H14.28ZM3.84 -1.85966e-05H57.48L45.6 12.96H16.2L3.84 -1.85966e-05ZM2.26498e-06 58.8V5.15998L12.96 16.8V46.56L2.26498e-06 58.8Z',
  6: 'M3.96 121.92L16.32 108.96H45.96L57.6 121.92H3.96ZM0.360001 63L13.32 75.48V104.88L0.360001 116.64V63ZM61.44 116.64L48.48 104.28V74.76L61.44 63V116.64ZM14.28 67.32C11.48 65.08 8.64 62.88 5.76 60.72L14.28 54.36H47.04L55.44 60.72L47.04 67.32H14.28ZM3.84 -1.85966e-05H57.48L45.6 12.96H16.2L3.84 -1.85966e-05ZM2.26498e-06 58.8V5.15998L12.96 16.8V46.56L2.26498e-06 58.8Z',
  7: 'M57.6 116.64L44.76 104.28V74.76L57.6 63V116.64ZM2.52724e-05 -1.85966e-05H53.76L42 12.96H12.36L2.52724e-05 -1.85966e-05ZM57.24 5.15998V58.8L44.4 47.16V17.52L57.24 5.15998Z',
  8: 'M3.95997 121.92L16.32 108.96H45.96L57.6 121.92H3.95997ZM0.359971 63L13.32 75.48V104.88L0.359971 116.64V63ZM61.44 116.64L48.48 104.28V74.76L61.44 63V116.64ZM14.28 67.32C11.48 65.08 8.63997 62.88 5.75997 60.72L14.28 54.36H47.04L55.44 60.72L47.04 67.32H14.28ZM3.83997 -1.85966e-05H57.48L45.6 12.96H16.2L3.83997 -1.85966e-05ZM-2.82526e-05 58.8V5.15998L12.96 16.8V46.56L-2.82526e-05 58.8ZM61.08 5.15998V58.8L48.12 47.16V17.52L61.08 5.15998Z',
  9: 'M61.44 116.64L48.48 104.28V74.76L61.44 63V116.64ZM14.28 67.32C11.48 65.08 8.63997 62.88 5.75997 60.72L14.28 54.36H47.04L55.44 60.72L47.04 67.32H14.28ZM3.83997 -1.85966e-05H57.48L45.6 12.96H16.2L3.83997 -1.85966e-05ZM-2.82526e-05 58.8V5.15998L12.96 16.8V46.56L-2.82526e-05 58.8ZM61.08 5.15998V58.8L48.12 47.16V17.52L61.08 5.15998Z',
};
const section = document.querySelector('section');
const defaultSvg = document.querySelector('svg.demo');
const svgPaths = [document.querySelector('path#first-digit')];
const tl = gsap.timeline({ defaults: { ease: 'power1.inOut', duration: 1 } });

for (let i = 1; i < 20; i++) {
  const paths = numToDigitPath(i);
  console.log(i);
  svgPaths.forEach((svgPath) => {
    for (const morphSVG of paths) {
      tl.to(svgPath, { morphSVG });
    }
  });
}
function numToDigitPath(num: number) {
  const n = num.toString();
  if (n.length > 1) {
    createOtherDigitSvg(n.length);
  }
  const paths = [];
  for (let i = 0; i < n.length; i++) {
    paths.push(NUMBER_PATHS[n[i]]);
  }
  return paths;
}

function createOtherDigitSvg(idx: number) {
  const id = `digit-${idx}`;
  if (section.querySelector(`path#${id}`)) return;
  const svg = defaultSvg.cloneNode(true) as SVGSVGElement;
  const path = svg.querySelector('path');
  path.id = id;
  svgPaths.push(path);
  section.appendChild(svg);
}
