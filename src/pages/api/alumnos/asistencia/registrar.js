import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

// Normaliza y valida estado
const normalizarEstado = (s) => {
  if (!s) return null;
  const low = String(s).toLowerCase();
  if (low === "tardanza") return "tarde"; // tu UI usa "tardanza", DB espera "tarde"
  if (low === "tarde" || low === "presente" || low === "ausente") return low;
  return null;
};

export async function POST({ request }) {
  try {
    const datos = await request.json();

    if (!Array.isArray(datos) || datos.length === 0) {
      return new Response(JSON.stringify({ error: "Payload inválido o vacío." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validación básica
    for (const item of datos) {
      if (typeof item.id_estudiante !== "number" && !/^\d+$/.test(String(item.id_estudiante))) {
        return new Response(JSON.stringify({ error: "id_estudiante inválido en alguno de los elementos." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const estadoNormal = normalizarEstado(item.estado);
      if (!estadoNormal) {
        return new Response(JSON.stringify({ error: `Estado inválido para id_estudiante ${item.id_estudiante}.` }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Iniciamos transacción
    await consulta`BEGIN`;

    const resultados = [];

    for (const item of datos) {
      const idEstudiante = Number(item.id_estudiante);
      // Si viene id_materia, úsalo; si no, buscamos por nombre en la tabla materias
      let idMateria = null;
      if (item.id_materia && !isNaN(Number(item.id_materia))) {
        idMateria = Number(item.id_materia);
      } else if (item.materia) {
        // Buscar id_materia por nombre (case-insensitive)
        const materiaRows = await consulta`
          SELECT id_materia
          FROM materias
          WHERE lower(nombre) = lower(${String(item.materia)})
          LIMIT 1
        `;
        if (!materiaRows || materiaRows.length === 0) {
          // Si no existe la materia, hacemos rollback y devolvemos error
          await consulta`ROLLBACK`;
          return new Response(
            JSON.stringify({
              error: `Materia "${item.materia}" no encontrada en la base (id_estudiante ${idEstudiante}).`,
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        idMateria = materiaRows[0].id_materia;
      } else {
        await consulta`ROLLBACK`;
        return new Response(
          JSON.stringify({
            error: `Falta id_materia o materia (por nombre) para id_estudiante ${idEstudiante}.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Normalizar estado
      const estado = normalizarEstado(item.estado);

      // Fecha: esperamos "YYYY-MM-DD" en item.fecha; si no viene, usamos NOW() (pero ideal que venga)
      const fechaStr = item.fecha ? String(item.fecha) : null;
      // Hora: puede venir null; si estado === "tarde" y no viene hora, usamos hora actual
      let hora = item.hora ?? null;
      if (estado === "tarde" && !hora) {
        // hora en formato HH:MM:SS
        hora = new Date().toTimeString().split(" ")[0];
      }

      // Eliminamos registros previos del mismo día para evitar duplicados
      // comparamos por fecha::date
      if (fechaStr) {
        await consulta`
          DELETE FROM asistencias
          WHERE id_estudiante = ${idEstudiante}
            AND id_materia = ${idMateria}
            AND fecha::date = ${fechaStr}::date
        `;
      } else {
        // Si no se envía fecha, borramos cualquier registro del mismo día (hoy)
        const hoy = new Date().toISOString().split("T")[0];
        await consulta`
          DELETE FROM asistencias
          WHERE id_estudiante = ${idEstudiante}
            AND id_materia = ${idMateria}
            AND fecha::date = ${hoy}::date
        `;
      }

      // Insertamos la nueva asistencia
      // Si no se envía fecha, usamos now(); si se envía, lo casteamos a timestamp
      if (fechaStr) {
        await consulta`
          INSERT INTO asistencias (id_estudiante, id_materia, fecha, estado, hora)
          VALUES (${idEstudiante}, ${idMateria}, ${fechaStr}::timestamp, ${estado}, ${hora})
        `;
      } else {
        await consulta`
          INSERT INTO asistencias (id_estudiante, id_materia, fecha, estado, hora)
          VALUES (${idEstudiante}, ${idMateria}, now(), ${estado}, ${hora})
        `;
      }

      resultados.push({ id_estudiante: idEstudiante, id_materia: idMateria, estado, fecha: fechaStr ?? "NOW()", hora });
    }

    // Commit
    await consulta`COMMIT`;

    return new Response(
      JSON.stringify({ message: "Asistencias guardadas con éxito.", resultados }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error guardando asistencias:", error);
    try {
      await consulta`ROLLBACK`;
    } catch (e) {
      console.error("Error al hacer rollback:", e);
    }

    // Para que no de problemas llamar a esta api desde Reconocimiento Facial 
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",        // permite acceso desde cualquier origen
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
  }
}

// CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
