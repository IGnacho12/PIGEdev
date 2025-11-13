import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Inicializa la conexión a la base de datos
const consulta = neon(process.env.DATABASE_URL);

/**
 * Función auxiliar para convertir el valor de la nota:
 * - Si es una cadena vacía (""), devuelve NULL para la base de datos.
 * - Si tiene un valor (ej. "8.41"), lo convierte explícitamente a Number.
 * Esto evita errores 500 cuando la columna de la DB espera un tipo NUMÉRICO.
 */
const getValue = (val) => (val === "" ? null : Number(val));

/**
 * @method POST
 * @description Actualiza las notas de una lista de estudiantes en la base de datos.
 */
export async function POST({ request }) {
  try {
    // 1. Leer el cuerpo (body) de la petición POST
    const datosAGuardar = await request.json();
    console.log(datosAGuardar);
    if (!Array.isArray(datosAGuardar) || datosAGuardar.length === 0) {
      return new Response(
        JSON.stringify({ error: "Datos inválidos o array vacío." }),
        {
          status: 400, // Bad Request
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. Crear un array de promesas de actualización con la conversión de tipos
    const actualizaciones = datosAGuardar.map((estudiante) => {
                return consulta`
            UPDATE notas
            SET 
              nota1 = ${getValue(estudiante.nota1)},
              nota2 = ${getValue(estudiante.nota2)},
              nota3 = ${getValue(estudiante.nota3)},
              nota_final = ${getValue(estudiante.nota_final)}
            WHERE 
              id_estudiante = ${estudiante.id_estudiante}
              AND id_materia = ${estudiante.id_materia};
          `;
    });

    // 3. Ejecutar todas las promesas de actualización en paralelo
    await Promise.all(actualizaciones);

    // 4. Responder con éxito
    return new Response(
      JSON.stringify({ message: "Notas actualizadas con éxito." }),
      {
        status: 200, // OK
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error al actualizar las notas:", error);
    // 5. Devolver un mensaje de error más claro en caso de fallo
    return new Response(
      JSON.stringify({
        error: "Error en la base de datos al intentar actualizar las notas.",
      }),
      {
        status: 500, // Internal Server Error
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// Opcional: Manejar las peticiones preflight (CORS OPTIONS)
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS", // Permitimos POST
      "Access-Control-Allow-Headers": "Content-Type", // Importante para POST
    },
  });
}
