import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import ProgressCircle from "./ProgressCircle";
import useFetch from "@/hooks/useFetch";

export default function Attendance({ name }) {
  const { data, loading, error } = useFetch(
    `/api/getAttendanceByStudent?name=${name}`
  );

  if (loading)
    return <p className="text-center mt-10 text-sm text-gray-500">Cargando...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error al cargar la asistencia
      </p>
    );
  if (!data) return null;

  const { resumen, attendance } = data;

  // 🧮 Calcular resumen general
  const general = resumen.reduce(
    (acc, m) => {
      acc.totales += m.totales;
      acc.presentes += m.presentes;
      acc.tardanzas += m.tardanzas;
      acc.ausentes += m.ausentes;
      return acc;
    },
    { totales: 0, presentes: 0, tardanzas: 0, ausentes: 0 }
  );

  general.porcentaje = Math.round(
    ((general.presentes + general.tardanzas * 0.5) / general.totales) * 100
  );

  return (
    <div className="w-full xl:w-4/5 mx-auto mt-10 flex flex-col gap-8 mb-40">
      <main className="flex flex-col xl:flex-row justify-around gap-10">
        {/* ===== Asistencia general ===== */}
        <section className="flex flex-col px-5 py-2 rounded-2xl shadow-(--inset-shadow-sm) bg-(--bg-light) dark:bg-(--bg-dark)">
          <header className="flex flex-col justify-between">
            <h1 className="text-lg text-center">ASISTENCIA GENERAL</h1>
          </header>

          <article>
            <ProgressCircle percentage={general.porcentaje} />

            <div className="text-sm text-text-muted w-full mt-2">
              <p>Clases totales: {general.totales}</p>
              <p>Presentes: {general.presentes}</p>
              <p>Tardanzas: {general.tardanzas}</p>
              <p>Ausentes: {general.ausentes}</p>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Para aprobar necesitás una asistencia mayor al 80%
            </p>
          </article>
        </section>

        {/* ===== Tabla por materia ===== */}
        <section className="flex flex-col px-5 py-2 rounded-2xl shadow-(--inset-shadow-sm) bg-(--bg-light) dark:bg-(--bg-dark)">
          <Table>
            <TableHeader>
              <TableRow className="text-center">
                <TableHead>Materia</TableHead>
                <TableHead className="font-semibold text-text">Promedio</TableHead>
                <TableHead>Clases totales</TableHead>
                <TableHead>Presentes</TableHead>
                <TableHead>Tardanzas</TableHead>
                <TableHead>Ausentes</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {resumen.map((m, i) => (
                <TableRow className="text-center" key={i}>
                  <TableCell className="text-left">{m.subject}</TableCell>
                  <TableCell className="font-semibold text-text">
                    {m.porcentaje}%
                  </TableCell>
                  <TableCell>{m.totales}</TableCell>
                  <TableCell>{m.presentes}</TableCell>
                  <TableCell>{m.tardanzas}</TableCell>
                  <TableCell>{m.ausentes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
