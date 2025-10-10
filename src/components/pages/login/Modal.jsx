import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardPerson from "./CardPerson";

export default function Modal({ open, setOpen, student }) {
  if (!student) return null; // no mostrar nada si no hay estudiante seleccionado

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar sesión como estudiante</DialogTitle>
          <DialogDescription>
            Deberás proporcionar una contraseña para acceder como este usuario ↓
            <div className="pt-4">
              <CardPerson
                name={student.name}
                dni={student.dni}
                avatar={student.avatar}
              />
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" placeholder="********" />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Iniciar sesión</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
