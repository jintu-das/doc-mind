import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  CircleHelp,
  FileBoxIcon,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";
import * as React from "react";

import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navFooter = [
  { title: "Settings", icon: Settings },
  { title: "Help & Docs", icon: CircleHelp },
];

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "AI Assistant",
    url: "/ai-assistant",
    icon: Bot,
  },
  {
    title: "Semantic Search",
    url: "/semantic-search",
    icon: Search,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <div className="bg-sidebar-primary/20 flex aspect-square size-8 items-center justify-center">
                <FileBoxIcon className="size-4" aria-hidden="true" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Doc Mind</span>
                <span className="truncate text-xs">AI Intelligence</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <nav aria-label="Main">
              <SidebarMenu>
                {navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      variant="default"
                      isActive={pathname === item.url}
                      // className="hover:bg-primary/10! hover:text-primary! data-active:bg-primary! data-active:text-primary-foreground! data-active:hover:bg-primary! data-active:hover:text-primary-foreground!"
                      render={<Link to={item.url} />}
                    >
                      <item.icon aria-hidden="true" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 bg-sidebar-accent p-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-between text-xs font-medium text-sidebar-foreground">
            <span>Storage Usage</span>
            <span className="text-sidebar-foreground/70">68%</span>
          </div>
          <Progress value={68} className="h-1.5" />
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
            <span>3.4 GB of 5 GB</span>
            <span>24 PDFs</span>
          </div>
        </div>
        <SidebarMenu>
          {navFooter.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <item.icon aria-hidden="true" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
