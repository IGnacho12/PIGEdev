const DATABASE_URL =
  "postgresql://neondb_owner:npg_n5Ip3uZmotNh@ep-blue-thunder-adoo95lz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
import { neon } from "@neondatabase/serverless";

const consulta = neon(DATABASE_URL);

export async function GET() {
  const response = await consulta`SELECT * from students`;

  return new Response(JSON.stringify(response));
}
