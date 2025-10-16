import { useState } from "react";
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
  const [password, setPassword] = useState("");

  function checkPassword() {
    const STUDENT_PASSWORD = student.password_value;
    if (password === STUDENT_PASSWORD) {
      console.log("✅ Iniciar sesión");
      window.location.href = `/student?name=${student.name}`;

      // aquí podrías ejecutar la lógica de login
    } else {
      console.log("❌ Contraseña incorrecta");
    }
  }

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar sesión como estudiante</DialogTitle>
          <DialogDescription>
            Deberás proporcionar la contraseña establecida del siguiente perfil
            para poder iniciar sesión. ↓
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
            <Input
              id="password"
              type="password"
              placeholder="Ingresa aquí tu contraseña 👀"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="button" onClick={checkPassword}>
            Iniciar sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
