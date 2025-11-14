import React, { useEffect, useState } from "react";
import SelectorDeCursoYMateria from "./asistencia/SelectorDeCursoYMateria";
import TablaDeAsistencia from "./asistencia/TablaDeAsistencia";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaginaDeAsistencia() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [nombreProfesor, setNombreProfesor] = useState("");

  // --- Estado que recibirá la "foto" de asistencias desde TablaDeAsistencia ---
  const [asistenciasDelDia, setAsistenciasDelDia] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("nombre");
    setNombreProfesor(name || "profesor");
  }, []);

  const obtenerSeleccion = (curso, materia) => {
    setCursoSeleccionado(curso);
    setMateriaSeleccionada(materia);
  };

  // Fecha formateada para mostrar (opcional)
  const fechaHoy = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // --- Función para "enviar" asistencias (por ahora solo hace console.log)
  const enviarAsistencias = async () => {
    if (!asistenciasDelDia || asistenciasDelDia.length === 0) {
      alert("No hay asistencias para enviar.");
      return;
    }

    // DEBUG: muestra el payload en consola
    console.log("Enviando asistencias a la API (simulado):", asistenciasDelDia);

    // Si querés activar el envío real a la API, descomenta y ajusta la URL:
    /*
    try {
      const res = await fetch("/api/asistencias/guardar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asistenciasDelDia),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al guardar asistencias");
      }

      alert("Asistencias enviadas correctamente.");
    } catch (err) {
      console.error("Error guardando asistencias:", err);
      alert("Hubo un error al enviar las asistencias. Revisa la consola.");
    }
    */
  };

  return (
    <div className="w-full xl:w-4/5 mx-auto space-y-8 mt-12 px-4 md:px-0">
      <h2 className="text-3xl font-semibold text-center mb-0 pb-0">
        Asistencia de {nombreProfesor}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mt-0 bg-white w-fit mx-auto dark:bg-black">
        Primero selecciona un curso y materia para registrar asistencia
      </p>

      <p className="text-gray-600 dark:text-gray-300 mt-0 bg-white w-fit mx-auto dark:bg-black">
        La asistencia solo contará por el día de la fecha ({fechaHoy})
      </p>

      <section className="flex flex-col  md:flex-row gap-4 justify-center">
        <SelectorDeCursoYMateria onSelectionChange={obtenerSeleccion} />
      </section>

      {/* --- Tabla recibe la función para pasar el array final de asistencias --- */}
      <TablaDeAsistencia
        cursoSeleccionado={cursoSeleccionado}
        materiaSeleccionada={materiaSeleccionada}
        onAsistenciaChange={setAsistenciasDelDia}
      />

      {/* --- Pequeño resumen / control para avanzar --- */}

    </div>



  );
}
