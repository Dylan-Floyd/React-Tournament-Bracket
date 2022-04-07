import GithubLink from '../GithubLink/GithubLink.jsx';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <GithubLink />
      Made by Dylan Floyd 
    </footer>
  )
}