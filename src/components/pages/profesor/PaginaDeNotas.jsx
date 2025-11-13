import React, { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import SelectorDeCursoYMateria from "./notas/SelectorDeCursoYMateria";
import TablaDeNotas from "./notas/TablaDeNotas";

export default function GradesPage() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  const obtenerCursoYMateria = (curso, materia) => {
    setCursoSeleccionado(curso);
    setMateriaSeleccionada(materia);
    console.log("Datos seleccionados,", curso, materia);
  };

  const [nombreProfesor, setNombreProfesor] = useState("");
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("nombre");
      setNombreProfesor(name || "profesor");
    }, []);

  return (
    <div className="w-full xl:w-4/5 mx-auto space-y-8 mt-12">
      <h2 className="text-3xl font-semibold text-center mb-0 pb-0">{nombreProfesor}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-0 bg-white w-fit mx-auto dark:bg-black">Para poder calificar a tus alumnos primero necesitas elegir un curso y en que materia los calificaras</p>

      <section className="flex flex-col md:flex-row gap-4 justify-center">
        <SelectorDeCursoYMateria
          onSelectionChange={obtenerCursoYMateria}
        ></SelectorDeCursoYMateria>
      </section>

      <TablaDeNotas cursoSeleccionado={cursoSeleccionado} materiaSeleccionada={materiaSeleccionada} />
      {/* Grades Table */}
      {/* <section>
        {loadingStudents ? (
          <GradesPageSkeleton />
        ) : selectedCourse && selectedSubject ? (
          <TableGrade students={students} type={evaluationType} />
        ) : (
          <p className="text-center text-text-muted mt-10">
            Utiliza los selectores de arriba para cargar la lista de alumnos y
            comenzar a gestionar las notas.
          </p>
        )}
      </section> */}
    </div>
  );
}

// --- Skeleton Loader ---
function GradesPageSkeleton() {
  return (
    <div className="w-full xl:w-4/5 mx-auto space-y-8 mt-12">
      <Skeleton className="h-10 w-3/4 mx-auto rounded" />
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Skeleton className="h-10 w-full md:w-[250px] rounded" />
        <Skeleton className="h-10 w-full md:w-[250px] rounded" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  );
}
