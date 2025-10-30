// /api/obtenerNotasDeUnCurso.js
export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const cursoYDivision = url.searchParams.get("curso_y_division"); // ej: "1º I"

    if (!cursoYDivision) {
      return new Response(
        JSON.stringify({ error: "Missing curso_y_division parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [CLASS, SECTION] = cursoYDivision.split(" ");

    if (!CLASS || !SECTION) {
      return new Response(
        JSON.stringify({ error: "Invalid curso_y_division format. Expected '1º I'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Query adaptada al nuevo modelo de la tabla notas
    const studentsData = await consulta`
      SELECT
        s.id_estudiante AS id_estudiante,
        s.nombre AS nombre,
        COALESCE(AVG(n.nota1), 0) AS nota1,
        COALESCE(AVG(n.nota2), 0) AS nota2,
        COALESCE(AVG(n.nota3), 0) AS nota3,
        COALESCE(AVG(n.nota_final), 0) AS nota_final,
        COALESCE(COUNT(DISTINCT a.id_asistencia), 0) AS clases_totales,
        COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'presente' THEN a.id_asistencia END), 0) AS presentes,
        COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'ausente' THEN a.id_asistencia END), 0) AS ausentes,
        COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'tarde' THEN a.id_asistencia END), 0) AS tardanzas
      FROM estudiantes s
      LEFT JOIN cursos c ON s.id_curso = c.id_curso
      LEFT JOIN notas n ON s.id_estudiante = n.id_estudiante
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
