'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const PortfolioCli = dynamic(
    () => import('@/components/portfolio-cli/portfolio-cli'),
    {
        ssr: false,
    },
);

const Loading = dynamic(() => import('@/components/loading/loading'), {
    ssr: false,
});

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [terminalOpen, setTerminalOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 6000);

        document.body.style.overflow = 'hidden';
    }, [loading, terminalOpen]);

    return (
        <>
            {loading && <Loading />}

            {terminalOpen && <PortfolioCli setTerminalOpen={setTerminalOpen} />}

            <main className={styles.pageContainer}>
                <button
                    onClick={() => {
                        setTerminalOpen(true);
                    }}>
                    hygtfdsbgvfc
                </button>
            </main>
        </>
    );
}
