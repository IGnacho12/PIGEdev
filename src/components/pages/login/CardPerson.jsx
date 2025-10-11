import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export default function CardPerson({
  name = "Terminator",
  dni = "007",
  avatar,
  onSelect, // callback para abrir modal
}) {
  return (
    <button
      onClick={onSelect}
      className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:cursor-pointer hover:scale-105 transition-transform shadow-sm border-neutral-500/20 hover:border-neutral-800 dark:hover:border-neutral-20"
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

      <article className="flex flex-col">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h1>
        <span className="text-sm text-left text-gray-500 dark:text-gray-400">
          DNI: {dni}
        </span>
      </article>
    </button>
  );
}
