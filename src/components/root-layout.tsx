import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export const RootLayout = () => (
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <main>
        <Outlet />
      </main>
    </SidebarInset>
    <TanStackRouterDevtools />
  </SidebarProvider>
);
