import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

export default function Notes({ name }) {
  const { data: grades = [], loading, error } = useFetch(
    `/api/getGradesByStudent?name=${name}`
  );

  if (loading) return <SkeletonLoader />;
  if (!grades.length) return <p>No se encontraron grades para este alumno.</p>;

  // ---- Agrupar notas por materia ----
  const subjectsMap = {};
  grades.forEach((grade) => {
    const subjectName = grade.subject;
    const gradeValue = Number(grade.grade);
    if (!subjectsMap[subjectName]) subjectsMap[subjectName] = [];
    subjectsMap[subjectName].push(gradeValue);
  });

  const subjects = Object.entries(subjectsMap).map(([name, grades]) => {
    const total = grades.reduce((sum, n) => sum + n, 0);
    const average = total / grades.length;
    return { name, grades, average };
  });

  const maxGradesCount =
    subjects.length > 0
      ? Math.max(...subjects.map((subject) => subject.grades.length))
      : 0;

  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-sm rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Materia</TableHead>
            <TableHead>Promedio Actual</TableHead>
            {Array.from({ length: maxGradesCount }).map((_, i) => (
              <TableHead className="text-center" key={i}>
                Nota {i + 1}
              </TableHead>
            ))}
            <TableHead className="text-center">Nota Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, idx) => (
            <TableRow key={idx}>
              <TableCell>{subject.name}</TableCell>
              <TableCell className="font-bold">{subject.average.toFixed(1)}</TableCell>
              {subject.grades.map((n, i) => (
                <TableCell className="text-center" key={i}>
                  {n}
                </TableCell>
              ))}
              <TableCell className="text-center">{subject.average.toFixed(0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Materias</TableCell>
            <TableCell colSpan={maxGradesCount + 1}>{subjects.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </article>
  );
}

// ---- Skeleton Loader ----
function SkeletonLoader() {
  return (
    <article className="w-full xl:w-3/5 mx-auto shadow-sm rounded-sm bg-(--bg-light) dark:bg-(--bg-dark)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-4 w-[150px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[120px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[80px] rounded" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[80px] rounded" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(5).fill(null).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-4 w-[100px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px] rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}
