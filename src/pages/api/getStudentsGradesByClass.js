// /api/getStudentsGradesByClass.js
export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const CLASS = url.searchParams.get("class");      // ej: "1º"
    const SECTION = url.searchParams.get("section");  // ej: "I"

    if (!CLASS || !SECTION) {
      return new Response(
        JSON.stringify({ error: "Missing class or section parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Traer alumnos y notas con asistencia
   const studentsData = await consulta`
  SELECT
    s.id AS id_student,
    s.name AS name,
    COALESCE(MAX(CASE WHEN g.period = 1 THEN g.grade END), 0) AS nota1,
    COALESCE(MAX(CASE WHEN g.period = 2 THEN g.grade END), 0) AS nota2,
    COALESCE(MAX(CASE WHEN g.period = 3 THEN g.grade END), 0) AS nota3,
    COALESCE(MAX(CASE WHEN g.period = 0 THEN g.grade END), 0) AS finalGrade,
    COALESCE(COUNT(DISTINCT a.id_attendance), 0) AS attendance
  FROM students s
  LEFT JOIN grades g ON s.id = g.id_student
  LEFT JOIN cursos c ON s.id_curso = c.id_curso
  LEFT JOIN attendance a ON s.id = a.id_student
  WHERE c.curso = ${CLASS}
    AND c.division = ${SECTION}
  GROUP BY s.id, s.name
  ORDER BY s.name
`;

    return new Response(JSON.stringify(studentsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
