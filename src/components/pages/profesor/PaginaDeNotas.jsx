import React, { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

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

  return (
    <div className="w-full xl:w-4/5 mx-auto space-y-8 mt-12">
      <h2 className="text-3xl font-semibold text-center">Hola profesor</h2>

      <section className="flex flex-col md:flex-row gap-4 justify-center">
        <SelectorDeCursoYMateria
          onSelectionChange={obtenerCursoYMateria}
        ></SelectorDeCursoYMateria>
      </section>

      <TablaDeNotas cursoSeleccionado={cursoSeleccionado} />
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
