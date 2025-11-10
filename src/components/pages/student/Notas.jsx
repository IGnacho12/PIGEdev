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
  const { data: grades = [], loading } = useFetch(
    `/api/obtenerNotasPorEstudiante?name=${nombre}`
  );

  if (loading) return <SkeletonLoader />;
  if (!grades.length)
    return (
      <p className="text-center">No se encontraron notas para este alumno.</p>
    );

  const periodo = grades[0]?.periodo || "Trimestre";

  const columnas =
    periodo === "Cuatrimestre"
      ? ["Materia", "1° Cuatrimestre", "2° Cuatrimestre", "Promedio Final"]
      : [
          "Materia",
          "1° Trimestre",
          "2° Trimestre",
          "3° Trimestre",
          "Promedio Final",
        ];

  return (
    <>
      <h2 className="w-full xl:w-3/5 mx-auto mb-2 font-bold text-3xl">Tabla de notas</h2>

      <article className="w-full xl:w-3/5 mx-auto shadow-sm rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
        <Table>
          <TableHeader>
            <TableRow>
              {columnas.map((col, i) => (
                <TableHead key={i} className={i > 0 ? "text-center" : ""}>
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {grades.map((fila) => (
              <TableRow key={fila.id_nota}>
                <TableCell>{fila.materia}</TableCell>

                {periodo === "Cuatrimestre" ? (
                  <>
                    <TableCell className="text-center">
                      {Number(fila.nota1).toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      {Number(fila.nota2).toFixed(1)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="text-center">
                      {Number(fila.nota1).toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      {Number(fila.nota2).toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      {Number(fila.nota3).toFixed(1)}
                    </TableCell>
                  </>
                )}

                <TableCell className="font-bold text-center">
                  {Number(fila.nota_final).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total Materias</TableCell>
              <TableCell colSpan={columnas.length - 2}>
                {grades.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </article>
    </>
  );
}

// ---- Skeleton Loader ----
function SkeletonLoader() {
  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-sm rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Materia",
              "1° Trimestre",
              "2° Trimestre",
              "3° Trimestre",
              "Promedio",
            ].map((t, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-[100px] rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(4).fill(null).map((_, idx) => (
            <TableRow key={idx}>
              {new Array(5).fill(null).map((_, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-4 w-[80px] rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}
