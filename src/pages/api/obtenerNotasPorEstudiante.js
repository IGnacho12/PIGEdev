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
  n.id_nota,
  n.id_estudiante,
  m.nombre AS materia,
  n.nota1,
  n.nota2,
  n.nota3,
  n.nota_final,
  CASE 
    WHEN c.curso >= '4' THEN 'Cuatrimestre'
    ELSE 'Trimestre'
  END AS periodo
FROM public.notas n
JOIN public.materias m ON n.id_materia = m.id_materia
JOIN public.estudiantes e ON n.id_estudiante = e.id_estudiante
JOIN public.cursos c ON e.id_curso = c.id_curso
WHERE e.nombre ILIKE ${`%${name}%`}
ORDER BY m.id_materia
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
