import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableHeader, TableHead, TableRow, TableBody, TableCell,
} from "@/components/ui/table";
import ReflectionButton from "@/components/shared/buttonsIbelic/reflectionButton";
import useTeacherData from "@/hooks/useTeacherData";
import useStudentsByCourse from "@/hooks/useStudentsByCourse";

export default function GradesPage() {
  const [teacherName, setTeacherName] = useState("");
  const [course, setCourse] = useState("ninguno");
  const [subject, setSubject] = useState("ninguno");
  const [grades, setGrades] = useState([]);

  // Obtener profesor desde URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTeacherName(params.get("name") || "");
  }, []);

  // Info del profesor
  const { teacher, subjects } = useTeacherData(teacherName);

  // Estudiantes por curso
  const { students } = useStudentsByCourse(course);

  // Formatear estructura de notas
  useEffect(() => {
    if (!students?.length) return;
    const formatted = students.map((s) => ({
      id: s.id,
      name: s.name,
      nota1: "",
      nota2: "",
      notaFinal: "",
    }));
    setGrades(formatted);
  }, [students]);

  const handleChange = (id, field, value) =>
    setGrades((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)));

  const handleSave = () => console.log("Notas guardadas:", grades);

  const isDisabled = course === "ninguno" || subject === "ninguno";

  return (
    <main className="flex flex-col items-center w-full p-8 space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Notas</h1>
      <h2>Profesor: {teacherName}</h2>

      {/* Selects */}
      <div className="flex gap-4">
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ninguno">Ninguno</SelectItem>
            {[...Array(7)].map((_, y) =>
              ["I", "II", "III", "IV", "V"].map((div) => (
                <SelectItem key={`${y + 1}${div}`} value={`${y + 1}º ${div}`}>
                  {y + 1}°{div}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar materia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ninguno">Ninguno</SelectItem>
            {subjects.map((subj) => (
              <SelectItem key={subj} value={subj}>
                {subj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="relative w-2/3 mt-6">
        {isDisabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300">
            <p className="text-gray-600 font-medium">
              Seleccioná un curso y una materia válidos para continuar
            </p>
          </div>
        )}

        <Table
          className={`${
            isDisabled ? "opacity-20 pointer-events-none" : ""
          } bg-[var(--bg-light)] border border-text-muted/30`}
        >
          <TableHeader>
            <TableRow>
              <TableHead>Alumno</TableHead>
              <TableHead>Nota 1</TableHead>
              <TableHead>Nota 2</TableHead>
              <TableHead>Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map(({ id, name, nota1, nota2, notaFinal }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <Input
                    value={nota1}
                    onChange={(e) => handleChange(id, "nota1", e.target.value)}
                    className="w-20 text-center"
                    disabled={isDisabled}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={nota2}
                    onChange={(e) => handleChange(id, "nota2", e.target.value)}
                    className="w-20 text-center"
                    disabled={isDisabled}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={notaFinal}
                    onChange={(e) =>
                      handleChange(id, "notaFinal", e.target.value)
                    }
                    className="w-20 text-center"
                    disabled={isDisabled}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ReflectionButton onClick={handleSave} disabled={isDisabled}>
        Guardar Notas
      </ReflectionButton>
    </main>
  );
}
