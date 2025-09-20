import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import NavBar from './NavBar';
import { PageLoading } from '@/components/ui/page-loading';
import { SidebarLoading } from '@/components/ui/sidebar-loading';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SidebarProvider>
        <SidebarLoading>
          <AppSidebar />
        </SidebarLoading>
        <main className="flex-1">
          <NavBar />
          <PageLoading>{children}</PageLoading>
        </main>
      </SidebarProvider>
    </section>
  );
}
