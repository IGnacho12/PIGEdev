export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

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

    const response = await consulta`
      SELECT 
        s.id_estudiante AS id_estudiante,
        s.nombre AS nombre,
        s.dni AS dni,
        s.avatar AS avatar,
        c.curso AS curso,
        c.division AS division
      FROM 
        estudiantes s
      JOIN 
        cursos c ON s.id_curso = c.id_curso
      WHERE 
        c.curso = ${CLASS}
        AND c.division = ${SECTION}
      ORDER BY 
        s.nombre;
    `;

    return new Response(JSON.stringify(response));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}