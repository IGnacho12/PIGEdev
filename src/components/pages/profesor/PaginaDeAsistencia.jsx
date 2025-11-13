import React, { useEffect, useState } from "react";
import SelectorDeCursoYMateria from "./asistencia/SelectorDeCursoYMateria";
import TablaDeAsistencia from "./asistencia/TablaDeAsistencia";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaginaDeAsistencia() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [nombreProfesor, setNombreProfesor] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("nombre");
    setNombreProfesor(name || "profesor");
  }, []);

  const obtenerSeleccion = (curso, materia) => {
    setCursoSeleccionado(curso);
    setMateriaSeleccionada(materia);
  };

  return (
    <div className="w-full xl:w-4/5 mx-auto space-y-8 mt-12">
      <h2 className="text-3xl font-semibold text-center mb-0 pb-0">
        Asistencia de {nombreProfesor}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-0 bg-white w-fit mx-auto dark:bg-black">
        Primero selecciona un curso y materia para registrar asistencia
      </p>

      <section className="flex flex-col md:flex-row gap-4 justify-center">
        <SelectorDeCursoYMateria onSelectionChange={obtenerSeleccion} />
      </section>

      <TablaDeAsistencia
        cursoSeleccionado={cursoSeleccionado}
        materiaSeleccionada={materiaSeleccionada}
      />
    </div>
  );
}
