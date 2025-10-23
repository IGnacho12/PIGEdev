import useFetch from "@/hooks/useFetch";

export default function useStudentsByCourse(course) {
  // Si no hay curso válido, devolvés un array vacío sin llamar al fetch

  const [curso, division] = course.split(" ");

  const { data } = useFetch(
    `/api/getStudentByClass?class=${curso}&section=${division}`
  );

  return { students: data || [] };
}
