import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";

import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TableGrade from "./grades/TableGrades";

export default function GradesPage({ name }) {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [tipoEvaluacion, setTipoEvaluacion] = useState("trimestre");

  // 1️⃣ Fetch de cursos y profesor
  const { data: cursos = [], loading: cargandoCursos } = useFetch("/api/getCursos");
  const { data: teacherInfo, loading: loadingTeacherInfo } = useFetch(
    `/api/getTeacherInfoByName?name=${name}`
  );

  // 2️⃣ Asegurar que materias exista
  const materias = Array.isArray(teacherInfo?.materias)
    ? teacherInfo.materias
    : [];

  // 3️⃣ Fetch de alumnos según curso y materia
  const fetchAlumnosUrl =
    cursoSeleccionado && materiaSeleccionada
      ? `/api/getStudentsGrades?cursoId=${cursoSeleccionado.id_curso}&materiaId=${materiaSeleccionada.id_subject}`
      : null;

  const { data: alumnos = [], loading: cargandoAlumnos } = useFetch(fetchAlumnosUrl);

  // 🔄 Manejo de cambios
  const manejarCambioCurso = (idCurso) => {
    const id = Number(idCurso);
    const curso = cursos.find((c) => c.id_curso === id) || null;
    setCursoSeleccionado(curso);
    setMateriaSeleccionada(null);

    // Cambiar tipo de evaluación si es necesario
    if (curso && curso.curso.startsWith("5")) {
      setTipoEvaluacion("cuatrimestre");
    } else {
      setTipoEvaluacion("trimestre");
    }
  };

  const manejarCambioMateria = (idMateria) => {
    const id = Number(idMateria);
    const materia = materias.find((m) => m.id_subject === id) || null;
    setMateriaSeleccionada(materia);
  };

  if (cargandoCursos || loadingTeacherInfo) {
    return <GradesPageSkeleton />;
  }

  const tituloPagina =
    cursoSeleccionado && materiaSeleccionada
      ? `Notas de ${materiaSeleccionada.name} - ${cursoSeleccionado.curso} ${cursoSeleccionado.division}`
      : "Seleccione un Curso y una Materia";

  return (
    <div className="w-full xl:w-4/5 mx-auto space-y-8 mt-12">
      <h2 className="text-3xl font-semibold text-center">{tituloPagina}</h2>

      <section className="flex flex-col md:flex-row gap-4 justify-center">
        {/* Selector de Curso */}
        <Select
          onValueChange={manejarCambioCurso}
          value={cursoSeleccionado ? String(cursoSeleccionado.id_curso) : ""}
        >
          <SelectTrigger className="w-full md:w-[250px] bg-[var(--bg-light)]">
            <SelectValue placeholder="Selecciona un curso" />
          </SelectTrigger>
          <SelectContent>
            {cursos.map((c) => (
              <SelectItem key={c.id_curso} value={String(c.id_curso)}>
                {c.curso} {c.division}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Selector de Materia */}
        <Select
          onValueChange={manejarCambioMateria}
          value={materiaSeleccionada ? String(materiaSeleccionada.id_subject) : ""}
          disabled={!cursoSeleccionado || materias.length === 0}
        >
          <SelectTrigger className="w-full md:w-[250px] bg-[var(--bg-light)]">
            <SelectValue placeholder="Selecciona una materia" />
          </SelectTrigger>
          <SelectContent>
            {materias.map((m) => (
              <SelectItem key={m.id_subject} value={String(m.id_subject)}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Tabla de Calificaciones */}
      <section>
        {cargandoAlumnos  ? (
          <GradesPageSkeleton />
        ) : cursoSeleccionado && materiaSeleccionada ? (
          <TableGrade students={alumnos} type={tipoEvaluacion} />
        ) : (
          <p className="text-center text-text-muted mt-10">
            Utiliza los selectores de arriba para cargar la lista de alumnos y comenzar a
            gestionar las notas.
          </p>
        )}
      </section>
    </div>
  );
}


// ---- Skeleton Loader ----
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