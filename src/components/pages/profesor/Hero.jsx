import React from "react";
import WaveButton from "@/components/shared/buttonsIbelic/waveButon";

export default function Hero({ name }) {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <h1 className="text-5xl font-bold">¡Hola {name}!</h1>
      <p>Espero que estés siendo piadoso con los polluelos 🐣</p>
      <section className="grid grid-cols-3 justify-around w-4/5 gap-5 mt-12">
        {/* Notas */}
        <article className="px-5 py-2 border border-text-muted/20 rounded-sm transition-transform bg-[var(--bg-light)]">
          <h3 className="text-xl font-bold mx-auto">
            Gestiona las calificaciones de tus alumnos
          </h3>
          <p>
            Elige el curso y el alumno, asignale una calificación numérica para
            cada trimestre o cuatrimestre.
          </p>
          <WaveButton content="Notas" href={`/profesor/notas?nombre=${name}`} />{" "}
        </article>

        {/* Asistencia */}
        <article className="px-5 py-2 border border-text-muted/20 rounded-sm transition-transform bg-[var(--bg-light)]">
          <h3 className="text-xl font-bold mx-auto">
            Tomá la asistencia de tus cursos
          </h3>
          <p>
            Seleccioná el curso y registrá la presencia o ausencia de cada
            alumno del día.
          </p>
          <WaveButton
            content="Asistencia"
            href={`/profesor/asistencia?name=${name}`}
          />{" "}
        </article>

        {/* Otras herramientas */}
        <article className="px-5 py-2 border border-text-muted/20 rounded-sm transition-transform bg-[var(--bg-light)]">
          <h3 className="text-xl font-bold mx-auto">
            Accedé a más herramientas
          </h3>
          <p>
            Explorá funciones adicionales del sistema para facilitar tu gestión
            docente.
          </p>
          <WaveButton
            content="Herramientas"
            href={`/profesor/herramientas?name=${name}`}
          />{" "}
        </article>
      </section>
    </main>
  );
}
