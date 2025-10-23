export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

// GET /api/getAttendanceByStudent
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const CLASS = url.searchParams.get("class") || "1º";
    const SECTION = url.searchParams.get("section") || "I";

    if (!CLASS) {
      return new Response(
        JSON.stringify({
          error: "El parámetro 'classAndSection' es requerido",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Obtener información del profesor, que materias cursa, en que cursos da clases y sus datos.
    const response = await consulta`
          SELECT 
          s.id,
          s.name,
          s.dni,
          s.avatar,
          c.curso,
          c.division
          FROM 
          students s
          JOIN 
          cursos c ON s.id_curso = c.id_curso
          WHERE 
          c.curso = ${CLASS}    -- reemplaza con el curso deseado
          AND c.division = ${SECTION} -- reemplaza con la división deseada
          ORDER BY 
          s.name;

    `;
    // teacher.name -> Nombre del profe
    // teacher.subjects -> Materias que da el profesor

    return new Response(JSON.stringify(response));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
