import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import useTeacherData from "@/hooks/useTeacherData";
import useStudentsGradesByClass from "@/hooks/useStudentsGradeByClass";
import TableGrade from "./grades/TableGrades";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Info, CloudUpload } from "lucide-react";

export default function GradesPage() {
  const [teacherName, setTeacherName] = useState("");
  const [course, setCourse] = useState("ninguno");
  console.log(course)
  const [subject, setSubject] = useState("ninguno");
  const [typeGrade, setTypeGrade] = useState("trimestre");

  // Obtener profesor desde URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTeacherName(params.get("name") || "");
  }, []);

  // Info del profesor
  const { teacher, subjects } = useTeacherData(teacherName);

  // Selecciona automáticamente la materia si solo hay una
  useEffect(() => {
    if (subjects.length === 1) setSubject(subjects[0]);
  }, [subjects]);

  // Hook para traer estudiantes del curso seleccionado
const { students, loading, error } = useStudentsGradesByClass(course);
console.log(students)


  const isDisabled = course === "ninguno" || subject === "ninguno";

  const handleSave = async () => {
    if (isDisabled) return;

    try {
      const selectedSubject = teacher.subjects.find((s) => s === subject);
      const id_subject = selectedSubject?.id_subject || null;

      if (!id_subject) throw new Error("No se encontró id de la materia");

      // Mapear alumnos a formato de tabla
      const payload = students.map((g) => ({
        id_student: g.id, // Asegurate de que use el id real si existe
        id_subject,
        type_grade: typeGrade,
        grade: parseFloat(g.definitiva) || 0, // O cualquier campo que uses
      }));

      const res = await fetch("/api/saveGrades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar notas");
      alert("Notas guardadas correctamente!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center w-full p-8 space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Notas</h1>
      <h2>Profesor: {teacherName}</h2>

      {/* Selects */}
      <div className="flex gap-4">
        <Select id="selectClass" value={course} onValueChange={setCourse}>
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
            {subjects.length > 1 && <SelectItem value="ninguno">Ninguno</SelectItem>}
            {subjects.map((subj) => (
              <SelectItem key={subj} value={subj}>
                {subj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Tabla de Notas</h3>
        <HoverCard>
          <HoverCardTrigger>
            <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent className="w-64 text-sm text-gray-700">
            Cada fila representa un alumno del curso seleccionado. <br />-
            Ingresa la nota numérica correspondiente en la columna "Nota". <br />
            - Tipo de nota: selecciona si es Trimestre o Cuatrimestre. <br />
            - Período: indica el período de la nota (1, 2, etc). <br />
            Al hacer click en "Guardar Notas", se enviarán todos los valores al
            backend y se guardarán en la tabla <strong>grades</strong>.
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="relative mt-6 w-full">
        <TableGrade students={students} type={typeGrade} />
      </div>

      <button
        onClick={handleSave}
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-200 hover:scale-105 active:scale-90 transition-all hover:cursor-pointer"
      >
        <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
          Guardar cambios
        </div>
        <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
          <CloudUpload />
        </div>
      </button>
    </main>
  );
}
