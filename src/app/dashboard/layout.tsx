import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import NavBar from './NavBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <NavBar />
          {children}
        </main>
      </SidebarProvider>
    </section>
  );
}
