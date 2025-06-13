import { Header } from "./components/Header"
import { AppSidebar } from "./components/AppSidebar"
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar"
import { AppRouter } from "./routes/AppRouter"

function App() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <AppRouter />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
