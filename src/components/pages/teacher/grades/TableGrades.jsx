import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableGrade({  type = "trimestre" }) {
  const initialStudents = [
    { name: "Castillo Ignacio", nota1: 7, nota2: 8, nota3: 9, asistencia: 20, definitiva: 7 },
    { name: "Alumno 2", nota1: 6, nota2: 7, nota3: 8, asistencia: 90, definitiva: 7 },
    { name: "Alumno 3", nota1: 8, nota2: 9, nota3: 10, asistencia: 100, definitiva: 9 },
  ];

  const [students, setStudents] = useState(initialStudents);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value === "" ? "" : Number(value);
    setStudents(updated);
  };

  const anyPassAttendance = students.some((s) => s.asistencia >= 80);

  const calcPromedio = (s) => {
    if (type === "cuatrimestre") {
      return ((s.nota1 ?? 0) + (s.nota2 ?? 0)) / 2;
    } else {
      return ((s.nota1 ?? 0) + (s.nota2 ?? 0) + (s.nota3 ?? 0)) / 3;
    }
  };

  return (
    <article className="bg-[var(--bg-light)] mx-auto border border-text-muted/20">
      <Table>
        <TableHeader>
          <TableRow className="text-base">
            <TableHead className="text-left">Nombre del alumno</TableHead>
            {type === "cuatrimestre" ? (
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
            <TableHead className="text-center">% Asistencia</TableHead>
            {anyPassAttendance && <TableHead className="text-center">Aprueba por asistencia</TableHead>}
            <TableHead className="text-center">Promedio calculado</TableHead>
            <TableHead className="text-right">Calificación definitiva</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s, i) => (
            <TableRow key={i}>
              <TableCell>{s.name}</TableCell>

              {type === "cuatrimestre" ? (
                <>
                  <TableCell className="text-center">
                    <InputNumber
                      value={s.nota1}
                      onChange={(e) => handleChange(i, "nota1", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <InputNumber
                      value={s.nota2}
                      onChange={(e) => handleChange(i, "nota2", e.target.value)}
                    />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="text-center">
                    <InputNumber
                      value={s.nota1}
                      onChange={(e) => handleChange(i, "nota1", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <InputNumber
                      value={s.nota2}
                      onChange={(e) => handleChange(i, "nota2", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <InputNumber
                      value={s.nota3}
                      onChange={(e) => handleChange(i, "nota3", e.target.value)}
                    />
                  </TableCell>
                </>
              )}

              <TableCell className="text-center">{s.asistencia}%</TableCell>

              {anyPassAttendance && (
                <TableCell className="text-center">
                  {s.asistencia >= 80 ? "SI" : "NO"}
                </TableCell>
              )}

              <TableCell className="text-center">{calcPromedio(s).toFixed(2)}</TableCell>

              <TableCell className="text-right">
                <InputNumber
                  value={s.definitiva}
                  onChange={(e) => handleChange(i, "definitiva", e.target.value)}
                  important
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}

function InputNumber({ value = 0, onChange, important = false }) {
  return (
    <input
      type="number"
      min="0"
      max="10"
      value={value}
      onChange={onChange}
      className={`w-16 p-1 border border-text-muted/20 rounded-lg px-2 py-1 transition shadow-sm hover:shadow-md text-center ${important ? "font-bold text-lg" : ""}`}
    />
  );
}
