import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export const RootLayout = () => (
  <SidebarProvider>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-none focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-1 focus:ring-ring"
    >
      Skip to main content
    </a>
    <AppSidebar />

    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
        <SidebarTrigger />
        <span className="text-sm font-semibold">Doc Mind</span>
      </header>
      <main id="main-content" className="h-full bg-background p-4">
        <div className="mx-auto w-full max-w-[1920px]">
          <Outlet />
        </div>
      </main>
    </SidebarInset>
    <TanStackRouterDevtools />
  </SidebarProvider>
);
