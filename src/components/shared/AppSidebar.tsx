import { Home, Inbox, ScanFace } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Gestión Escolar",
    url: "/estudiante",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-text-muted/20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Plataforma integral de Gestión Escolar
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="inline-flex">
        <SidebarMenuButton asChild>
          <a href="Reconocimineto Facial anache">
            <ScanFace></ScanFace>
            <span>Reconocimiento Facial</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
