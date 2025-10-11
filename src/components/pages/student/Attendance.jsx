import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import ProgressCircle from "./ProgressCircle";

export default function Attendance() {
  const general = {
    porcentaje: 82,
    materia: "",
    totales: 50,
    presentes: 41,
    tardanzas: 3,
    ausentes: 6,
  };

  const materias = [
    {
      nombre: "Matemática",
      porcentaje: 85,
      totales: 50,
      presentes: 42,
      tardanzas: 3,
      ausentes: 5,
    },
    {
      nombre: "Lengua",
      porcentaje: 82,
      totales: 50,
      presentes: 41,
      tardanzas: 3,
      ausentes: 6,
    },
    {
      nombre: "Historia",
      porcentaje: 79,
      totales: 50,
      presentes: 39,
      tardanzas: 4,
      ausentes: 7,
    },
  ];

  return (
    <div className="w-full xl:w-4/5 mx-auto mt-10 flex flex-col gap-8 mb-40">
      <h1 className="text-center text-3xl font-bold tracking-wide">
        Asistencia
      </h1>

      <main className="flex flex-col xl:flex-row justify-around gap-10">
        <section className="flex flex-col shadow-lg px-5 py-2 rounded-2xl border border-text-muted/20 hover:border-text-muted/50 transition-colors">
          {/* Asistencia general */}
          <header className="flex flex-col justify-between">
            <h1 className="text-lg text-center">ASISTENCIA GENERAL</h1>
          </header>
          <article>
            {/* Círculo de progreso */}
            <ProgressCircle
            percentage={general.porcentaje}
            ></ProgressCircle>

            <div className="text-sm text-text-muted w-full">
              <p>Clases totales: {general.totales}</p>
              <p>Presentes: {general.presentes}</p>
              <p>Tardanzas: {general.tardanzas}</p>
              <p>Ausentes: {general.ausentes}</p>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Para poder aprobar necesitas una asistencia mayor al 80%
            </p>
          </article>
        </section>

        {/* Tabla de materias */}
        <section className="flex flex-col shadow-lg px-5 py-2 rounded-2xl border border-text-muted/20 hover:border-text-muted/50 transition-colors">
          <Table>
            <TableHeader>
              <TableRow className="text-center">
                <TableHead>Materia</TableHead>
                <TableHead className="w-[100px] font-semibold text-black">Promedio</TableHead>
                <TableHead>Clases totales</TableHead>
                <TableHead>Presentes</TableHead>
                <TableHead>Tardanzas</TableHead>
                <TableHead>Ausentes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materias.map((m, i) => (
                <TableRow className="text-center" key={i}>
                  <TableCell className="text-left">{m.nombre}</TableCell>
                  <TableCell className="font-semibold text-black">{m.porcentaje}%</TableCell>
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
