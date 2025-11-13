import React from "react";
import WaveButton from "@/components/shared/buttonsIbelic/waveButon";

export default function Hero({ name }) {
  return (
    <main className="flex flex-col items-center justify-center w-full text-center">
      <h1 className="text-5xl font-bold">¡Hola {name}!</h1>
      <p className="text-lg text-muted-foreground mt-2">
        Espero que estés siendo piadoso con los polluelos 🐣
      </p>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-4/5 mt-12">
        {/* Notas */}
        <Card
          title="Gestiona las calificaciones de tus alumnos"
          description="Elige el curso y el alumno, asignale una calificación numérica para cada trimestre o cuatrimestre."
          buttonLabel="Notas"
          href={`/profesor/notas?nombre=${name}`}
        />

        {/* Asistencia */}
        <Card
          title="Tomá la asistencia de tus cursos"
          description="Seleccioná el curso y registrá la presencia o ausencia de cada alumno del día."
          buttonLabel="Asistencia"
          href={`/profesor/asistencia?nombre=${name}`}
        />
      </section>
    </main>
  );
}

function Card({ title, description, buttonLabel, href }) {
  return (
    <article className="px-6 py-4 border border-text-muted/20 rounded-md bg-[var(--bg-light)] shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-base text-muted-foreground mb-4">{description}</p>
      <div className="flex justify-center">
        <WaveButton content={buttonLabel} href={href} />
      </div>
    </article>
  );
}
