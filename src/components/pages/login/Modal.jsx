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

export default function Modal({ open, setOpen, person, type = "student" }) {
  const [password, setPassword] = useState("");

  function checkPassword() {
    const CORRECT_PASSWORD = person.clave_acceso;

    if (password === CORRECT_PASSWORD) {
      console.log("✅ Iniciar sesión");
      window.location.href = `/${type}?name=${encodeURIComponent(person.nombre)}`;
    } else {
      console.log("❌ Contraseña incorrecta");
    }
  }

  if (!person) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar sesión como estudiante</DialogTitle>
          <DialogDescription>
            Deberás proporcionar la contraseña establecida del siguiente perfil
            para poder iniciar sesión. ↓
          </DialogDescription>
        </DialogHeader>

        <CardPerson
          className="mt-4"
          nombre={person.nombre}
          dni={person.dni}
          avatar={person.avatar}
        />

        <div className="grid gap-4 mt-4">
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
