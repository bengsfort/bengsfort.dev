import styles from './EmployerLink.module.css';

interface Props {
  label: string;
  href: string;
  iconUrl: string;
}
export function EmployerLink({label, href, iconUrl}: Props) {
  return (
    <a href={href} target={`_blank`} rel={`noopener noreferrer`} class={styles.link} data-label={label}>
      <img aria-hidden={`true`} src={iconUrl} alt={`${label} logo`} class={styles.icon} />
      {label}
      <span aria-hidden={`true`} class={styles.linkTop}>{label}</span>
    </a>
  );
}
