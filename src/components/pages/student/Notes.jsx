// Notes.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function Notes({ nombre = "Castillo Ignacio" }) {
  
  // 🔴 CORREGIDO: Se usa la variable 'nombre' (prop) en la URL, 
  // ya que la variable 'name' no estaba definida.
  const { data: grades = [], loading, error } = useFetch(
    `/api/getGradesByStudent?name=${nombre}`
  );

  // Se añade una comprobación adicional para 'error'
  if (error) return <p className="text-center text-red-500">Error al cargar las notas: {error.message || "Verifique la conexión a la API."}</p>;
  if (loading) return <SkeletonLoader />;
  if (!grades.length) return <p className="text-center">No se encontraron notas para este alumno.</p>;

  // ---- Agrupar notas por materia ----
  const materiasMap = {};
  grades.forEach((notaIndividual) => {
    
    // Usamos 'materia' y 'nota' que son las claves esperadas de la API en español
    const nombreMateria = notaIndividual.materia; 
    const valorNota = Number(notaIndividual.nota); 
    
    if (!materiasMap[nombreMateria]) materiasMap[nombreMateria] = [];
    materiasMap[nombreMateria].push(valorNota);
  });

  const materias = Object.entries(materiasMap).map(([nombre, notas]) => {
    const total = notas.reduce((sum, n) => sum + n, 0);
    const promedio = total / notas.length;
    
    return { 
      nombre,
      notas,
      promedio
    };
  });

  const maxNotasCount =
    materias.length > 0
      ? Math.max(...materias.map((materia) => materia.notas.length))
      : 0;

  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-sm rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Materia</TableHead>
            <TableHead>Promedio Actual</TableHead>
            {Array.from({ length: maxNotasCount }).map((_, i) => (
              <TableHead className="text-center" key={i}>
                Nota {i + 1}
              </TableHead>
            ))}
            <TableHead className="text-center">Nota Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materias.map((materia, idx) => ( 
            <TableRow key={idx}>
              <TableCell>{materia.nombre}</TableCell>
              <TableCell className="font-bold">{materia.promedio.toFixed(1)}</TableCell>
              {materia.notas.map((n, i) => ( 
                <TableCell className="text-center" key={i}>
                  {n}
                </TableCell>
              ))}
              {/* Rellenar celdas vacías si hay un número desigual de notas */}
              {Array.from({ length: maxNotasCount - materia.notas.length }).map((_, i) => (
                <TableCell key={`empty-${i}`} className="text-center text-muted-foreground">-</TableCell>
              ))}
              {/* Para la Nota Final, se puede usar el promedio redondeado si no hay una nota final explícita */}
              <TableCell className="text-center font-semibold text-lg">{materia.promedio.toFixed(0)}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Materias</TableCell>
            {/* Se suma 1 a maxNotasCount para incluir la columna de Nota Final */}
            <TableCell colSpan={maxNotasCount + 1}>{materias.length}</TableCell> 
          </TableRow>
        </TableFooter>
      </Table>
    </article>
  );
}

// ---- Skeleton Loader ----
function SkeletonLoader() {
  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-sm rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-4 w-[150px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[120px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[80px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[80px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[80px] rounded" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(5).fill(null).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-4 w-[100px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px] rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}