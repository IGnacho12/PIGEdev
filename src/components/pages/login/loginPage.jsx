import React, { useEffect, useState } from "react";

import CardPerson from "./CardPerson";
import { User, Users } from "lucide-react";

export default function LoginPage() {
  const students = [
    {
      name: "Castillo Ignacio",
      dni: "48122345",
      avatar: "https://www.mediafire.com/convkey/c9b2/z7o6iyl6voe6ouibg.jpg",
    },
    {
      name: "Duarte Naara",
      dni: "48122456",
      avatar:
        "https://www.mediafire.com/convkey/1a63/ya3lzrhyt3b6zp9bg.jpg?size_id=8",
    },
    {
      name: "Vazquez Gerardo",
      dni: "48233567",
      avatar: "https://www.mediafire.com/convkey/2b0c/9i208m0wyck0ipvzg.jpg",
    },
    {
      name: "Brizuela Yoel",
      dni: "48344578",
      avatar: "https://www.mediafire.com/convkey/2e12/lv6dfu2btma9n88ag.jpg",
    },
    {
      name: "Rojas Ramiro",
      dni: "48355689",
      avatar: "https://www.mediafire.com/convkey/534e/ysojim84uwhdd6eag.jpg",
    },
    {
      name: "Cristian Rojas",
      dni: "46711234",
      avatar: "https://www.mediafire.com/convkey/9859/7l9bx0j5085zw5s7g.jpg",
    },
    {
      name: "Agustín Romero",
      dni: "46722345",
      avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    },
    {
      name: "Sofía Cabrera",
      dni: "45999812",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      name: "Nicolás Bustamante",
      dni: "45333123",
      avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    },
  ];

  const data = []
const [studentsArray, setStudents] = useState([]) 

  useEffect(() => {
    fetch("http://localhost:4321/api/getStudents")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  const [Filter, setFilter] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(Filter.toLowerCase()) ||
      s.dni.includes(Filter)
  );

  return (
    <>
      <main className="px-3 xl:p-0 overflow-auto scrollbar-hide">
        <h1 className="font-semibold text-center text-4xl">Iniciar sesión</h1>
        <p className="text-md text-center text-pretty">
          Debes buscar en la base de datos ya sea con tu nombre apellido, o dni
          y con tu contraseña asignada
        </p>

        {/* Input para buscar personas */}
        <div className="flex flex-row items-center gap-2 border border-[var(--border)] w-fit rounded-md overflow-hidden group hover:border-blue-500 transition-colors mx-auto mt-12">
          <div className="px-2 border-r border-[var(--border)] text-[var(--text-muted)]">
            <Users />
          </div>

          <input
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 outline-none bg-transparent text-[var(--text)] placeholder-[var(--text-muted)]"
            placeholder="Buscar persona"
          />
        </div>

        {/* Persons container */}
        <section className="flex flex-col gap-3 mx-auto w-full sm:w-2/3 lg:w-1/3 bg-neutral-600/10 p-2 mt-14">
          {filtered.length === 0 ? (
            <>
              <h1>No se han encontrado resultados para su busqueda</h1>
            </>
          ) : (
            data.map((student) => (
              <CardPerson
                key={student.dni}
                name={student.name}
                dni={student.dni}
                avatar={student.avatar}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}
