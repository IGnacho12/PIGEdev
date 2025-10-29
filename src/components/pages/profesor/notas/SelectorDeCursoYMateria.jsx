/*
Responsabilidades de este componente
1. Obtener todos los cursos de la Base de Datos y mostrarlos para que el usuario pueda seleccionarlos
2. Obtener las materias que proporciona el docente y mostrarlas para elegirlas
*/

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";

export default function SelectorDeCursoYMateria({ onSelectionChange }) {
  // Estados especificos para el curso, la division, y la materia
  const [nombreProfesor, setNombreProfesor] = useState("");
  const [cursos, setCursos] = useState([]);
  const [materiasDelProfesor, setMateriasDelProfesor] = useState([]);

  // Datos seleccionados
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  //  Enviar estos datos a PaginaDeNotas para que se lo pase a TablaDeNotas
  useEffect(() => {
    if (cursoSeleccionado && materiaSeleccionada) {
      onSelectionChange(cursoSeleccionado, materiaSeleccionada);
    }
  }, [cursoSeleccionado, materiaSeleccionada]);

  // Obtener todos los cursos y almacenarlos en curso
  const { data: cursosResponse, loading: cargandoCursos } =
    useFetch("/api/obtenerCursos");
  useEffect(() => {
    if (cursosResponse) setCursos(cursosResponse);
  }, [cursosResponse]);

  // Obtener las materias que da el profesor, primero obtego el nombre y después la información de ese profesor
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre") || "";
    setNombreProfesor(nombre);
  }, []);

  const { data: InfoProfeResponse, loading: cargandoInfoDeProfesor } = useFetch(
    nombreProfesor
      ? `/api/obtenerInfoDeProfesorPorNombre?nombre=${nombreProfesor}`
      : null
  );
  // setear las materias del profesor
  useEffect(() => {
    if (InfoProfeResponse) {
      setMateriasDelProfesor(InfoProfeResponse[0].materias);
    }
  }, [InfoProfeResponse]);

  return (
    <>
      {/* Selector de Curso */}
      <Select onValueChange={setCursoSeleccionado}>
        <SelectTrigger className="w-full md:w-[250px] bg-[var(--bg-light)]">
          <SelectValue placeholder="Selecciona un curso" />
        </SelectTrigger>
        <SelectContent>
          {cursos.map((curso) => (
            <SelectItem
              key={curso.id_curso}
              value={`${curso.curso} ${curso.division}`}
            >
              {curso.curso} {curso.division}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Selector de Materia */}
      <Select onValueChange={setMateriaSeleccionada}>
        <SelectTrigger className="w-full md:w-[250px] bg-[var(--bg-light)]">
          <SelectValue placeholder="Selecciona una materia" />
        </SelectTrigger>
        <SelectContent>
          {materiasDelProfesor.map((materia) => (
            <SelectItem key={materia} value={materia}>
              {materia}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
