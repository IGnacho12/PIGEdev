import useFetch from "@/hooks/useFetch";

export default function useStudentsGradesByClass(course) {
  if (!course || course === "ninguno") return { estudiantes: [] };

  const [curso, division] = course.split(" ");

  const { data, error, loading } = useFetch(
    `/api/getStudentsGradesByClass?class=${curso}&section=${division}`
  );

  const estudiantes = (data || []).map((s) => ({
    id_estudiante: s.id_estudiante,
    nombre: s.nombre,
    // La normalización (?? 0) es crucial aquí:
    nota1: s.nota1 ?? 0,
    nota2: s.nota2 ?? 0,
    nota3: s.nota3 ?? 0,
    clases_totales: s.clases_totales ?? 0,
    nota_final: s.nota_final ?? 0,
  }));

  return { estudiantes, error, loading };
}