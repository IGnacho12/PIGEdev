import React, { useEffect } from "react";

import Hero from "./Hero";
import Notes from "./Notes";
import Schedule from "./Schedule";
import Attendance from "./Attendance";


export default function StudentPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const studentName = params.get("name");
    console.log("Nombre del estudiante:", studentName);
    console.log("Nombre del chabon", studentName);
  }, []);
  return (
    <>
      {/* Presentación de la pagina // Division de secciones [Calificaciones, Notas, Mapa y Horario  */}
      <main className="px-3 xl:p-0 overflow-auto scrollbar-hide space-y-16">
        <Hero></Hero>
        <Notes></Notes>
        <Attendance></Attendance>
        <Schedule></Schedule>
      </main>
    </>
  );
}
