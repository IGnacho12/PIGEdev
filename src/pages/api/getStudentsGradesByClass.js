// /api/getStudentsGradesByClass.js
export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const CLASS = url.searchParams.get("class"); // ej: "1º"
    const SECTION = url.searchParams.get("section"); // ej: "I"

    if (!CLASS || !SECTION) {
      return new Response(
        JSON.stringify({ error: "Missing class or section parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Traer alumnos y notas con asistencia
    const studentsData = await consulta`
    SELECT
  s.id_estudiante AS id_estudiante, 
  s.nombre AS nombre,            

  COALESCE(MAX(CASE WHEN g.periodo = 1 THEN g.calificacion END), 0) AS nota1,
  COALESCE(MAX(CASE WHEN g.periodo = 2 THEN g.calificacion END), 0) AS nota2,
  COALESCE(MAX(CASE WHEN g.periodo = 3 THEN g.calificacion END), 0) AS nota3,
  COALESCE(MAX(CASE WHEN g.periodo = 0 THEN g.calificacion END), 0) AS nota_final,

  COALESCE(COUNT(DISTINCT a.id_asistencia), 0) AS clases_totales,
  COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'presente' THEN a.id_asistencia END), 0) AS presentes,
  COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'ausente' THEN a.id_asistencia END), 0) AS ausentes,
  COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'tarde' THEN a.id_asistencia END), 0) AS tardanzas

FROM estudiantes s                       
LEFT JOIN notas g ON s.id_estudiante = g.id_estudiante    
LEFT JOIN cursos c ON s.id_curso = c.id_curso
LEFT JOIN asistencias a ON s.id_estudiante = a.id_estudiante  
WHERE c.curso = ${CLASS}
  AND c.division = ${SECTION}
GROUP BY s.id_estudiante, s.nombre
ORDER BY s.nombre;
    `;

    return new Response(JSON.stringify(studentsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
