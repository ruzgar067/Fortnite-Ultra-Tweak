export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* BG */}
      <rect width="32" height="32" rx="8" fill="url(#logo_bg)" />
      {/* Lightning bolt / pickaxe shape */}
      <path d="M20 4L10 16H16L12 28L22 14H16L20 4Z" fill="url(#logo_bolt)" />
      {/* Glow overlay */}
      <path d="M20 4L10 16H16L12 28L22 14H16L20 4Z" fill="url(#logo_glow)" opacity="0.4" />
      <defs>
        <linearGradient id="logo_bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a0a1a" />
          <stop offset="100%" stopColor="#12053a" />
        </linearGradient>
        <linearGradient id="logo_bolt" x1="10" y1="4" x2="22" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00c8ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="logo_glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
