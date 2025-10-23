import useFetch from "@/hooks/useFetch";

export default function useStudentsByCourse(course) {
  if (!course || course === "ninguno") return { students: [] };
  const [curso, division] = course.split(" ");
  const { data } = useFetch(
    `/api/getStudentByClass?class=${curso}&section=${division}`
  );
  return { students: data || [] };
}
