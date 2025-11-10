import React from "react";

export default function Hero({ name = "Nombre de alumno" }) {
  return (
    <>
      <main className="">
        <h1 className="text-5xl font-semibold text-center ">¡Hola {name}!</h1>
        <p className="text-center">Aquí podrás ver tus notas, asistencias y horarios.</p>
      </main>
    </>
  );
}
