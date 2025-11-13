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
  const [nombreProfesor, setNombreProfesor] = useState("");
  const [cursos, setCursos] = useState([]);
  const [materiasDelProfesor, setMateriasDelProfesor] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  useEffect(() => {
    if (cursoSeleccionado && materiaSeleccionada) {
      onSelectionChange(cursoSeleccionado, materiaSeleccionada);
    }
  }, [cursoSeleccionado, materiaSeleccionada]);

  const { data: cursosResponse } = useFetch("/api/cursos/obtener");
  useEffect(() => {
    if (cursosResponse) setCursos(cursosResponse);
  }, [cursosResponse]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre") || "";
    setNombreProfesor(nombre);
  }, []);

  const { data: infoProfeResponse } = useFetch(
    nombreProfesor
      ? `/api/profesores/obtenerInfo?nombre=${nombreProfesor}`
      : null
  );

  useEffect(() => {
    if (infoProfeResponse)
      setMateriasDelProfesor(infoProfeResponse[0].materias);
  }, [infoProfeResponse]);

  return (
    <>
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
