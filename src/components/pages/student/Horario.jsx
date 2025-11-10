import React from "react";
import { Download } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Horario() {
  const handleDownload = (src, name) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = name;
    link.click();
  };

  return (
    <section className="w-full xl:w-4/5 mx-auto mt-10 flex flex-col xl:flex-row items-start gap-10">
      {/* ===== Columna Izquierda: Horarios ===== */}
      <section className="flex flex-col px-5 py-4 rounded-2xl shadow-(--inset-shadow-sm) bg-(--bg-light) dark:bg-(--bg-dark) w-full xl:w-1/2">
        <TituloDeHorario>TURNO MAÑANA</TituloDeHorario>
        <Zoom>
          <Image
            src="/horarios/1roI.png"
            alt="Horario del turno mañana"
            filename="horario_manana.png"
            handleDownload={handleDownload}
            label="Descargar Horario!"
          />
        </Zoom>

        <hr className="my-4 border-gray-500/30" />

        <TituloDeHorario>TURNO TARDE</TituloDeHorario>
        <Zoom>
          <Image
            src="/horarios/1roI.png"
            alt="Horario del turno tarde"
            filename="horario_tarde.png"
            handleDownload={handleDownload}
            label="Descargar Horario!"
          />
        </Zoom>
      </section>

      {/* ===== Columna Derecha: Planos del colegio ===== */}
      <main className="flex flex-col px-5 py-4 rounded-2xl shadow-(--inset-shadow-sm) bg-(--bg-light) dark:bg-(--bg-dark) w-full xl:w-1/2">
        <TituloDeHorario>PLANOS DEL COLEGIO</TituloDeHorario>

        <Zoom>
          <Image
            src="/mapa-del-colegio/planta-baja.png"
            alt="Plano planta baja del colegio"
            filename="plano_planta_baja.png"
            handleDownload={handleDownload}
            label="Descargar Planta Baja!"
          />
        </Zoom>

        <Zoom>
          <Image
            src="/mapa-del-colegio/planta-alta.png"
            alt="Plano planta alta del colegio"
            filename="plano_planta_alta.png"
            handleDownload={handleDownload}
            label="Descargar Planta Alta!"
          />
        </Zoom>
      </main>
    </section>
  );
}

// ✅ Subcomponente de imagen con botón dinámico
function Image({ src, alt, filename, handleDownload, label }) {
  return (
    <figure className="flex flex-col items-center gap-3 p-3">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-md grayscale hover:grayscale-0 transition-all duration-300"
      />
      <BotonDescargarImagen onClick={() => handleDownload(src, filename)}>
        <Download size={16} />
        {label}
      </BotonDescargarImagen>
    </figure>
  );
}

// ✅ Título reutilizable
function TituloDeHorario({ children }) {
  return <h2 className="text-xl text-center font-semibold mb-2">{children}</h2>;
}

// ✅ Botón animado reutilizable
function BotonDescargarImagen({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex h-10 items-center gap-2 justify-center overflow-hidden rounded-md bg-neutral-950 px-5 font-medium text-neutral-200 hover:cursor-pointer hover:scale-105 active:scale-95 transition-all dark:bg-neutral-50/95 dark:text-black"
    >
      {children}
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20 dark:bg-black/10"></div>
      </div>
    </button>
  );
}
