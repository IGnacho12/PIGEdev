import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CloudUpload } from "lucide-react";
import useFetch from "@/hooks/useFetch";

export default function TablaDeAsistencia({ cursoSeleccionado, materiaSeleccionada }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencias, setAsistencias] = useState({});

  const { data: estudiantesResponse } = useFetch(
    cursoSeleccionado && materiaSeleccionada
      ? `/api/alumnos/obtenerPorCurso?curso_y_division=${cursoSeleccionado}&materia=${materiaSeleccionada}`
      : null
  );

  useEffect(() => {
    if (estudiantesResponse) {
      setEstudiantes(estudiantesResponse);
      const inicial = {};
      estudiantesResponse.forEach((e) => {
        inicial[e.id_estudiante] = "ausente"; // valor por defecto
      });
      setAsistencias(inicial);
    }
  }, [estudiantesResponse]);

  const marcar = (id, estado) => {
    setAsistencias((prev) => ({
      ...prev,
      [id]: estado,
    }));
  };

  const guardarAsistencia = async () => {
    const datosAGuardar = estudiantes.map((e) => ({
      id_estudiante: e.id_estudiante,
      estado: asistencias[e.id_estudiante],
    }));

    console.log(datosAGuardar);

    const response = await fetch("/api/enviarAsistencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosAGuardar),
    });

    if (!response.ok) {
      alert("Error al guardar la asistencia");
      return;
    }

    alert("¡Asistencia guardada con éxito!");
  };

  return (
    <>
      <article className="bg-[var(--bg-light)] mx-auto border border-text-muted/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Alumno</TableHead>
              <TableHead className="text-center">Presente</TableHead>
              <TableHead className="text-center">Tardanza</TableHead>
              <TableHead className="text-center">Ausente</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {estudiantes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-2">
                  ¡Debes seleccionar un curso y una materia!
                </TableCell>
              </TableRow>
            ) : (
              estudiantes.map((est) => (
                <TableRow key={est.id_estudiante}>
                  <TableCell>{est.nombre}</TableCell>
                  {["presente", "tardanza", "ausente"].map((estado) => (
                    <TableCell className="text-center" key={estado}>
                      <button
                        onClick={() => marcar(est.id_estudiante, estado)}
                        className={`px-3 py-1 rounded-md transition font-medium ${
                          asistencias[est.id_estudiante] === estado
                            ? estado === "presente"
                              ? "bg-green-500 text-white"
                              : estado === "tardanza"
                              ? "bg-yellow-400 text-black"
                              : "bg-red-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {estado.charAt(0).toUpperCase() + estado.slice(1)}
                      </button>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </article>

      <div className="w-full flex justify-center mt-4">
        <BotonGuardar onClick={guardarAsistencia}>Guardar Asistencia</BotonGuardar>
      </div>
    </>
  );
}

function BotonGuardar({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md dark:bg-white/95 dark:text-black bg-neutral-950 px-6 font-medium text-neutral-200 duration-100 hover:cursor-pointer active:scale-90 hover:scale-105"
    >
      <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
        {children}
      </div>
      <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
        <CloudUpload />
      </div>
    </button>
  );
}
