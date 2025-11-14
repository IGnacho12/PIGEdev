// /src/pages/api/registrarAsistencia.ts
export const prerender = false;

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET({ request }) {
  // --------------------
  // CORS PERMITIDO PARA TODOS
  // --------------------
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // OPTIONS REQUEST (preflight)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const url = new URL(request.url);
    const id_estudiante = url.searchParams.get("id_estudiante");

    if (!id_estudiante) {
      return new Response(
        JSON.stringify({ error: "Falta el parámetro id_estudiante" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // -----------------------------------
    // id_materia fijo por ahora (puedes adaptarlo)
    // -----------------------------------
    const id_materia = 1;

    // Hora actual en formato HH:MM:SS
    const ahora = new Date();
    const horaActual = ahora.toTimeString().split(" ")[0];

    // -----------------------------------
    // INSERT EN LA TABLA asistencias
    // -----------------------------------
    await consulta`
      INSERT INTO asistencias 
        (id_estudiante, id_materia, estado, hora)
      VALUES 
        (${id_estudiante}, ${id_materia}, 'presente', ${horaActual});
    `;

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Asistencia registrada correctamente",
        data: {
          id_estudiante,
          id_materia,
          estado: "presente",
          hora: horaActual,
        },
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error registrando asistencia:", error);

    return new Response(
      JSON.stringify({ error: "Error en el servidor", detalle: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
