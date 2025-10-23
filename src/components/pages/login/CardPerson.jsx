import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CardPerson({
  name = "Terminator",
  dni = "007",
  avatar,
  onSelect, // callback para abrir modal
  className = "", // Aquí recibimos las clases extra
  classAndSection,
  subjects,
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:cursor-pointer hover:scale-105 border-2 border-text-muted/20 hover:border-bg-light transition-all shadow-sm bg-[var(--bg-light)] dark:bg-[var(--bg)] ${className}`}
    >
      <Avatar className="rounded-full size-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
            <path d="M19 16v3" />
            <path d="M19 22v.01" />
          </svg>
        </AvatarFallback>
      </Avatar>

      <article className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full">
          <article className="flex-row flex  justify-between  items-center w-full">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </h1>
            {subjects && (
              <span className="text-xs text-gray-700">[ {subjects} ]</span>
            )}
          </article>
          <article className="flex-row flex  justify-between  items-center w-full">
            <span className="text-sm text-left text-gray-700 ">DNI: {dni}</span>
             {classAndSection && (
              <span className="text-xs text-gray-700">{classAndSection}</span>
            )}
          </article>
        </div>
      </article>
    </button>
  );
}
