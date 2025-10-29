export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

// GET obtenerInfoDeProfesorPorNombre -> /api/obtenerInfoDeProfesorPorNombre?nombre={nombreProfesor}
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const nombre = url.searchParams.get("nombre") || "";

    if (!nombre) {
      return new Response(
        JSON.stringify({ error: "El parámetro 'nombre' es requerido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    console.log("nombre del profesor:", nombre);

    // Obtener información del profesor (nombre) y las materias que enseña.
    const response = await consulta`
    SELECT 
    t.nombre AS nombre,
    json_agg(s.nombre) AS materias
    FROM 
    profesores_materias ts
    JOIN 
    profesores t ON t.id_profesor = ts.id_profesor
    JOIN 
    materias s ON s.id_materia = ts.id_materia
    WHERE t.nombre = ${nombre}
    GROUP BY t.nombre;
    `;

    return new Response(JSON.stringify(response));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
