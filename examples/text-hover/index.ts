import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(SplitText, GSDevTools);

// Constants for animation configuration
const ANIMATION_DURATION = 0.6;
const STAGGER_DELAY = 0.02;
const ROTATION_ANGLE = 90;
const CHAR_LAYER_ATTR = 'data-char-pos';
const CHAR_CLASS = 'char';
const CHAR_TOP_CLASS = 'char-top';
const CHAR_BOTTOM_CLASS = 'char-bottom';
const CHAR_CONTAINER_CLASS = 'char-container';

interface CharLayers {
  topLayer: HTMLDivElement[];
  bottomLayer: HTMLDivElement[];
}

interface HoverStaggerConfig {
  startPosition: number | 'start' | 'center' | 'end';
  elementWidth: number;
}

// Initialize text animation for all headings
const headings = document.querySelectorAll<HTMLHeadingElement>('.text');
headings.forEach((heading) => {
  new SplitText(heading, {
    type: 'chars',
    autoSplit: true,
    charsClass: CHAR_CONTAINER_CLASS,
    onSplit: (splittedText) => {
      const charLayers = createDualLayerCharacters(splittedText);
      setupCharacterAnimation(charLayers, heading);
    },
  });
});

/**
 * Creates a dual-layer structure for each character (top and bottom)
 * This allows for the flip animation effect
 */
function createDualLayerCharacters(splittedText: SplitText): CharLayers {
  const topLayer: HTMLDivElement[] = [];
  const bottomLayer: HTMLDivElement[] = [];

  splittedText.chars.forEach((charElement, index) => {
    const charContent = charElement.textContent || '';

    // Create top layer (visible initially)
    const topLayerDiv = document.createElement('div');
    topLayerDiv.classList.add(CHAR_CLASS, CHAR_TOP_CLASS);
    topLayerDiv.textContent = charContent;

    // Create bottom layer (hidden initially, revealed on hover)
    const bottomLayerDiv = document.createElement('div');
    bottomLayerDiv.classList.add(CHAR_CLASS, CHAR_BOTTOM_CLASS);
    bottomLayerDiv.textContent = charContent;

    // Set up the container to hold both layers
    charElement.textContent = '';
    charElement.setAttribute(CHAR_LAYER_ATTR, index.toString());
    charElement.appendChild(topLayerDiv);
    charElement.appendChild(bottomLayerDiv);

    topLayer.push(topLayerDiv);
    bottomLayer.push(bottomLayerDiv);
  });

  return { topLayer, bottomLayer };
}
/**
 * Sets up mouse enter/leave animations for character layers
 */
function setupCharacterAnimation(charLayers: CharLayers, heading: HTMLHeadingElement): void {
  const { topLayer, bottomLayer } = charLayers;
  const headingDimensions = {
    height: heading.offsetHeight,
    width: heading.offsetWidth,
  };

  // Initialize bottom layer position (rotated away, positioned below)
  gsap.set(bottomLayer, {
    y: headingDimensions.height,
    rotateX: -ROTATION_ANGLE,
  });

  // Animation configuration for consistency
  const tweenConfig: gsap.TweenVars = {
    duration: ANIMATION_DURATION,
    ease: 'power3.out',
    overwrite: true,
  };

  heading.addEventListener('mouseenter', (event: MouseEvent) => {
    const staggerConfig = calculateStaggerOrigin(event, headingDimensions.width);
    animateLayersIn(topLayer, bottomLayer, staggerConfig, tweenConfig);
  });

  heading.addEventListener('mouseleave', (event: MouseEvent) => {
    const staggerConfig = calculateStaggerOrigin(event, headingDimensions.width);
    animateLayersOut(topLayer, bottomLayer, headingDimensions.height, staggerConfig, tweenConfig);
  });
}

/**
 * Animates layers when user hovers over the heading
 * Top layer flips up, bottom layer flips into place
 */
function animateLayersIn(
  topLayer: HTMLDivElement[],
  bottomLayer: HTMLDivElement[],
  staggerConfig: HoverStaggerConfig,
  tweenConfig: gsap.TweenVars
): void {
  gsap.to(topLayer, {
    yPercent: -100,
    rotateX: ROTATION_ANGLE,
    ...tweenConfig,
    stagger: {
      each: STAGGER_DELAY,
      from: staggerConfig.startPosition,
    },
  });

  gsap.to(bottomLayer, {
    y: 0,
    rotateX: 0,
    ...tweenConfig,
    stagger: {
      each: STAGGER_DELAY,
      from: staggerConfig.startPosition,
    },
  });
}

/**
 * Animates layers when user leaves the heading
 * Returns to initial state
 */
function animateLayersOut(
  topLayer: HTMLDivElement[],
  bottomLayer: HTMLDivElement[],
  elementHeight: number,
  staggerConfig: HoverStaggerConfig,
  tweenConfig: gsap.TweenVars
): void {
  gsap.to(topLayer, {
    yPercent: 0,
    rotateX: 0,
    ...tweenConfig,
    stagger: {
      each: STAGGER_DELAY,
      from: staggerConfig.startPosition,
    },
  });

  gsap.to(bottomLayer, {
    y: elementHeight,
    rotateX: -ROTATION_ANGLE,
    ...tweenConfig,
    stagger: {
      each: STAGGER_DELAY,
      from: staggerConfig.startPosition,
    },
  });
}

/**
 * Determines the stagger animation origin based on mouse position
 * Returns the specific character index or the start, center, or end position
 */
function calculateStaggerOrigin(event: MouseEvent, elementWidth: number): HoverStaggerConfig {
  const mouseElement = document.elementFromPoint(event.clientX, event.clientY);
  const charPositionAttr = mouseElement?.getAttribute(CHAR_LAYER_ATTR) ?? null;

  // If hovering directly over a character, use its position
  if (mouseElement !== event.currentTarget && charPositionAttr !== null) {
    const characterIndex = parseInt(charPositionAttr, 10);
    return {
      startPosition: characterIndex,
      elementWidth,
    };
  }

  // Otherwise, determine region (start, center, or end)
  const offsetX = event.offsetX;
  const thirdWidth = Math.round(elementWidth / 3);

  let region: 'start' | 'center' | 'end';
  if (offsetX < thirdWidth) {
    region = 'start';
  } else if (offsetX > elementWidth - thirdWidth) {
    region = 'end';
  } else {
    region = 'center';
  }

  return {
    startPosition: region,
    elementWidth,
  };
}
