import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

export function Header({ showTournLink }) {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink to='/' exact>Home</NavLink>
        <NavLink to='/new' exact>New Tournament</NavLink>
        {showTournLink ? <NavLink to='/tournament' exact>Your Tournament</NavLink> : <></>}
      </nav>
    </header>
  )
}