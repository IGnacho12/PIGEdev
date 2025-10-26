import useFetch from "@/hooks/useFetch";

export default function useTeacherData(teacherName) {
  const { data } = useFetch(
    teacherName ? `/api/getTeacherInfoByName?name=${teacherName}` : null
  );

  const profesor = Array.isArray(data) ? data[0] : data;
  
  const materias = profesor?.materias
    ? Array.isArray(profesor.materias)
      ? profesor.materias
      : [profesor.materias]
    : [];
    
  return { profesor, materias };
}