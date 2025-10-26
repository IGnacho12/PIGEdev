import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

// La función debe ser asíncrona debido a que no sabemos cuánto tiempo va a tardar en devolvernos la data la DB
export async function GET() {
  try {
    // Definir la respuesta a esta solicitud - Await para que espere para declarar esta variable
    const response = await consulta`
select * from cursos
    `;
    return new Response(JSON.stringify(response));
  } catch (error) {
    // Se mejoró el manejo de errores para incluir el mensaje específico del error
    return new Response(
      JSON.stringify({
        error: "Algo ha salido mal",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
