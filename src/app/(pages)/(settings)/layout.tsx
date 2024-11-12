import { AppSidebar } from "@/components/app-sidebar"
import { PasswordProtectedProvider } from "@/components/provider/password-protected-provider"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"


export default function Layout({ children }) {
  return (

    <PasswordProtectedProvider correctPassword="1234">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <section className="w-full h-full flex mx-auto" suppressHydrationWarning>
            <section>
              {children}
              <Toaster />
            </section>
          </section>
        </main>
      </SidebarProvider>
    </PasswordProtectedProvider>

  )
}

