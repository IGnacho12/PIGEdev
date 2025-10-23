import React, { StrictMode, useEffect, useState } from "react";
import CardPerson from "./CardPerson";
import Modal from "@/components/pages/login/Modal";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import useFetchPeople from "@/hooks/useFetchPeople";

export default function LoginPage() {
  // Profesor - Estudiante
  const [entity, setEntity] = useState(null);

  // Filtro
  const [filter, setFilter] = useState("");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Detecta el tipo de login (solo client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const typeOfLogin = new URLSearchParams(window.location.search).get(
        "type"
      );
      setEntity(typeOfLogin || "estudiante");
    }
  }, []);

  // Hook siempre llamado
  const { data, loading } = useFetchPeople(entity);

  const people = Array.isArray(data) ? data : [];

  // Filtro por nombre o DNI
  const filtered = people.filter((p) => {
    const name = (p?.name || "").toLowerCase();
    const dni = String(p?.dni || "");
    const query = filter.toLowerCase();
    return name.includes(query) || dni.includes(query);
  });

  return (
    <StrictMode>
      <Modal open={modalOpen} setOpen={setModalOpen} person={selectedPerson} type={entity} />

      <main className="px-3 xl:p-0">
        <h1 className="font-semibold text-4xl w-fit mx-auto">Iniciar sesión</h1>
        <p className="text-md text-center text-pretty">
          Puedes filtrar los resultados utilizando nombres o el número del DNI
          correspondiente
          <br />
          <span className="text-gray-600 font-light">
            - Por favor informar de algún problema o data faltante -
          </span>
        </p>

        {/* Barra de búsqueda */}
        <InputGroup className="w-fit mx-auto mt-12 bg-[var(--bg-light)] dark:bg-[var(--bg-light)]">
          <InputGroupAddon>
            {entity
              ? entity.charAt(0).toUpperCase() + entity.slice(1)
              : "Entidad"}
          </InputGroupAddon>

          <div className="w-px h-6 bg-border mx-2 my-auto" />

          <InputGroupInput
            placeholder="Mario Antonio del Valle"
            onChange={(e) => setFilter(e.target.value)}
          />

          <InputGroupAddon align="inline-end">
            {filtered.length}
          </InputGroupAddon>
        </InputGroup>

        {/* Resultados */}
        <section className="flex flex-col gap-3 mx-auto w-full sm:w-2/3 lg:w-1/3 p-2 mt-6">
          {loading && <h1>Cargando datos...</h1>}

          {!loading && filtered.length === 0 && (
            <h1>No se han encontrado resultados para su búsqueda</h1>
          )}

          {!loading &&
            filtered.map((p) => (
              <CardPerson
                key={p.dni}
                name={p.name}
                dni={p.dni}
                classAndSection={p.class_and_section}
                subjects={p.subject_name}
                avatar={p.avatar}
                onSelect={() => {
                  setSelectedPerson(p);
                  setModalOpen(true);
                }}
              />
            ))}
        </section>
      </main>
    </StrictMode>
  );
}
