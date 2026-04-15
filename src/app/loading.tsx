export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 px-6">
        <svg
          className="w-28 h-28"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Loading"
        >
          <defs>
            <linearGradient id="pages-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="pages-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#pages-glow)">
            <path
              d="M60 15 a45 45 0 1 0 0.0001 0"
              stroke="url(#pages-grad)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="75 200"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="1.9s"
                repeatCount="indefinite"
              />
            </path>

            <circle cx="60" cy="60" r="14" fill="#ffffff" stroke="url(#pages-grad)" strokeWidth="2">
              <animate attributeName="r" values="10;14;10" dur="1.9s" repeatCount="indefinite" />
            </circle>

            <circle cx="60" cy="18" r="4" fill="url(#pages-grad)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="1.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>

        <div className="text-center">
          <div className="text-lg font-semibold text-slate-800">Loading content</div>
          <div className="text-sm text-slate-500">Just a moment — fetching the latest data.</div>
        </div>
      </div>
    </div>
  )
}
