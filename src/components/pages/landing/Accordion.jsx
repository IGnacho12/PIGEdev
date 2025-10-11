import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

export default function AccordionLanding() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Gestión de notas en tiempo real</AccordionTrigger>
        <AccordionContent>
          Los estudiantes pueden consultar sus calificaciones al instante, mientras que los profesores tienen la posibilidad de modificarlas en cualquier momento. Los cambios se reflejan automáticamente en el panel del alumno.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Gestión de asistencia automatizada</AccordionTrigger>
        <AccordionContent>
          Permite visualizar y actualizar la asistencia de los estudiantes en tiempo real. Cualquier modificación realizada por el profesor se muestra inmediatamente en el panel correspondiente del alumno.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Mapa interactivo del colegio</AccordionTrigger>
        <AccordionContent>
          Incluye un mapa detallado de las instalaciones de la E.P.E.T., con indicaciones precisas sobre cómo llegar al aula o sector correspondiente según el horario del estudiante.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Reconocimiento facial</AccordionTrigger>
        <AccordionContent>
          Ofrecemos un sistema opcional de reconocimiento facial que registra automáticamente la asistencia de cada alumno al ingresar, marcando su estado como “presente”, “tarde” o “ausente”.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
