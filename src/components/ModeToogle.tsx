import { useEffect, useState } from "react"

export default function ModeToggle() {
  const [theme, setTheme] = useState("light")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <div className="text-right">
      {/* Botón del icono */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 transition"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      {/* Select flotante */}
      {open && (
        <div className="absolute right-0 mt-2 ">
          <select
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value)
              setOpen(false)
            }}
            className="bg-transparent text-sm text-gray-700 dark:text-gray-200 p-2 rounded-lg outline-none w-28"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
      )}
    </div>
  )
}
