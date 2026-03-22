'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        setTimeout(() => {
            setLoading(false);
        }, 6000);

        document.body.style.overflow =
            loading || terminalOpen ? 'hidden' : 'auto';
    }, [loading, terminalOpen]);

    return (
        <>
            {loading && <Loading />}

            {terminalOpen && <PortfolioCli setTerminalOpen={setTerminalOpen} />}
            <div
                style={{
                    width: '100vw',
                    height: '100vw',
                    // background: 'white',
                }}>
                <button
                    onClick={() => {
                        setTerminalOpen(true);
                    }}>
                    hygtfdsbgvfc
                </button>
            </div>
        </>
    );
}
