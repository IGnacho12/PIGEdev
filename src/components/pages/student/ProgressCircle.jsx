import React from "react";

export default function ProgressCircle({ percentage = 1, label = "" }) {
  const cleanPercentage = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num) || num < 0) return 0;
    if (num > 100) return 100;
    return num;
  };

  const pct = cleanPercentage(percentage);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;

  return (
    <div className="relative flex flex-col items-center justify-center mx-auto">
      <svg width={160} height={160}>
        <g transform="rotate(-90 80 80)">
          {/* Fondo gris */}
          <circle
            r={r}
            cx={80}
            cy={80}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="16"
          />
          {/* Barra de progreso */}
          <circle
            r={r}
            cx={80}
            cy={80}
            fill="transparent"
            stroke="#09f"
            strokeWidth="11"
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
          />
        </g>
        {/* Texto del porcentaje */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="1.4em"
          fontWeight="bold"
        >
          {pct.toFixed(0)}%
        </text>
      </svg>
      {label && (
        <span className="text-sm text-gray-500 mt-1 text-center">{label}</span>
      )}
    </div>
  );
}
