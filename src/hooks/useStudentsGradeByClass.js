import useFetch from "@/hooks/useFetch";

export default function useStudentsGradesByClass(course) {
  if (!course || course === "ninguno") return { students: [] };

  const [curso, division] = course.split(" "); // ej: "1º I" -> ["1º", "I"]

  const { data, error, loading } = useFetch(
    `/api/getStudentsGradesByClass?class=${curso}&section=${division}`
  );

  // Transformar datos al formato que espera TableGrade
  const students = (data || []).map((s) => ({
    id: s.id_student,
    name: s.name,
    nota1: s.nota1 ?? 0,
    nota2: s.nota2 ?? 0,
    nota3: s.nota3 ?? 0,
    attendance: s.attendance ?? 0,
    definitiva: s.finalGrade ?? 0,
  }));

  return { students, error, loading };
}
