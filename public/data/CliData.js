const helpLines = [
    'Available commands:',
    '  help            Show this help message',
    '  man <command>   Show manual page for a command',
    '  profile         Display profile information',
    '  resume          Get user resume',
    '  projects        List all projects',
    '  experience      Show work experience',
    '  skills          Display technical skills',
    '  education       Show education details',
    '  contact         Display contact information',
    '  status          Show system status',
    '  achievements    Show achievements and awards',
    '  clear           Clear the terminal',
    '  ',
    '  press ctrl+c to close the terminal',
    '  sudo help       Find out yourself',
];

export const manualPages = {
    help: [
        'HELP(1)',
        '',
        'NAME',
        '    help - show available portfolio terminal commands',
        '',
        'SYNOPSIS',
        '    help',
        '    man help',
        '',
        'DESCRIPTION',
        '    Prints the list of supported commands and short descriptions.',
    ],
    clear: [
        'CLEAR(1)',
        '',
        'NAME',
        '    clear - clear the terminal output history',
        '',
        'SYNOPSIS',
        '    clear',
        '    man clear',
        '',
        'DESCRIPTION',
        '    Removes prior command output and resets the visible terminal log.',
    ],
    profile: [
        'PROFILE(1)',
        '',
        'NAME',
        '    profile - display profile information',
        '',
        'SYNOPSIS',
        '    profile',
        '    man profile',
        '',
        'DESCRIPTION',
        '    Shows identity, role, location, and current availability.',
    ],
    resume: [
        'RESUME(1)',
        '',
        'NAME',
        '    resume - get user resume',
        '',
        'SYNOPSIS',
        '    resume',
        '    man resume',
        '',
        'DESCRIPTION',
        '    Downloads resume of the user',
    ],
    projects: [
        'PROJECTS(1)',
        '',
        'NAME',
        '    projects - list project information',
        '',
        'SYNOPSIS',
        '    projects',
        '    man projects',
        '',
        'DESCRIPTION',
        '    Displays project entries and related showcase information.',
    ],
    experience: [
        'EXPERIENCE(1)',
        '',
        'NAME',
        '    experience - show work experience',
        '',
        'SYNOPSIS',
        '    experience',
        '    man experience',
        '',
        'DESCRIPTION',
        '    Displays selected experience history and timeline data.',
    ],
    skills: [
        'SKILLS(1)',
        '',
        'NAME',
        '    skills - display technical skills',
        '',
        'SYNOPSIS',
        '    skills',
        '    man skills',
        '',
        'DESCRIPTION',
        '    Lists tools, frameworks, and core technical focus areas.',
    ],
    education: [
        'EDUCATION(1)',
        '',
        'NAME',
        '    education - show education details',
        '',
        'SYNOPSIS',
        '    education',
        '    man education',
        '',
        'DESCRIPTION',
        '    Shows education-related information for the portfolio owner.',
    ],
    contact: [
        'CONTACT(1)',
        '',
        'NAME',
        '    contact - display contact information',
        '',
        'SYNOPSIS',
        '    contact',
        '    man contact',
        '',
        'DESCRIPTION',
        '    Prints primary communication and social links.',
    ],
    status: [
        'STATUS(1)',
        '',
        'NAME',
        '    status - show system status',
        '',
        'SYNOPSIS',
        '    status',
        '    man status',
        '',
        'DESCRIPTION',
        '    Reports terminal and portfolio state indicators.',
    ],
    achievements: [
        'ACHIEVEMENTS(1)',
        '',
        'NAME',
        '    achievements - show achievements and awards',
        '',
        'SYNOPSIS',
        '    achievements',
        '    man achievements',
        '',
        'DESCRIPTION',
        '    Displays awards, notable outcomes, and milestone notes.',
    ],
    inv: [
        'INV(1)',
        '',
        'NAME',
        '    inv, - toggle website color inversion',
        '',
        'SYNOPSIS',
        '    inv',
        '    man inv',
        '',
        'DESCRIPTION',
        '    Toggles a global inversion class on the site root.',
    ],
    'sudo help': [
        'SUDO-HELP(1)',
        '',
        'NAME',
        '    sudo help - reveal hidden terminal commands',
        '',
        'SYNOPSIS',
        '    sudo help',
        '    man sudo help',
        '',
        'DESCRIPTION',
        '    Prints the hidden command list for experimental terminal features.',
    ],
    man: [
        'MAN(1)',
        '',
        'NAME',
        '    man - format and display command manual pages',
        '',
        'SYNOPSIS',
        '    man <command>',
        '',
        'DESCRIPTION',
        '    Displays the manual page for a supported terminal command.',
    ],
};

export const commandMap = {
    '': [''],
    help: helpLines,
    'sudo help': [
        ...helpLines,
        '  cursor            Change cursor type',
        '  trail             Toggle cursor trail',
        '  inv               Toggle website color inversion',
    ],
    profile: [
        'User: Apish Rana',
        'Role: Fullstack developer, Game developer',
        'Location: Bengaluru,India',
        'Status: Available for work',
        'Specialization: Unity, FastAPI, React.js, Next.js, Embedded systems',
    ],
    resume: ['WIP'],
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
    projects: ['Projects:'],
    experience: [
        'Experience:',
        'NONE',
        // '  wceyc cwexq                  2025 - Present',
        // '  ecwqxcer                     2007 - 2025',
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
    skills: [
        'Skills:',
        ' WIP',
        // '  Next.js, React, TypeScript, Unity, Blender, C#, Arduino',
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
    education: ['Education:', '  srdfghjk'],
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
    contact: [
        'Contact:',
        '  Email: apishrana682@gamil.com',
        '  GitHub: github.com/apishrana',
        `  LinkedIn: ${<h1>linkedin.com/in/apish-rana-519139375/</h1>}`,
    ],
    // Contact Information:
    // Email: fahedkhan12092004@gmail.com
    // Phone: +91 7208641625
    // GitHub: @12fahed
    // LinkedIn: fahed-khan-13b11025b
    // Instagram: __fahedkhan
    status: [
        'System Status',
        '● API Server: Running',
        '● Database: Connected',
        '● Cache: Active',
        '● Deployment: Live',
        '● Last Updated: 22/03/2026, 12:00:13',
    ],
    achievements: [
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
