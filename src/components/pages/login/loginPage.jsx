import React, { useEffect, useState } from "react";
import CardPerson from "./CardPerson";
import { Users } from "lucide-react";
import Modal from "@/components/pages/login/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@radix-ui/react-label";

export default function LoginPage() {
  // Estado del modal y del estudiante seleccionado
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filtro
  const [filter, setFilter] = useState("");
  const [students, setStudents] = useState([]);

  // Recuperar datos
  useEffect(() => {
    console.log("get students");
    fetch("/api/getStudents")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  const filtered = students.filter((s) => {
    const name = (s?.name || "").toLowerCase();
    const dni = String(s?.dni || "");
    const query = filter.toLowerCase();
    return name.includes(query) || dni.includes(query);
  });

  return (
    <>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        student={selectedStudent}
      />

      <main className="px-3 xl:p-0 ">
        <h1 className="font-semibold text-center text-4xl">Iniciar sesión</h1>
        <p className="text-md text-center text-pretty">
          Debes buscar en la base de datos ya sea con tu nombre, apellido o DNI,
          y usar tu contraseña asignada.
        </p>
        {/* Input para buscar personas */}
        <div className="items-center gap-2  w-fit rounded-md  transition-colors mx-auto mt-12">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="flex flex-row items-center gap-2 border border-[var(--border)] w-fit rounded-md group hover:border-blue-500 transition-colors mx-auto mt-12">
          <div className="px-2 border-r border-[var(--border)] text-[var(--text-muted)]">
            <Users />
          </div>

          <input
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 outline-none bg-transparent text-[var(--text)] placeholder-[var(--text-muted)]"
            placeholder="Buscar persona"
          />
        </div>
        {/* Lista de estudiantes */}
        <section className="flex flex-col gap-3 mx-auto w-full sm:w-2/3 lg:w-1/3 p-2 mt-14">
          {filtered.length === 0 ? (
            <h1>No se han encontrado resultados para su búsqueda</h1>
          ) : (
            filtered.map((student) => (
              <CardPerson
                key={student.dni}
                name={student.name}
                dni={student.dni}
                avatar={student.avatar}
                onSelect={() => {
                  setSelectedStudent(student);
                  setModalOpen(true);
                }}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}
