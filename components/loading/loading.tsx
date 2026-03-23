'use client';

import styles from './loading.module.css';
import { Player } from '@lottiefiles/react-lottie-player';

import loading from '@/public/lottiefiles/Loading.json';
import { useEffect, useRef, useState } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export default function Loading() {
    const ref = useRef<LoadingBarRef>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadingBar = ref.current;
        const duration = 4200;
        const startedAt = performance.now();

        loadingBar?.continuousStart(12, 500);

        const updateProgress = () => {
            const elapsed = performance.now() - startedAt;
            const nextProgress = Math.min(
                100,
                Math.round((elapsed / duration) * 100),
            );

            setProgress(nextProgress);

            if (nextProgress < 100) {
                animationFrameId = window.requestAnimationFrame(updateProgress);
            }
        };

        let animationFrameId = window.requestAnimationFrame(updateProgress);

        const timeoutId = window.setTimeout(() => {
            loadingBar?.complete();
            setProgress(100);
        }, duration);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.clearTimeout(timeoutId);
        };
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
            <div className={styles.footer}>LOADING PORTFOLIO {progress}%</div>
        </div>
    );
}
