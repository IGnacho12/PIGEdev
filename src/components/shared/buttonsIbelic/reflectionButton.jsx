import { Children } from "react";

export default function reflectionButton({ children, onClick }) {
  return (
    <>
      <button onClick={onClick} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 border border-[hsl(0, 0%, 30%)] hover:cursor-pointer active:scale-90">
        <span>{children}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button>
    </>
  );
}
