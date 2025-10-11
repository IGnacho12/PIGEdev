import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/ToolTip";

export default function PigeToolTip() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <span class="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            PIGE!
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Plataforma Integral de Gestión Escolar</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
