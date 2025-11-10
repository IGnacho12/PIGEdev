// /api/obtenerNotasDeUnaMateria.js
export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

/**
 * Endpoint para obtener las notas y asistencias de estudiantes para una MATERIA específica
 * dentro de un CURSO y DIVISION.
 * * Parámetros esperados en la URL:
 * - curso_y_division: ej: "1º I"
 * - materia_nombre: ej: "Matemáticas"
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const cursoYDivision = url.searchParams.get("curso_y_division"); // ej: "1º I"
    const materiaNombre = url.searchParams.get("materia_nombre");   // ej: "Literatura"

    if (!cursoYDivision || !materiaNombre) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required parameters: curso_y_division and materia_nombre" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [CLASS, SECTION] = cursoYDivision.split(" ");

    if (!CLASS || !SECTION) {
      return new Response(
        JSON.stringify({
          error: "Invalid curso_y_division format. Expected '1º I'",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 💡 La clave es filtrar las notas y asistencias por el id_materia
    // 💡 También usamos el JOIN a la tabla 'materias' para obtener el id_materia
    const studentsData = await consulta`
        SELECT
            s.id_estudiante AS id_estudiante,
            s.nombre AS nombre,
            COALESCE(MAX(n.nota1), 0) AS nota1,
            COALESCE(MAX(n.nota2), 0) AS nota2,
            COALESCE(MAX(n.nota3), 0) AS nota3,
            COALESCE(MAX(n.nota_final), 0) AS nota_final, -- Usar MAX() para nota_final, ya que es única por estudiante/materia
            
            -- Las asistencias DEBEN filtrarse por la materia para ser precisas
            COALESCE(COUNT(DISTINCT a.id_asistencia), 0) AS clases_totales,
            COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'presente' THEN a.id_asistencia END), 0) AS presentes,
            COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'ausente' THEN a.id_asistencia END), 0) AS ausentes,
            COALESCE(COUNT(DISTINCT CASE WHEN a.estado = 'tarde' THEN a.id_asistencia END), 0) AS tardanzas
        FROM estudiantes s
        LEFT JOIN cursos c ON s.id_curso = c.id_curso
        
        -- Obtener el ID de la materia
        LEFT JOIN materias m ON m.nombre = ${materiaNombre}
        
        -- Unir notas SOLO para esta materia
        LEFT JOIN notas n ON s.id_estudiante = n.id_estudiante AND n.id_materia = m.id_materia
        
        -- Unir asistencias SOLO para esta materia
        LEFT JOIN asistencias a ON s.id_estudiante = a.id_estudiante AND a.id_materia = m.id_materia
        
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
    console.error("Error fetching subject grades:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}