const START = (
    <svg width="16" height="16" style={{ marginTop: "-4px" }} version="1.0">
        <circle cx="8" cy="8" r="4" fill="grey" />
    </svg>
);
const WAIT = (
    <svg
        width="16"
        height="16"
        style={{ marginTop: "-4px" }}
        version="1.0"
        viewBox="0 0 128 128"
    >
        <g>
            <linearGradient id="linear-gradient">
                <stop offset="0%" stopColor="#ffffff" fillOpacity="0" />
                <stop offset="100%" stopColor="grey" fillOpacity="1" />
            </linearGradient>
            <path
                d="M63.85 0A63.85 63.85 0 1 1 0 63.85 63.85 63.85 0 0 1 63.85 0zm.65 19.5a44 44 0 1 1-44 44 44 44 0 0 1 44-44z"
                fill="url(#linear-gradient)"
                fillRule="evenodd"
            />
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 64 64"
                to="360 64 64"
                dur="1200ms"
                repeatCount="indefinite"
            ></animateTransform>
        </g>
    </svg>
);
const DONE = (
    <svg
        width="16"
        height="16"
        style={{ marginTop: "-4px" }}
        version="1.1"
        viewBox="0 0 16 16"
    >
        <path
            fill="#22863a"
            fillRule="evenodd"
            d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        ></path>
    </svg>
);
const FAIL = (
    <svg
        width="16"
        height="16"
        style={{ marginTop: "-4px" }}
        version="1.1"
        viewBox="0 0 16 16"
    >
        <path
            fill="#ff0000"
            fillRule="evenodd"
            d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
        ></path>
    </svg>
);

export const animeIcons = {
    START: START,
    WAIT: WAIT,
    DONE: DONE,
    FAIL: FAIL,
};