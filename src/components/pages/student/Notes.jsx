import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

export default function Notes({name = "ignacio"}) {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/getGradesByStudent?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        setNotas(data); // data es un array de objetos de la base
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando notas...</p>;
  if (!notas.length) return <p>No se encontraron notas para este alumno.</p>;

  // Agrupar notas por materia
  const materiasMap = {};
  notas.forEach((nota) => {
    if (!materiasMap[nota.materia]) {
      materiasMap[nota.materia] = [];
    }
    materiasMap[nota.materia].push(nota.nota);
  });

  const materias = Object.entries(materiasMap).map(([nombre, notas]) => ({
    nombre,
    notas,
    promedio:
      notas.reduce((acc, n) => acc + Number(n), 0) / notas.length,
  }));

  // Determinar máximo de notas por materia para la cabecera
  const maxNotas = Math.max(...materias.map((m) => m.notas.length));

  return (
    <article className="px-5 w-full xl:w-3/5 mx-auto">
      <Table className="border border-text-muted/20 hover:border-text-muted/50 transition-colors c">
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
