export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

// GET /api/getAttendanceByStudent
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

    // Obtener información del profesor, que materias cursa, en que cursos da clases y sus datos.
    const response = await consulta`
SELECT 
  t.name AS name,
  array_agg(s.name) AS subjects
FROM 
  teacher_subjects ts
JOIN 
  teachers t ON t.id_teacher = ts.teacher_id
JOIN 
  subjects s ON s.id_subject = ts.subject_id
WHERE t.name = ${`%${name}%`}
GROUP BY t.name;

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
