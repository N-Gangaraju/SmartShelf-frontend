function Logo({ size = 130 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>

      {/* Main R */}

      <path
        d="
        M65 35
        H115
        C145 35 165 55 165 82
        C165 110 145 130 115 130
        H92
        L160 185
        H122
        L70 140
        H65
        Z"
        fill="white"
      />

      {/* Cart Basket */}

      <path
        d="
        M86 72
        H145
        L135 108
        H95
        Z"
        fill="url(#gold)"
      />

      {/* Basket Lines */}

      <line
        x1="97"
        y1="82"
        x2="136"
        y2="82"
        stroke="white"
        strokeWidth="3"
      />

      <line
        x1="95"
        y1="92"
        x2="134"
        y2="92"
        stroke="white"
        strokeWidth="3"
      />

      {/* Wheels */}

      <circle cx="98" cy="120" r="7" fill="white" />
      <circle cx="132" cy="120" r="7" fill="white" />
    </svg>
  );
}

export default Logo;