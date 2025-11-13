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
        JSON.stringify({ error: "Falta el parámetro: curso_y_division" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [curso, division] = cursoYDivision.split(" ");
    if (!curso || !division) {
      return new Response(
        JSON.stringify({ error: "Formato inválido. Se esperaba '1º I'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Obtener los estudiantes del curso
    const estudiantes = await consulta`
      SELECT 
        e.id_estudiante,
        e.nombre
      FROM estudiantes e
      JOIN cursos c ON e.id_curso = c.id_curso
      WHERE c.curso = ${curso} 
        AND c.division = ${division}
      ORDER BY e.nombre ASC;
    `;

    return new Response(JSON.stringify(estudiantes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error en /api/obtenerEstudiantesDeUnCurso:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los estudiantes", detalle: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
