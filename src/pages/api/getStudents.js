import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const consulta = neon(process.env.DATABASE_URL);

export async function GET() {
  const response = await consulta`
SELECT 
  s.name AS name,
  s.dni AS dni,
  s.id AS id,
  s.password_value as password_value,
  s.avatar as avatar,
  CONCAT(c.curso, ' ', c.division) AS class_and_section
FROM students s
JOIN cursos c ON c.id_curso = s.id;
`;

  return new Response(JSON.stringify(response));
}
