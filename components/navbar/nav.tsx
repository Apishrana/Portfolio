import styles from './nav.module.css';
import { Dispatch, SetStateAction } from 'react';

interface NavbarProps {
    setTerminalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ setTerminalOpen }: NavbarProps) {
    return (
        <nav className={styles.navbar}>
            <div className={`${styles.navSection} ${styles.navTittleSection}`}>
                Portfolio
            </div>
            <div className={`${styles.navSection} ${styles.navNameSection}`}>
                Apish Rana
            </div>
            <div className={`${styles.navSection} ${styles.navMiscSection}`}>
                <button
                    className={styles.navButton}
                    onClick={() => {
                        setTerminalOpen(true);
                    }}>
                    open cli
                </button>
                <button
                    className={styles.navButton}
                    onClick={() => {
                        setTerminalOpen(true);
                    }}>
                    Contact
                </button>
            </div>
        </nav>
    );
}
