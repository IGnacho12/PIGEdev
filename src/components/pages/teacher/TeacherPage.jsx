import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import GradesPage from "./GradesPage";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import TableGrade from "./grades/TableGrades";

export default function TeacherPage() {
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    setTeacherName(name || "");
  }, []);

  return (
    <>
      {teacherName ? (
        <main className="px-3 xl:p-0 overflow-auto scrollbar-hide space-y-16 mb-48">
          <Hero name={teacherName} />
          <TableGrade></TableGrade>
        </main>
      ) : (
        <Empty className="from-muted/50 to-background h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">👤</EmptyMedia>
            <EmptyTitle>Inicia sesión para continuar</EmptyTitle>
            <EmptyDescription>
              Debes iniciar sesión para poder acceder a esta información.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <a
              href="login"
              className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              Ir a Iniciar
            </a>
          </EmptyContent>
        </Empty>
      )}
    </>
  );
}
