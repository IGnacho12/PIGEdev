import React from "react";

export default function Login() {
  return (
    <>
      <article className="flex justify-around w-1/2 mx-auto mt-12 items-center">
        <button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 border border-[hsl(0, 0%, 30%)]">
          <span>Alumno</span>
          <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div class="relative h-full w-8 bg-white/20"></div>
          </div>
        </button>
        <span className="text-center ">¡Registrate!</span>
        <button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 border border-[hsl(0, 0%, 30%)]">
          <span>Profesor</span>
          <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div class="relative h-full w-8 bg-white/20"></div>
          </div>
        </button>
      </article>
    </>
  );
}
