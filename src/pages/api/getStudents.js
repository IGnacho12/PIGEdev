import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET() {
  const response = await consulta`
    SELECT 
      s.nombre AS nombre,
      s.dni AS dni,
      s.id_estudiante AS id_estudiante,
      s.clave_acceso AS clave_acceso,
      s.avatar AS avatar,
      CONCAT(c.curso, ' ', c.division) AS curso_y_division
    FROM estudiantes s
    JOIN cursos c ON c.id_curso = s.id_curso;
  `;

  // Para que no de problemas llamar a esta api desde Reconocimiento Facial 
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",        // permite acceso desde cualquier origen
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}

// Para que no de problemas llamar a esta api desde Reconocimiento Facial
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
