import React from "react";

export default function ProgressCircle({ percentage = 1 }) {
  // Función utilitaria interna
  const cleanPercentage = (value) => {
    const num = Number(value);
    // Cambiado 'isFinite' por 'Number.isFinite' para mayor seguridad en JS
    if (!Number.isFinite(num) || num < 0) return 0; 
    if (num > 100) return 100;
    return num;
  };

  // Variables de lógica interna: 'pct', 'r', 'circ', 'strokePct'
  const pct = cleanPercentage(percentage);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;

  return (
    <div className="relative flex flex-col items-center justify-center mx-auto">
      <svg width={160} height={160}>
        <defs>
          <linearGradient id="gradLight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e40af" /> {/* Azul oscuro */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Azul medio claro */}
          </linearGradient>

          <linearGradient id="gradDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" /> {/* Azul muy oscuro */}
            <stop offset="100%" stopColor="#2563eb" /> {/* Azul intermedio */}
          </linearGradient>
        </defs>

        <g transform="rotate(-90 80 80)">
          {/* Fondo gris */}
          <circle
            r={r}
            cx={80}
            cy={80}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="18"
          />
          {/* Barra de progreso con gradiente */}
          <circle
            r={r}
            cx={80}
            cy={80}
            fill="transparent"
            className="dark:stroke-[url(#gradDark)] stroke-[url(#gradLight)]"
            strokeWidth="11"
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Texto centrado usando span sobre el SVG */}
      <span className="absolute flex items-center justify-center text-text font-bold text-xl">
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}