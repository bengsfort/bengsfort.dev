import { makeLoggers } from '../utils/logging';
import { transformRange } from '../utils/math';

const { warnDev } = makeLoggers('projects');

const ICON_TRANSLATE_X_VAR = '--icon-translate-x';
const ICON_TRANSLATE_Y_VAR = '--icon-translate-y';
const iconTranslationRange = [-8, 8] as const;

export function setupProjectLinks() {
  const linkEls: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll('.project-link');

  linkEls.forEach(handleLink);
}

function handleLink(link: HTMLAnchorElement) {
  const iconEl = link.querySelector('.project-icon') as HTMLImageElement;
  if (!iconEl) {
    warnDev('Project link', link, 'does not have an icon! (.project-icon)');
    return;
  }

  const linkRect = link.getBoundingClientRect();

  const handleMovement = (ev: MouseEvent) => {
    const x = (ev.clientX - linkRect.x) / linkRect.width;
    const y = (ev.clientY - linkRect.y) / linkRect.height;

    const translateX = 1 * transformRange(x, [0, 1], iconTranslationRange);
    const translateY = 1 * transformRange(y, [0, 1], iconTranslationRange);

    iconEl.style.setProperty(ICON_TRANSLATE_X_VAR, `${translateX}px`);
    iconEl.style.setProperty(ICON_TRANSLATE_Y_VAR, `${translateY}px`);
  };

  link.addEventListener('mouseenter', (ev) => {
    link.addEventListener('mousemove', handleMovement);
    handleMovement(ev);
  });

  link.addEventListener('mouseleave', () => {
    link.removeEventListener('mousemove', handleMovement);
    iconEl.style.setProperty(ICON_TRANSLATE_X_VAR, `0px`);
    iconEl.style.setProperty(ICON_TRANSLATE_Y_VAR, `0px`);
  });
}
