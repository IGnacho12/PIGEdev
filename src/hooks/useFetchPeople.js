import useFetch from "@/hooks/useFetch";

export default function useFetchPeople(type) {
  // Determinar endpoint solo cuando type es válido
  const endpoint =
    type === "estudiante"
      ? "/api/getStudents"
      : type === "profesor"
      ? "/api/getTeachers"
      : null;

  // Hook siempre llamado, el fetch solo ocurre si endpoint existe
  const { data, loading, error } = useFetch(endpoint);

  return { data, loading, error };
}
