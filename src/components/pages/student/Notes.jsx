import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

export default function Notes({ notas = [], loading }) {
  if (loading) return <SkeletonLoader />;
  if (!notas.length) return <p>No se encontraron notas para este alumno.</p>;

  // Agrupar notas por materia
  const materiasMap = {};
  notas.forEach((nota) => {
    if (!materiasMap[nota.materia]) materiasMap[nota.materia] = [];
    materiasMap[nota.materia].push(nota.nota);
  });

  const materias = Object.entries(materiasMap).map(([nombre, notas]) => ({
    nombre,
    notas,
    promedio: notas.reduce((acc, n) => acc + Number(n), 0) / notas.length,
  }));

  const maxNotas = Math.max(...materias.map((m) => m.notas.length));

  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-(--inset-shadow-sm) rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Materia</TableHead>
            <TableHead>Promedio Actual</TableHead>
            {Array.from({ length: maxNotas }).map((_, i) => (
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
              <TableCell className="font-bold">
                {materia.promedio.toFixed(1)}
              </TableCell>
              {materia.notas.map((n, i) => (
                <TableCell className="text-center" key={i}>
                  {n}
                </TableCell>
              ))}
              <TableCell className="text-center">
                {materia.promedio.toFixed(0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Materias</TableCell>
            <TableCell colSpan={maxNotas + 1}>{materias.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </article>
  );
}

function SkeletonLoader() {
  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-(--inset-shadow-sm) rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}
