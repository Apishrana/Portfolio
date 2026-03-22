'use client';

import PortfolioCli from '@/components/portfolio-cli/portfolio-cli';

import Loading from '@/components/loading/loading';
import { useEffect, useState } from 'react';

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
            {loading && (
                    <Loading />
            )}

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
