import React, { useEffect, useState } from "react";
import CardPerson from "./CardPerson";
import { Users } from "lucide-react";
import Modal from "@/components/pages/login/Modal";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function LoginPage() {
  // Estado del modal y del estudiante seleccionado
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [totalCount, setTotalCounts] = useState("0");

  // Filtro
  const [filter, setFilter] = useState("");
  const [students, setStudents] = useState([]);

  // Recuperar datos
  useEffect(() => {
    console.log("get students");
    fetch("/api/getStudents")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setTotalCounts(data.length);
      });
  }, []);

  const filtered = students.filter((s) => {
    const name = (s?.name || "").toLowerCase();
    const dni = String(s?.dni || "");
    const query = filter.toLowerCase();
    return name.includes(query) || dni.includes(query);
  });

  // Cambiar el totalCount cuando cambia el filtered
  useEffect(() => {
    setTotalCounts(filtered.length);
  }, [filtered]);

  return (
    <>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        student={selectedStudent}
      />

      <main className="px-3 xl:p-0 ">
        <h1 className="font-semibold text-4xl w-fit mx-auto">Iniciar sesión</h1>
        <p className="text-md text-center text-pretty">
          Debes buscar en la base de datos ya sea con tu nombre, apellido o DNI,
          y usar tu contraseña asignada.
        </p>
        {/* Input para buscar personas */}
        <InputGroup className="w-fit mx-auto mt-12 bg-[var(--bg-light)] dark:bg-[var(--bg-light)]">
          <InputGroupInput
            placeholder="Mario Antonio Rodriguez"
            onChange={(e) => setFilter(e.target.value)}
          />
          <InputGroupAddon>Alumno</InputGroupAddon>
          <InputGroupAddon align="inline-end">{totalCount}</InputGroupAddon>
        </InputGroup>

        {/* Lista de estudiantes */}
        <section className="flex flex-col gap-3 mx-auto w-full sm:w-2/3 lg:w-1/3 p-2 mt-6">
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
