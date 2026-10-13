export function CelestialWheel({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <circle cx="200" cy="200" r="193" stroke="currentColor" strokeWidth=".6" />
      <circle cx="200" cy="200" r="184" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="149" stroke="currentColor" strokeWidth=".7" />
      <circle cx="200" cy="200" r="142" stroke="currentColor" strokeWidth=".6" />
      <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth=".8" />
      <circle cx="200" cy="200" r="65" stroke="currentColor" strokeWidth=".6" />
      {Array.from({ length: 60 }, (_, i) => (
        <path
          key={`tick-${i}`}
          d={`M200 ${i % 5 === 0 ? 7 : 12}V${i % 5 === 0 ? 23 : 17}`}
          stroke="currentColor"
          strokeWidth=".8"
          transform={`rotate(${i * 6} 200 200)`}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={`branch-${i}`} transform={`rotate(${i * 30} 200 200)`}>
          <path d="M200 51V90" stroke="currentColor" strokeWidth=".5" />
          <path d="M193 70L200 59L207 70L200 81Z" stroke="currentColor" strokeWidth=".7" />
          <circle cx="200" cy="105" r="2" fill="currentColor" />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={`trigram-${i}`} transform={`rotate(${i * 45} 200 200)`}>
          {[0, 1, 2].map((j) => (
            <path
              key={j}
              d={(i + j) % 3 === 0 ? `M187 ${112 + j * 5}h10m6 0h10` : `M187 ${112 + j * 5}h26`}
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </g>
      ))}
      <path
        d="M200 151a49 49 0 1 0 0 98 24.5 24.5 0 0 1 0-49 24.5 24.5 0 0 0 0-49Z"
        fill="currentColor"
        opacity=".8"
      />
      <circle cx="200" cy="200" r="49" stroke="currentColor" />
      <circle cx="200" cy="175.5" r="6" fill="var(--paper)" />
      <circle cx="200" cy="224.5" r="6" fill="currentColor" />
    </svg>
  );
}
