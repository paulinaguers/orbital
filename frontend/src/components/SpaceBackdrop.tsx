// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

interface StarSpec {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  layer: 1 | 2 | 3;
  tint: string;
}

// Deterministic starfield coordinates across a 1600x1000 sky plane
const STARS: StarSpec[] = Array.from({ length: 84 }, (_, idx) => {
  const s1 = Math.sin(idx * 12.9898 + 4.1414) * 43758.5453;
  const s2 = Math.sin(idx * 78.233 + 1.732) * 24634.6345;
  const s3 = Math.sin(idx * 39.425 + 9.217) * 19283.4712;
  const f1 = s1 - Math.floor(s1);
  const f2 = s2 - Math.floor(s2);
  const f3 = s3 - Math.floor(s3);

  const layer = ((idx % 3) + 1) as 1 | 2 | 3;
  const r = Number((0.55 + f3 * 1.25).toFixed(2));
  const opacity = Number((0.25 + ((idx * 7) % 10) * 0.065).toFixed(2));
  const tint =
    idx % 7 === 0 ? '#7DD3FC' : idx % 11 === 0 ? '#BAE6FD' : '#E8F0FF';

  return {
    cx: Number((f1 * 1600).toFixed(1)),
    cy: Number((f2 * 1000).toFixed(1)),
    r,
    opacity,
    layer,
    tint,
  };
});

export function SpaceBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle deep-space radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 22% 24%, rgba(61, 123, 255, 0.14) 0%, transparent 48%), radial-gradient(circle at 82% 16%, rgba(79, 195, 247, 0.12) 0%, transparent 44%), radial-gradient(circle at 50% 90%, rgba(30, 64, 175, 0.14) 0%, transparent 55%)',
        }}
      />

      {/* Starfield SVG with slow twinkle */}
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {STARS.map((star, idx) => (
          <circle
            key={idx}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.tint}
            opacity={star.opacity}
            className={`space-star-twinkle-${star.layer}`}
          />
        ))}
      </svg>

      {/* Curved limb of Earth in the top-right corner */}
      <svg
        viewBox="0 0 700 520"
        className="absolute right-0 top-0 h-[340px] w-[460px] sm:h-[430px] sm:w-[580px] lg:h-[520px] lg:w-[700px] opacity-65"
        fill="none"
      >
        <defs>
          <radialGradient
            id="earth-limb-atmosphere"
            cx="680"
            cy="-160"
            r="590"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="84%" stopColor="#4FC3F7" stopOpacity="0" />
            <stop offset="93%" stopColor="#4FC3F7" stopOpacity="0.22" />
            <stop offset="97%" stopColor="#3D7BFF" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#050B1A" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="earth-limb-body"
            cx="640"
            cy="-120"
            r="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#050C1D" stopOpacity="0.88" />
            <stop offset="72%" stopColor="#071738" stopOpacity="0.86" />
            <stop offset="94%" stopColor="#0D2C64" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#1D5FA7" stopOpacity="0.78" />
          </radialGradient>

          <linearGradient
            id="earth-limb-rim"
            x1="200"
            y1="0"
            x2="680"
            y2="380"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#7DD3FC" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#3D7BFF" stopOpacity="0.35" />
          </linearGradient>

          <filter
            id="earth-limb-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Outer atmospheric cyan-blue glow */}
        <circle cx="680" cy="-160" r="575" fill="url(#earth-limb-atmosphere)" />

        {/* Soft blurred cyan horizon aura */}
        <circle
          cx="680"
          cy="-160"
          r="525"
          stroke="#4FC3F7"
          strokeOpacity="0.48"
          strokeWidth="12"
          filter="url(#earth-limb-blur)"
        />

        {/* Dark blue planet curvature */}
        <circle cx="680" cy="-160" r="522" fill="url(#earth-limb-body)" />

        {/* Thin crisp cyan-blue atmospheric edge */}
        <circle
          cx="680"
          cy="-160"
          r="522"
          stroke="url(#earth-limb-rim)"
          strokeWidth="2.4"
        />
      </svg>
    </div>
  );
}
