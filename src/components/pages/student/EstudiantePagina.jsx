// StudentPage.jsx
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

import Hero from "./Hero";
import Notes from "./Notas";
import Horario from "./Horario";
import Attendance from "./Asistencia";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StudentPage() {
  const [nombreAlumno, setNombreAlumno] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    setNombreAlumno(name);
  }, []);

  return (
    <>
      {nombreAlumno ? (
        <main className="px-3 xl:p-0 space-y-16">
          <Hero name={nombreAlumno}></Hero>
          <Notes nombre={nombreAlumno}></Notes>
          <Attendance name={nombreAlumno}></Attendance>
          <Horario></Horario>
        </main>
      ) : (
        <Empty className="from-muted/50 to-background h-full ">
          <EmptyHeader>
            <EmptyMedia variant="icon">👤</EmptyMedia>
            <EmptyTitle>Inicia sesión para continuar</EmptyTitle>
            <EmptyDescription>
              Debes iniciar sesión para poder acceder esta información.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <a
              href="login"
              // 🔴 CORREGIDO: Cambiado 'class' a 'className'
              className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              Ir a Iniciar{" "}
            </a>
          </EmptyContent>
        </Empty>
      )}
    </>
  );
}
