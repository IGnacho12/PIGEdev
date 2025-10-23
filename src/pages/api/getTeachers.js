import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

// la función debe ser asíncrona debido a que no sabemos cuanto tiempo va a tardar en devolvernos la data la DB
export async function GET() {
  try {
    // Definir la respueta a esta solicitud - Await para que espere para declarar esta variable
    const response = await consulta`
SELECT 
  t.id_teacher AS teacher_id,
  t.name AS name,
  t.dni,
  t.password_value AS password_value,
  s.name AS subject_name
FROM 
  teacher_subjects ts
JOIN 
  teachers t ON ts.teacher_id = t.id_teacher
JOIN 
  subjects s ON ts.subject_id = s.id_subject
ORDER BY 
  t.id_teacher;
    `;
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify("Algo ah salido mal, error: ", error));
  }
}

// Laboratorio en informatica 1
// Laboratorio en informatica 2
// Laboratorio en informatica 3
// Hipermedia
// Software alternativo
// Ingles
// Formación ética y cuidadana
// Practicas pre profesionalizantes
// Matematica aplicada
// Redes extendidas
// Teoría de la comunicación
// Economía
