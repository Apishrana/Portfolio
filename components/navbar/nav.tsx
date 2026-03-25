import styles from './nav.module.css';
import { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface NavbarProps {
    setTerminalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ setTerminalOpen }: NavbarProps) {
    const nameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!nameRef.current) return;

        const el = nameRef.current;
        const text = el.innerText;
        el.innerHTML = text
            .split('')
            .map((char) =>
                char === ' '
                    ? `<span class="${styles.char}">&nbsp;</span>`
                    : `<span class="${styles.char}">${char}</span>`,
            )
            .join('');

        const chars = Array.from(el.querySelectorAll(`.${styles.char}`));

        const handleHoverOnText = (index: number) => {
            animate(chars, {
                translateY: (el, i) => {
                    if (i === index) return '-10px';
                },
                duration: 250,
                easing: 'easeOutExpo',
            });
        };

        const reset = () => {
            animate(chars, {
                translateY: '0px',
                duration: 300,
                easing: 'easeOutExpo',
            });
        };

        chars.forEach((char, i) => {
            char.addEventListener('mouseenter', () => handleHoverOnText(i));
        });

        el.addEventListener('mouseleave', reset);

    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={`${styles.navSection} ${styles.navTittleSection}`}>
                Portfolio
            </div>
            <div
                ref={nameRef}
                className={`${styles.navSection} ${styles.navNameSection}`}>
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
