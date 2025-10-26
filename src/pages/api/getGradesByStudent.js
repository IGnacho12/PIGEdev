export const prerender = false;
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") || "";

    if (!name) {
      return new Response(
        JSON.stringify({ error: "El parámetro 'name' es requerido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Traer todas las notas del alumno por nombre
    const notas = await consulta`
      SELECT 
        g.id_nota AS id_nota,
        g.id_estudiante AS id_estudiante,
        s.nombre AS materia,
        g.periodo AS periodo,
        g.calificacion AS calificacion
      FROM notas g
      JOIN materias s ON g.id_materia = s.id_materia
      JOIN estudiantes st ON g.id_estudiante = st.id_estudiante
      WHERE st.nombre ILIKE ${`%${name}%`}
      ORDER BY g.id_materia, g.periodo;
    `;

    return new Response(JSON.stringify(notas), {
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