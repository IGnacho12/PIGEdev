export const prerender = false;

const DATABASE_URL =
  "postgresql://neondb_owner:npg_n5Ip3uZmotNh@ep-blue-thunder-adoo95lz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
import { neon } from "@neondatabase/serverless";

const consulta = neon(DATABASE_URL);

// GET /api/getGradesByStudent?name=Ignacio
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
        g.id_grade,
        g.id_student,
        s.name AS subject,
        g.type_grade,
        g.period,
        g.grade
      FROM grades g
      JOIN subjects s ON g.id_subject = s.id_subject
      JOIN students st ON g.id_student = st.id
      WHERE st.name ILIKE ${`%${name}%`}
      ORDER BY g.id_subject, g.period;
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
