'use client';

import {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styles from './portfolio-cli.module.css';

interface PortfolioCliProps {
    setTerminalOpen: Dispatch<SetStateAction<boolean>>;
}

type HistoryEntry = {
    command: string;
    output: string[];
};

type ThemeColors = {
    background: string;
    blue: string;
    green: string;
};

const helpLines = [
    'Available commands:',
    '  --help            Show this help message',
    '  --profile         Display profile information',
    '  --projects        List all projects',
    '  --experience      Show work experience',
    '  --skills          Display technical skills',
    '  --education       Show education details',
    '  --contact         Display contact information',
    '  --status          Show system status',
    '  --achievements    Show achievements and awards',
    '  clear             Clear the terminal',
];

const commandMap: Record<string, string[]> = {
    '': [''],
    '--help': helpLines,
    help: helpLines,
    man: helpLines,
    '--profile': [
        'Profile: Apish Rana',
        'Role: Frontend developer',
        'Location: Bengaluru,India',
        'Status: Available for work',
        'Specialization: Game Development, Game Development Development',
    ],
    // Projects:
    // 1. CertiNova - Bulk Certificate Generator (Production)
    //    Tech: Node.js, Express.js, AES-256, REST API
    //    Metrics: 500+ certificates generated
    // 2. Grahak - CRM Simulator for Churn Prediction (Completed)
    //    Tech: Python, scikit-learn, K-Means, Random Forest
    //    Metrics: 96.3% accuracy
    // 3. Yug Smriti - Interactive Historical Platform (Live)
    //    Tech: Mapbox, GeoJson, LLM, Wikipedia API
    //    Metrics: Interactive maps
    // 4. TSEC Railway System - Automated Concession Platform (Production)
    //    Tech: Firebase, Node.js, RBAC, Automation
    //    Metrics: 1200+ passes served
    // 5. Happening - AI-Powered Event Management Platform (Live)
    //    Tech: Next.js, TypeScript, Flask, LLM, 11labs, Framer Motion, Firebase
    //    Metrics: 8 departments managed
    // 6. Bhraman - AI-Powered Travel Companion (Completed)
    //    Tech: React.js, TypeScript, Python, FastAPI, Google Gemini AI, Mapbox
    //    Metrics: Multi-city itineraries
    // 7. Assignment Management System (Live)
    //    Tech: MERN Stack, JWT, Role-based Access Control, File Storage
    //    Metrics: 4-step workflow process
    // 8. AI Fashion Recommender (Completed)
    //    Tech: Streamlit, Transformers, Sentence-Transformers, Google Generative AI
    //    Metrics: Personalized suggestions
    // 9. ChatApp - Real-Time Chat Application (Live)
    //    Tech: MERN Stack, Socket.io, JWT, OTP Verification, MongoDB
    //    Metrics: Multi-theme support
    // 10. Weather App - Real-Time Weather Information (Live)
    //    Tech: Flutter, Dart, OpenWeather API, Geolocation, HTTP
    //    Metrics: Cross-platform support
    // 11. MHT-CET Merit List Generator (Completed)
    //    Tech: Java, OOP, Modular Design, Algorithm Design
    //    Metrics: 14-level tie-breaking
    '--projects': ['Projects:'],
    '--experience': [
        'Experience:',
        '  wceyc cwexq                  2025 - Present',
        '  ecwqxcer                     2007 - 2025',
    ],
    // Work Experience:
    // Software Developer Intern @ Maha Mumbai Metro (Jan 2025 - Present)
    // - Building system architecture for Administrative Billing Management
    // - Integrated business logic with backend using Node.js, Express.js
    // - Developed automated reporting features that reduced manual work by 80%
    // - Tech: Next.js, Node.js, Express.js, MongoDB, Cron Jobs, Automation
    // Software Developer Intern @ DigiNomisma (June 2025 - July 2025)
    // - Built secure P2P communication app with Dart and Java
    // - Engineered SSL/TLS security and Rust backend integration
    // - Implemented QR-based credential exchange and real-time connection monitoring
    // - Tech: Dart, Java, JNI, SSL/TLS, NanoHTTPD, Android
    // Chairperson @ Developers Club of TSEC (April 2024 - April 2025)
    // - Built tsecdevsclub.com and TSEC APP with 200+ MAU
    // - Led 17 developers using Agile methodology
    // - Optimized image storage and served 1200+ railway passes in 2024-25
    // - Reduced queues by 80% and staff's manual effort by 90%
    // - Tech: Next.js, Firebase, Node.js, Agile, Cron Jobs, GCP
    '--skills': [
        'Skills:',
        '  Next.js, React, TypeScript, Unity, Blender, C#, Arduino',
    ],
    // Technical Skills:
    // Languages & Tools:
    //   C, C++, Java, Python, JavaScript, Git, GitHub Actions, Vercel, Netlify, HTML5, CSS3
    // Backend & APIs:
    //   Node.js, Express.js, Python, REST APIs, GraphQL, API Development
    // Databases & Cloud:
    //   MySQL, MongoDB, Firebase, AWS, GCP, Docker
    // Library & Frameworks:
    //   React, Next.js, Flask
    // Core Data Science Libraries:
    //   NumPy, Pandas, Scikit-learn, Seaborn, Matplotlib
    '--education': ['Education:', '  srdfghjk'],
    // Education:
    // B.E in Computer Engineering
    // Thadomal Shahani Engineering College, Bandra
    // CGPI: 9.27/10 (Upto Sem 6)
    // Duration: Nov 2022 — Present
    // Coursework: OOP, DSA, Operating System, Computer Networks,
    // DBMS, Software Engineering, Cloud Computing, Cryptography and System Security,
    // Artificial Intelligence, System Programming and Compiler Design, Machine Learning
    // Higher Secondary Certificate (HSC)
    // Pace Junior Science College, Mumbai
    // Score: 87.17%
    // Duration: June 2020 — March 2022
    // Secondary School Certificate (SSC)
    // Antonio De'Souza High School, Mumbai
    // Score: 89.6%
    // Duration: June 2020 — March 2022
    '--contact': [
        'Contact:',
        '  Email: apishrana682@gamil.com',
        '  GitHub: github.com/apishrana',
        '  LinkedIn: linkedin.com/in/apish-rana-519139375/',
    ],
    // Contact Information:
    // Email: fahedkhan12092004@gmail.com
    // Phone: +91 7208641625
    // GitHub: @12fahed
    // LinkedIn: fahed-khan-13b11025b
    // Instagram: __fahedkhan
    '--status': [
        'System Status',
        '● API Server: Running',
        '● Database: Connected',
        '● Cache: Active',
        '● Deployment: Live',
        '● Last Updated: 22/03/2026, 12:00:13',
    ],
    '--achievements': [
        'Achievements:',
        '  Built multiple portfolio concepts with branded loaders and command-line inspired UI systems.',
    ],
    // Achievements & Awards:
    // -ML track Winner, HackNova 2025
    // Thakur College of Engineering and Technology
    // Built Bhraman, travel safety and guide platform
    // -First Place, TSEC Hacks 2025
    // Thadomal Shahani Engineering College
    // Built Anveshya, system for safety of children and elderly people
    // -First Place, Rubix 2025
    // Thadomal Shahani Engineering College
    // Built Yug Smriti, interactive platform for understanding history
    // -Consolation Prize, CodeSprint 2025
    // St. Aloysius (Deemed to be University)
    // Built Sanjeevni, Food rescue and management platform
    // -Top 25/200+ Team, Agethon 2024
    // Fr. C. Rodrigues Institute of Technology
    // Built System for College management with live streaming
    // -Awarded by Principal for Working on TSEC APP
    // Thadomal Shahani Engineering College
    // Operation Team Member for TSEC APP development
    // -First Place, Hackoder 2023
    // Shah & Anchor Kutchhi Engineering College
    // Built learning management System with online compiler
};

const initialLines = [
    "Welcome to Apish's Portfolio CLI v1.6.7",
    'Type --help for available commands',
];

const cssVariableMap = {
    background: '--cli-terminal-background',
    blue: '--cli-terminal-blue',
    green: '--cli-terminal-green',
} as const;

const defaultThemeColors: ThemeColors = {
    background: '#000000',
    blue: '#4d7cff',
    green: '#27f09d',
};

function hexToRgb(hex: string) {
    const sanitized = hex.replace('#', '');
    const normalized =
        sanitized.length === 3
            ? sanitized
                  .split('')
                  .map((char) => char + char)
                  .join('')
            : sanitized;

    const value = Number.parseInt(normalized, 16);

    return {
        r: (value >> 16) & 255,
        g: (value >> 8) & 255,
        b: value & 255,
    };
}

function rgbaFromHex(hex: string, alpha: number) {
    const { r, g, b } = hexToRgb(hex);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getInitialThemeColors(): ThemeColors {
    if (typeof window === 'undefined') {
        return defaultThemeColors;
    }

    const rootStyles = getComputedStyle(document.documentElement);

    return {
        background:
            rootStyles.getPropertyValue(cssVariableMap.background).trim() ||
            defaultThemeColors.background,
        blue:
            rootStyles.getPropertyValue(cssVariableMap.blue).trim() ||
            defaultThemeColors.blue,
        green:
            rootStyles.getPropertyValue(cssVariableMap.green).trim() ||
            defaultThemeColors.green,
    };
}

export default function PortfolioCli({ setTerminalOpen }: PortfolioCliProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [isFocused, setIsFocused] = useState(true);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [draftCommand, setDraftCommand] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [themeColors, setThemeColors] = useState<ThemeColors>(
        getInitialThemeColors,
    );

    useEffect(() => {
        const terminalBody = terminalBodyRef.current;

        if (!terminalBody) {
            return;
        }

        terminalBody.scrollTo({
            top: terminalBody.scrollHeight,
            behavior: 'smooth',
        });
    }, [history]);

    const updateThemeColor = (key: keyof ThemeColors, value: string) => {
        const nextTheme = {
            ...themeColors,
            [key]: value,
        };

        setThemeColors(nextTheme);

        const root = document.documentElement;

        root.style.setProperty(cssVariableMap[key], value);
        root.style.setProperty(
            '--cli-terminal-border',
            rgbaFromHex(nextTheme.blue, 0.45),
        );
        root.style.setProperty(
            '--cli-terminal-divider',
            rgbaFromHex(nextTheme.blue, 0.32),
        );
        root.style.setProperty(
            '--cli-terminal-shadow',
            rgbaFromHex(nextTheme.background, 0.34),
        );
        root.style.setProperty(
            '--cli-glow-blue',
            rgbaFromHex(nextTheme.blue, 0.22),
        );
        root.style.setProperty(
            '--cli-glow-blue-shadow',
            rgbaFromHex(nextTheme.blue, 0.6),
        );
    };

    const renderedHistory = useMemo(() => {
        return history.map((entry, index) => (
            <div
                key={`${entry.command}-${index}`}
                className={styles.historyBlock}>
                <div className={styles.historyCommand}>
                    <span className={styles.promptSymbol}>$</span>
                    <span>{entry.command}</span>
                </div>

                <div className={styles.outputArea}>
                    {entry.output.map((line, lineIndex) => (
                        <p
                            key={`${index}-${lineIndex}`}
                            className={styles.outputLine}>
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        ));
    }, [history]);

    const runCommand = (rawCommand: string) => {
        const trimmedCommand = rawCommand.trim();

        if (trimmedCommand === 'clear') {
            setHistory([]);
            setCommand('');
            setHistoryIndex(null);
            setDraftCommand('');
            return;
        }

        const output = commandMap[trimmedCommand] ?? [
            `Command not found: ${trimmedCommand}`,
            'Type --help for available commands',
        ];

        setHistory((currentHistory) => [
            ...currentHistory,
            { command: trimmedCommand, output },
        ]);
        setCommand('');
        setHistoryIndex(null);
        setDraftCommand('');
    };

    return (
        <main className={styles.page}>
            <div className={styles.backdrop}></div>
            <section className={styles.terminal}>
                <header className={styles.terminalHeader}>
                    <div className={styles.terminalTitleRow}>
                        <svg
                            className={styles.terminalIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true">
                            <path d="m7 11 2-2-2-2"></path>
                            <path d="M11 13h4"></path>
                            <rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                                ry="2"></rect>
                        </svg>
                        <span className={styles.terminalTitle}>
                            apish@portfolio:~$
                        </span>
                    </div>
                    <div className={styles.headerActions}>
                        <div className={styles.settingsWrap}>
                            <button
                                type="button"
                                className={styles.settingsButton}
                                onClick={() => {
                                    setSettingsOpen((current) => !current);
                                }}>
                                ⚙
                            </button>

                            {settingsOpen && (
                                <div className={styles.settingsPanel}>
                                    <label className={styles.settingRow}>
                                        <span>Background</span>
                                        <input
                                            type="color"
                                            value={themeColors.background}
                                            onChange={(event) => {
                                                updateThemeColor(
                                                    'background',
                                                    event.target.value,
                                                );
                                            }}
                                        />
                                    </label>
                                    <label className={styles.settingRow}>
                                        <span>Accent</span>
                                        <input
                                            type="color"
                                            value={themeColors.blue}
                                            onChange={(event) => {
                                                updateThemeColor(
                                                    'blue',
                                                    event.target.value,
                                                );
                                            }}
                                        />
                                    </label>
                                    <label className={styles.settingRow}>
                                        <span>Text</span>
                                        <input
                                            type="color"
                                            value={themeColors.green}
                                            onChange={(event) => {
                                                updateThemeColor(
                                                    'green',
                                                    event.target.value,
                                                );
                                            }}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => {
                                setTerminalOpen(false);
                            }}>
                            ×
                        </button>
                    </div>
                </header>

                <div
                    ref={terminalBodyRef}
                    className={styles.terminalBody}
                    onClick={() => {
                        inputRef.current?.focus();
                        setSettingsOpen(false);
                    }}>
                    <div className={styles.outputArea}>
                        {initialLines.map((line) => (
                            <p key={line} className={styles.outputLine}>
                                {line}
                            </p>
                        ))}
                    </div>

                    {renderedHistory}

                    <div className={styles.inputRow}>
                        <span className={styles.promptSymbol}>$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={command}
                            className={styles.inputField}
                            placeholder="Enter command..."
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                            onFocus={() => {
                                setIsFocused(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                            }}
                            onChange={(event) => {
                                setCommand(event.target.value);

                                if (historyIndex === null) {
                                    setDraftCommand(event.target.value);
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    runCommand(command);
                                    return;
                                }

                                if (event.key === 'ArrowUp') {
                                    event.preventDefault();

                                    if (history.length === 0) {
                                        return;
                                    }

                                    if (historyIndex === null) {
                                        setDraftCommand(command);
                                        const nextIndex = history.length - 1;
                                        setHistoryIndex(nextIndex);
                                        setCommand(history[nextIndex].command);
                                        return;
                                    }

                                    if (historyIndex > 0) {
                                        const nextIndex = historyIndex - 1;
                                        setHistoryIndex(nextIndex);
                                        setCommand(history[nextIndex].command);
                                    }

                                    return;
                                }

                                if (event.key === 'ArrowDown') {
                                    event.preventDefault();

                                    if (
                                        history.length === 0 ||
                                        historyIndex === null
                                    ) {
                                        return;
                                    }

                                    if (historyIndex < history.length - 1) {
                                        const nextIndex = historyIndex + 1;
                                        setHistoryIndex(nextIndex);
                                        setCommand(history[nextIndex].command);
                                        return;
                                    }

                                    setHistoryIndex(null);
                                    setCommand(draftCommand);
                                }
                            }}
                        />
                        {isFocused && command.length === 0 && (
                            <span className={styles.cursor} />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
