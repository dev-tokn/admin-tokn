import {
  Home,
  Users,
  CheckCheck,
  ShieldUser,
  Cross,
  Handshake,
  MapPinPlus,
  MapPin,
  FolderPlus,
  FilePlus,
  BadgeIndianRupee,
  BadgePercent,
  BadgePlus,
  LogOut,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <a href="/dashboard" className="font-semibold">
            <Image src="/brand-logo.png" alt="Logo" width={100} height={100} />
          </a>
          <a href="/dashboard" className="font-semibold">
            <Home />
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <a href="/dashboard" className="font-semibold">
                <Home />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup> */}
        <SidebarGroup>
          <SidebarGroupLabel>Transactions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/users">
                    <Users />
                    All Transactions
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/users/pending">
                    <CheckCheck />
                    View by Partner
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/users/pending">
                    <CheckCheck />
                    View by Tipper
                  </a>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <a href="/dashboard/users/roles">
                    <ShieldUser />
                    View by Tippee
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tippers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/tippers">
                    <BadgeIndianRupee />
                    View All Tippers
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tippee</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/tippees">
                    <FolderPlus />
                    View All Tippees
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/tippees/add">
                    <FilePlus />
                    Add New Tippee
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Partners</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/partners">
                    <Handshake />
                    View All Partners
                  </a>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <a href="/dashboard/partners/add">
                    <Cross />
                    Add New Partner
                  </a>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <a href="/dashboard/partners/locations">
                    <MapPin />
                    View Locations
                  </a>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <a href="/dashboard/partners/locations/add">
                    <MapPinPlus />
                    Add Locations
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Offers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/tippees">
                    <BadgePercent />
                    View All Offers
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/tippees/add">
                    <BadgePlus />
                    Add New Offer
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/users">
                    <Users />
                    View All Users
                  </a>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <a href="/dashboard/users/pending">
                    <CheckCheck />
                    Pending Approval
                  </a>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <a href="/dashboard/users/roles">
                    <ShieldUser />
                    Role Management
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Logout</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/logout">
                    <LogOut />
                    Logout
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
