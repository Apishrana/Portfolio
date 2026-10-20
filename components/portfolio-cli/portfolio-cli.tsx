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
import { manualPages, commandMap } from '@/public/data/CliData.js';

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

const initialLines = [
    "Welcome to Apish's Portfolio CLI v1.6.7",
    'Type help for available commands',
];

const cssVariableMap = {
    background: '--cli-terminal-background',
    blue: '--cli-terminal-blue',
    green: '--cli-terminal-green',
};

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

function rgbStringToHex(color: string) {
    const match = color.match(/\d+/g);
    if (!match || match.length < 3) {
        return color;
    }
    const [r, g, b] = match.slice(0, 3).map((value) => Number(value));
    return `#${[r, g, b]
        .map((channel) => channel.toString(16).padStart(2, '0'))
        .join('')}`;
}

function normalizeColorValue(color: string, fallback: string) {
    const trimmed = color.trim();
    if (!trimmed) {
        return fallback;
    }
    if (trimmed.startsWith('#')) {
        return trimmed;
    }
    if (trimmed.startsWith('rgb')) {
        return rgbStringToHex(trimmed);
    }
    return fallback;
}

function getInitialThemeColors(): ThemeColors {
    if (typeof window === 'undefined') {
        return defaultThemeColors;
    }

    const rootStyles = getComputedStyle(document.documentElement);

    return {
        background: normalizeColorValue(
            rootStyles.getPropertyValue(cssVariableMap.background),
            defaultThemeColors.background,
        ),
        blue: normalizeColorValue(
            rootStyles.getPropertyValue(cssVariableMap.blue),
            defaultThemeColors.blue,
        ),
        green: normalizeColorValue(
            rootStyles.getPropertyValue(cssVariableMap.green),
            defaultThemeColors.green,
        ),
    };
}

function getInitialInvertedState() {
    if (typeof window === 'undefined') {
        return false;
    }

    return document.documentElement.classList.contains('site-inverted');
}

export default function PortfolioCli({ setTerminalOpen }: PortfolioCliProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [draftCommand, setDraftCommand] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [controlPressed, setControlPressed] = useState(false);
    const [isInverted, setIsInverted] = useState(getInitialInvertedState);
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
                    <span className={styles.promptSymbol}>❯</span>
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
        const trimmedCommand = rawCommand.trim().toLowerCase();
        const [baseCommand, ...restArgs] = trimmedCommand.split(/\s+/);
        const manTarget =
            baseCommand === 'man' ? restArgs.join(' ').trim() : '';

        if (trimmedCommand === 'clear') {
            setHistory([]);
            setCommand('');
            setHistoryIndex(null);
            setDraftCommand('');
            return;
        }

        if (baseCommand === 'man') {
            const output = !manTarget
                ? [
                      'What manual page do you want?',
                      'For example, try: man help',
                  ]
                : (manualPages[manTarget] ??
                  manualPages[manTarget] ?? [
                      `No manual entry for ${manTarget}.`,
                  ]);

            setHistory((currentHistory) => [
                ...currentHistory,
                { command: trimmedCommand, output },
            ]);
            setCommand('');
            setHistoryIndex(null);
            setDraftCommand('');
            return;
        }

        if (trimmedCommand === 'inv' || trimmedCommand === 'ivn') {
            const nextInvertedState = !isInverted;

            document.documentElement.classList.toggle(
                'site-inverted',
                nextInvertedState,
            );
            setIsInverted(nextInvertedState);
            setHistory((currentHistory) => [
                ...currentHistory,
                {
                    command: trimmedCommand,
                    output: [
                        `Website inversion ${nextInvertedState ? 'enabled' : 'disabled'}.`,
                    ],
                },
            ]);
            setCommand('');
            setHistoryIndex(null);
            setDraftCommand('');
            return;
        }

        const output = commandMap[trimmedCommand] ?? [
            `Command not found: ${trimmedCommand}`,
            'Type help for available commands',
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
                        <span className={styles.promptSymbol}>${' ❯'}</span>
                        <span className={styles.inputFieldContainer}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={command}
                                className={`${styles.inputField} ${command.length === 0 ? styles.inputFieldInitial : ''}`}
                                placeholder="Enter command..."
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                onChange={(event) => {
                                    setCommand(event.target.value);

                                    if (historyIndex === null) {
                                        setDraftCommand(event.target.value);
                                    }
                                }}
                                onKeyUp={(event) => {
                                    if (event.key === 'Control') {
                                        setControlPressed(false);
                                    }
                                }}
                                onKeyDown={(event) => {
                                    // console.log()
                                    if (event.key === 'Enter') {
                                        runCommand(command);
                                        return;
                                    }
                                    if (event.key === 'Control') {
                                        setControlPressed(true);
                                    }
                                    if (event.key === 'c' && controlPressed) {
                                        setTerminalOpen(false);
                                    }

                                    if (event.key === 'ArrowUp') {
                                        event.preventDefault();

                                        if (history.length === 0) {
                                            return;
                                        }

                                        if (historyIndex === null) {
                                            setDraftCommand(command);
                                            const nextIndex =
                                                history.length - 1;
                                            setHistoryIndex(nextIndex);
                                            setCommand(
                                                history[nextIndex].command,
                                            );
                                            return;
                                        }

                                        if (historyIndex > 0) {
                                            const nextIndex = historyIndex - 1;
                                            setHistoryIndex(nextIndex);
                                            setCommand(
                                                history[nextIndex].command,
                                            );
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
                                            setCommand(
                                                history[nextIndex].command,
                                            );
                                            return;
                                        }

                                        setHistoryIndex(null);
                                        setCommand(draftCommand);
                                    }
                                }}
                            />
                            {command.length === 0 && (
                                <span className={styles.cursor} />
                            )}
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}
