import { useEffect, useState } from "react";

export default function ModeToggle() {
  const [themeDark, setThemeDark] = useState(true);


  useEffect(() => {
    if (themeDark === true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeDark]);

  return (
    <div className="fixed top-2 right-2 backdrop-blur-lg rounded-full z-10">
      {/* Botón del icono */}
      <button onClick={() => setThemeDark(!themeDark)} className="p-1 transition">

        {/* Icono para cambiar el tema */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="size-4.5"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M12 3l0 18"></path>
          <path d="M12 9l4.65 -4.65"></path>
          <path d="M12 14.3l7.37 -7.37"></path>
          <path d="M12 19.6l8.85 -8.85"></path>
        </svg>
      </button>
    </div>
  );
}
