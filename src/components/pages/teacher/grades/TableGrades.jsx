import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableGrade({ students = [], type = "trimestre" }) {
  // 🔄 Cambiado 'rows' a 'filas'
  const [filas, setFilas] = useState([]);

  useEffect(() => {
    // 🔄 Usamos 'filas' y 'students'
    setFilas(Array.isArray(students) ? students : []);
  }, [students]);

  const handleChange = (index, field, value) => {
    // 🔄 Cambiado 'updated' a 'actualizadas'
    const actualizadas = [...filas];
    actualizadas[index][field] = value === "" ? "" : Number(value);
    // 🔄 Usamos 'setFilas'
    setFilas(actualizadas);
  };

  // 🔄 Mantenemos la función en español (calcPromedio)
  const calcPromedio = (s) => {
    const n1 = Number(s.nota1) || 0;
    const n2 = Number(s.nota2) || 0;
    const n3 = Number(s.nota3) || 0;
    // La lógica de cálculo de promedio se mantiene
    return type === "cuatrimestre" ? (n1 + n2) / 2 : (n1 + n2 + n3) / 3;
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
            <TableHead className="text-center">
              Aprueba por asistencia
            </TableHead>
            <TableHead className="text-center">Promedio calculado</TableHead>
            <TableHead className="text-right">Calificación final</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* 🔄 Mapeamos sobre 'filas' */}
          {filas.map((s, i) => (
            <TableRow key={s.id_student}>
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

              {/* Porcentaje de Asistencia (Tardanzas = 1.0) -> CORRECTO */}
              <TableCell className="text-center">
                {Math.round(
                  ((Number(s.presentes) + Number(s.tardanzas)) / Number(s.clases_totales)) * 100
                )}%
              </TableCell>

              {/* Aprueba por asistencia (Tardanzas = 1.0) -> CORRECTO */}
              <TableCell className="text-center">
                {((Number(s.presentes) + Number(s.tardanzas)) / Number(s.clases_totales)) * 100 >= 80
                  ? "SI"
                  : "NO"}
              </TableCell>
              
              <TableCell className="text-center">
                {calcPromedio(s).toFixed(2)}
              </TableCell>

              <TableCell className="text-right">
                <InputNumber
                  // 🔄 Cambiado 'finalgrade' a 'notaFinal'
                  value={s.notaFinal} 
                  onChange={(e) =>
                    // 🔄 Cambiado 'finalgrade' a 'notaFinal'
                    handleChange(i, "notaFinal", e.target.value) 
                  }
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
      className={`w-16 p-1 border border-text-muted/20 rounded-lg px-2 py-1 transition shadow-sm hover:shadow-md text-center ${
        important ? "font-bold text-lg" : ""
      }`}
    />
  );
}