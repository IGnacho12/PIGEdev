import React from "react";
import WaveButton from "@/components/shared/buttonsIbelic/waveButon";

export default function Hero({ name }) {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <h1 className="text-5xl font-bold">¡Hola {name}!</h1>
      <p>Espero que estés siendo piadoso con los polluelos 🐣</p>

      <section className="flex justify-around w-1/3 mt-12">
        <div className="flex flex-col items-center text-center space-y-2">
          <WaveButton content="Notas" />
          <p className="text-sm text-gray-600 w-32">
            Gestioná las calificaciones de tus alumnos.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <WaveButton content="Asistencia" />
          <p className="text-sm text-gray-600 w-32">
            Tomá la asistencia del día para cada curso.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <WaveButton content="Algo más" />
          <p className="text-sm text-gray-600 w-32">
            Accedé a otras herramientas del sistema.
          </p>
        </div>
      </section>
    </main>
  );
}
