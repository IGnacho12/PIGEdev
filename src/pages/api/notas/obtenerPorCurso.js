// /api/obtenerNotasDeUnCursoYMateria.js
export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const cursoYDivision = url.searchParams.get("curso_y_division"); // ej: "1º I"
    const nombreMateria = url.searchParams.get("materia"); // ej: "Matemática"

    if (!cursoYDivision || !nombreMateria) {
      return new Response(
        JSON.stringify({ error: "Faltan parámetros: curso_y_division o materia" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [CLASS, SECTION] = cursoYDivision.split(" ");
    if (!CLASS || !SECTION) {
      return new Response(
        JSON.stringify({ error: "Formato inválido. Se esperaba '1º I'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Obtener el id_materia desde el nombre
    const materiaData = await consulta`
      SELECT id_materia FROM materias WHERE nombre = ${nombreMateria} LIMIT 1;
    `;

    if (materiaData.length === 0) {
      return new Response(
        JSON.stringify({ error: `No se encontró la materia: ${nombreMateria}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const idMateria = materiaData[0].id_materia;

    // 🔹 Consulta principal (igual a antes, pero usando idMateria)
    const studentsData = await consulta`
      SELECT
        s.id_estudiante AS id_estudiante,
        s.nombre AS nombre,
        n.id_nota AS id_nota,
         ${idMateria} AS id_materia,
        COALESCE(n.nota1, 0) AS nota1,
        COALESCE(n.nota2, 0) AS nota2,
        COALESCE(n.nota3, 0) AS nota3,
        COALESCE(n.nota_final, 0) AS nota_final,
        COALESCE(COUNT(DISTINCT a.id_asistencia), 0) AS clases_totales,
        COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'presente' THEN a.id_asistencia END), 0) AS presentes,
        COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'ausente' THEN a.id_asistencia END), 0) AS ausentes,
        COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'tarde' THEN a.id_asistencia END), 0) AS tardanzas
      FROM estudiantes s
      JOIN cursos c ON s.id_curso = c.id_curso
      LEFT JOIN notas n 
        ON s.id_estudiante = n.id_estudiante
        AND n.id_materia = ${idMateria}
      LEFT JOIN asistencias a 
        ON s.id_estudiante = a.id_estudiante
        AND a.id_materia = ${idMateria}
      WHERE c.curso = ${CLASS}
        AND c.division = ${SECTION}
      GROUP BY s.id_estudiante, s.nombre, n.id_nota, n.nota1, n.nota2, n.nota3, n.nota_final
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
