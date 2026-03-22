'use client';

import styles from './loading.module.css';
import { Player } from '@lottiefiles/react-lottie-player';

import loading from '@/public/lottiefiles/Loading.json';
import { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export default function Loading() {
    const ref = useRef<LoadingBarRef>(null);

    useEffect(() => {
        const loadingBar = ref.current;

        loadingBar?.continuousStart(12, 500);
        setTimeout(() => {
            loadingBar?.complete();
        }, 4200);
    }, []);

    return (
        <div className={styles.pageContainer}>
            <LoadingBar
                color="var(--foreground)"
                ref={ref}
                shadow={false}
                height={3}
            />
            <div className={styles.nameArea}>
                <div className={styles.firstName}>APISH</div>

                <Player
                    autoplay
                    loop
                    src={loading}
                    className={styles.loaderShape}
                />
                <div className={styles.lastName}>RANA</div>
            </div>
            <div className={styles.footer}>LOADING PORTFOLIO</div>
        </div>
    );
}
