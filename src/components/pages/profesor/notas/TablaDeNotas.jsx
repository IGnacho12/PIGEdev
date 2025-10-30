import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { CloudUpload } from "lucide-react";

export default function TablaDeNotas({ cursoSeleccionado }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [tipoDePeriodo, setTipoDePeriodo] = useState("trimestre");
  const [notas, setNotas] = useState({}); // Estado separado para las notas

  // Función verbosa para actualizar notas
  const handleChange = (idAlumno, campo, valor) => {
    const nuevoEstado = { ...notas }; // Copiamos estado actual
    const alumno = nuevoEstado[idAlumno]
      ? { ...nuevoEstado[idAlumno] }
      : { nota1: "", nota2: "", nota3: "", notaFinal: "" };

    alumno[campo] = valor === "" ? "" : Number(valor); // Actualizamos campo
    nuevoEstado[idAlumno] = alumno; // Guardamos en nuevo estado
    setNotas(nuevoEstado);
  };

  // Obtener estudiantes del backend
  const {
    data: estudiantesResponse,
    loading,
    error,
  } = useFetch(
    cursoSeleccionado
      ? `/api/obtenerNotasDeUnCurso?curso_y_division=${cursoSeleccionado}`
      : null
  );

  // Guardar estudiantes en estado
  useEffect(() => {
    if (estudiantesResponse) setEstudiantes(estudiantesResponse);
  }, [estudiantesResponse]);

  // Inicializar notas al cargar estudiantes
  useEffect(() => {
    if (estudiantesResponse) {
      const inicial = {};
      estudiantesResponse.forEach((e) => {
        inicial[e.id_estudiante] = {
          nota1: e.nota1 || "",
          nota2: e.nota2 || "",
          nota3: e.nota3 || "",
          notaFinal: e.nota_final || "",
        };
      });
      setNotas(inicial);
    }
  }, [estudiantesResponse]);

  // Calcular promedio
  const calcPromedio = (idAlumno) => {
    const n1 = Number(notas[idAlumno]?.nota1) || 0;
    const n2 = Number(notas[idAlumno]?.nota2) || 0;
    const n3 = Number(notas[idAlumno]?.nota3) || 0;
    return tipoDePeriodo === "cuatrimestre"
      ? (n1 + n2) / 2
      : (n1 + n2 + n3) / 3;
  };

  // Generar JSON listo para guardar
  const generarJSON = () => {
    const datosAGuardar = estudiantes.map((e) => ({
      id_estudiante: e.id_estudiante,
      nombre: e.nombre,
      nota1: notas[e.id_estudiante]?.nota1 || "",
      nota2: notas[e.id_estudiante]?.nota2 || "",
      nota3: notas[e.id_estudiante]?.nota3 || "",
      nota_final: notas[e.id_estudiante]?.notaFinal || "",
    }));
    console.log(datosAGuardar)
  };

  return (
    <>
      <article className="bg-[var(--bg-light)] mx-auto border border-text-muted/20">
        <Table>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="text-left">Nombre del alumno</TableHead>
              {tipoDePeriodo === "cuatrimestre" ? (
                <>
                  <TableHead className="text-center">1º Cuatrimestre</TableHead>
                  <TableHead className="text-center">2º Cuatrimestre</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="text-center">1º Trimestre</TableHead>
                  <TableHead className="text-center">2º Trimestre</TableHead>
                  <TableHead className="text-center">3º Trimestre</TableHead>
                </>
              )}
              <TableHead className="text-center">Promedio calculado</TableHead>
              <TableHead className="text-right">Calificación final</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {estudiantes.map((estudiante) => (
              <TableRow key={estudiante.id_estudiante}>
                <TableCell>{estudiante.nombre}</TableCell>

                <TableCell className="text-center">
                  <InputNumber
                    value={notas[estudiante.id_estudiante]?.nota1 || ""}
                    onChange={(e) =>
                      handleChange(
                        estudiante.id_estudiante,
                        "nota1",
                        e.target.value
                      )
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  <InputNumber
                    value={notas[estudiante.id_estudiante]?.nota2 || ""}
                    onChange={(e) =>
                      handleChange(
                        estudiante.id_estudiante,
                        "nota2",
                        e.target.value
                      )
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  <InputNumber
                    value={notas[estudiante.id_estudiante]?.nota3 || ""}
                    onChange={(e) =>
                      handleChange(
                        estudiante.id_estudiante,
                        "nota3",
                        e.target.value
                      )
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  {calcPromedio(estudiante.id_estudiante).toFixed(2)}
                </TableCell>

                <TableCell className="text-right">
                  <InputNumber
                    value={notas[estudiante.id_estudiante]?.notaFinal || ""}
                    onChange={(e) =>
                      handleChange(
                        estudiante.id_estudiante,
                        "notaFinal",
                        e.target.value
                      )
                    }
                    important
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
      <div className="w-full flex justify-center">
         <BotonGuardar funcion={generarJSON} >Guardar Notas</BotonGuardar>
      </div>
     
    </>
  );
}

function InputNumber({ value = 0, onChange, important = false }) {
  return (
    <input
      type="number"
      min="1"
      max="10"
      value={value}
      onChange={onChange}
      className={`w-16 p-1 border border-text-muted/20 rounded-lg px-2 py-1 transition shadow-sm hover:shadow-md text-center ${
        important ? "font-bold text-lg" : ""
      }`}
    />
  );
}

function BotonGuardar({ children, funcion }) {
  return (
    <>
      <button onClick={funcion}  class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md dark:bg-white/95 dark:text-black bg-neutral-950 px-6 font-medium text-neutral-200 duration-100 hover:cursor-pointer active:scale-90 hover:scale-105">
        <div class="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
          {children}
        </div>
        <div class="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
          <CloudUpload />
        </div>
      </button>
    </>
  );
}
