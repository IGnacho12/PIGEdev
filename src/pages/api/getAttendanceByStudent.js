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

    // Traer todas las asistencias del alumno
    const attendance = await consulta`
      SELECT 
        a.id_attendance,
        st.name AS student,
        sub.name AS subject,
        a.date,
        a.status,
        a.time
      FROM attendance a
      JOIN students st ON a.id_student = st.id
      JOIN subjects sub ON a.id_subject = sub.id_subject
      WHERE st.name ILIKE ${`%${name}%`}
      ORDER BY a.date DESC;
    `;

    // Procesar el resumen por materia
    const summaryMap = {};

    for (const a of attendance) {
      const subject = a.subject;
      if (!summaryMap[subject]) {
        summaryMap[subject] = {
          subject,
          totales: 0,
          presentes: 0,
          tardanzas: 0,
          ausentes: 0,
        };
      }

      summaryMap[subject].totales++;

      if (a.status === "present") summaryMap[subject].presentes++;
      else if (a.status === "late") summaryMap[subject].tardanzas++;
      else if (a.status === "absent") summaryMap[subject].ausentes++;
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
        attendance,
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
