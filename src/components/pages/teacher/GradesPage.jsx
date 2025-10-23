import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import ReflectionButton from "@/components/shared/buttonsIbelic/reflectionButton";
import useFetch from "@/hooks/useFetch";
import { StrictMode } from "react";

export default function GradesPage({ name }) {
  const [course, setCourse] = useState("ninguno");
  const [subject, setSubject] = useState("ninguno");
  const [grades, setGrades] = useState([
    { id: 1, name: "Juan Pérez", nota1: "", nota2: "", notaFinal: "" },
    { id: 2, name: "Ana Gómez", nota1: "", nota2: "", notaFinal: "" },
  ]);

  const handleChange = (id, field, value) => {
    setGrades((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const handleSave = () => {
    console.log("Notas guardadas", grades);
  };

  if (!name) return;

  const {
    data: teacher = {},
    loading,
    error,
  } = useFetch(`/api/getTeacherInfoByName?name=${name}`);

  console.log("Informacion de karen anache", teacher)

  const teacherData = Array.isArray(teacher) ? teacher[0] : teacher;
  const subjectsArray = teacherData?.subjects
    ? Array.isArray(teacherData.subjects)
      ? teacherData.subjects
      : [teacherData.subjects]
    : [];

  const isDisabled = course === "ninguno" || subject === "ninguno";

  return (
    <StrictMode>
      <main className="flex flex-col items-center w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold">Gestión de Notas</h1>
        <h2>Para el profe {name}</h2>

        <div className="flex gap-4">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ninguno">Ninguno</SelectItem>
              <SelectItem value="1A">1°A</SelectItem>
              <SelectItem value="2B">2°B</SelectItem>
              <SelectItem value="3C">3°C</SelectItem>
            </SelectContent>
          </Select>

          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ninguno">Ninguno</SelectItem>
              {subjectsArray.map((subj) => (
                <SelectItem key={subj} value={subj}>
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
            } bg-[var(--bg-light)] dark:bg-[var(--bg-light)] border border-text-muted/30`}
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
                      onChange={(e) =>
                        handleChange(id, "nota1", e.target.value)
                      }
                      className="w-20 text-center"
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={nota2}
                      onChange={(e) =>
                        handleChange(id, "nota2", e.target.value)
                      }
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
    </StrictMode>
  );
}
