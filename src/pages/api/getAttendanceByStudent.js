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

    // Traer todas las asistencias del alumno
    const asistencias = await consulta`
      SELECT 
        a.id_asistencia AS id_asistencia,
        st.nombre AS estudiante,
        sub.nombre AS materia,
        a.fecha AS fecha,
        a.estado AS estado,
        a.hora AS hora
      FROM asistencias a
      JOIN estudiantes st ON a.id_estudiante = st.id_estudiante
      JOIN materias sub ON a.id_materia = sub.id_materia
      WHERE st.nombre ILIKE ${`%${name}%`}
      ORDER BY a.fecha DESC;
    `;

    // Procesar el resumen por materia
    const summaryMap = {};

    for (const a of asistencias) {
      const materia = a.materia;
      if (!summaryMap[materia]) {
        summaryMap[materia] = {
          materia,
          totales: 0,
          presentes: 0,
          tardanzas: 0,
          ausentes: 0,
        };
      }

      summaryMap[materia].totales++;

      if (a.estado === "presente") summaryMap[materia].presentes++;
      else if (a.estado === "tarde") summaryMap[materia].tardanzas++;
      else if (a.estado === "ausente") summaryMap[materia].ausentes++;
    }

    const resumen = Object.values(summaryMap).map((m) => ({
      ...m,
      porcentaje: Math.round(
        ((m.presentes + m.tardanzas * 0.5) / m.totales) * 100
      ),
    }));

    return new Response(
      JSON.stringify({
        resumen,
        asistencias, // Nombre de la clave de respuesta ajustado a español
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
