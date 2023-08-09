import styles from './EmployerLink.module.css';

/**
 * Note: We use a <span> to duplicate the text for the CSS animation we
 * could 100% use either text-shadow or a psuedo element for this, but
 * - Animating text-shadow is not a good idea for performance
 * - Animating a psuedo element is not a good idea for accessibility
 * - span allows us to have performance AND hide the text from screen readers
 */

interface Props {
  label: string;
  href: string;
  iconUrl: string;
}
export function EmployerLink({label, href, iconUrl}: Props) {
  return (
    <a href={href} target={`_blank`} rel={`noopener noreferrer external`} class={styles.link} data-label={label}>
      <img aria-hidden={`true`} src={iconUrl} alt={`${label} logo`} class={styles.icon} />
      {label}
      <span aria-hidden={`true`} class={styles.linkTop}>{label}</span>
    </a>
  );
}
