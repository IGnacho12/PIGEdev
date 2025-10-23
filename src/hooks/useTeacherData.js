import useFetch from "@/hooks/useFetch";

export default function useTeacherData(teacherName) {
  const { data } = useFetch(
    teacherName ? `/api/getTeacherInfoByName?name=${teacherName}` : null
  );
  const teacher = Array.isArray(data) ? data[0] : data;
  const subjects = teacher?.subjects
    ? Array.isArray(teacher.subjects)
      ? teacher.subjects
      : [teacher.subjects]
    : [];
  return { teacher, subjects };
}
