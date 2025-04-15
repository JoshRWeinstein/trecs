export default function DinoMascot() {
  return (
    <svg
      className="h-8 w-8 text-green-600"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      {/* Body */}
      <path d="M35,50 Q45,40 55,50 Q65,40 75,50 L75,65 Q65,75 55,65 Q45,75 35,65 Z" />
      {/* Head */}
      <path d="M75,50 Q80,45 85,50 Q80,55 75,50" />
      {/* Eye */}
      <circle cx="78" cy="48" r="1.5" fill="white" />
      {/* Teeth */}
      <path d="M85,50 L86,49 L87,50 L86,51 Z" fill="white" />
      {/* Tail */}
      <path d="M35,55 Q25,50 20,60 Q25,70 35,65" />
      {/* Legs */}
      <path d="M45,65 L45,70 L48,70 L48,65" />
      <path d="M62,65 L62,70 L65,70 L65,65" />
      {/* Spikes */}
      <path d="M55,40 L57,35 L59,40" />
      <path d="M50,42 L52,37 L54,42" />
      <path d="M60,42 L62,37 L64,42" />
    </svg>
  );
} 