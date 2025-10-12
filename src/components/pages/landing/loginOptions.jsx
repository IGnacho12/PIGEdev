import React from "react";

export default function LoginOptions() {
  return (
    <>
      <article className="flex justify-around  items-center">
        <a
          href="login"

        class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 border border-[hsl(0, 0%, 30%)] hover:cursor-pointer active:scale-90">
          <span>Alumno</span>
          <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div class="relative h-full w-8 bg-white/20"></div>
          </div>
        </a>
        <span className="text-center ">¡Registrate!</span>
        <a href="login" class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 border border-[hsl(0, 0%, 30%)] hover:cursor-pointer active:scale-90">
          <span>Profesor</span>
          <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div class="relative h-full w-8 bg-white/20 "></div>
          </div>
        </a>
      </article>
    </>
  );
}
