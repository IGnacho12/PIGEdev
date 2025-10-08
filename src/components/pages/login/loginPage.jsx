import React from "react";

import CardPerson from "./CardPerson";

export default function LoginPage() {
  const students = [
    {
      name: "Ignacio Castillo",
      dni: "12345678",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "María Pérez",
      dni: "87654321",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Juan López",
      dni: "23456789",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Ana Gómez",
      dni: "98765432",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Lucas Fernández",
      dni: "34567890",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  return (
    <>
      <main className="px-3 xl:p-0 ">
        <h1 className="font-semibold text-center text-4xl">Iniciar sesión</h1>
        <p className="text-md text-center text-pretty">
          Debes buscar en la base de datos ya sea con tu nombre apellido, o dni
          y con tu contraseña asignada
        </p>

        {students.map((student) => {
          return (
            <CardPerson
              name={student.name}
              dni={student.dni}
              avatar={student.avatar}
            />
          );
        })}
      </main>
    </>
  );
}
