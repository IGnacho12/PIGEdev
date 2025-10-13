// StudentPage.jsx
import React, { useEffect, useState } from "react";

import Hero from "./Hero";
import Notes from "./Notes";
import Schedule from "./Schedule";
import Attendance from "./Attendance";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function StudentPage() {
  const [studentName, setStudentName] = useState("");
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    setStudentName(name);

    fetch(`/api/getGradesByStudent?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        setNotas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {studentName ? (
        <main className="px-3 xl:p-0 overflow-auto scrollbar-hide space-y-16">
          <Hero name={studentName}></Hero>
          <Notes notas={notas} loading={loading}></Notes>
          <Attendance></Attendance>
          <Schedule></Schedule>
        </main>
      ) : (
        <Empty className="from-muted/50 to-background h-full ">
          <EmptyHeader>
            <EmptyMedia variant="icon">
            👤
            </EmptyMedia>
            <EmptyTitle>Inicia sesión para continuar</EmptyTitle>
            <EmptyDescription>
              Debes inciar sesión para poder acceder esta información.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <a href="login" class="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Ir a Iniciar </a>
          </EmptyContent>
        </Empty>
      )}
    </>
  );
}
