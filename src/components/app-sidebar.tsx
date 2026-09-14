import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  ChatCircleDotsIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquaresFourIcon,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileTextIcon,
  },
  {
    title: "AI Assistant",
    url: "/ai-assistant",
    icon: ChatCircleDotsIcon,
  },
  {
    title: "Semantic Search",
    url: "/semantic-search",
    icon: MagnifyingGlassIcon,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <span className="px-2 py-1.5 text-sm font-semibold">Doc Mind</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
