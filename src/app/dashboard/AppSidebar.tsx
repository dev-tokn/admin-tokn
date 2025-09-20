'use client';

import { memo } from 'react';
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
import Link from 'next/link';
import BrandLogo from '@/components/custom/BrandLogo';

const AppSidebar = memo(function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <Link href="/dashboard" className="font-semibold">
            {/* <Image
              src="/brand-logo-purple.png"
              alt="Tokn Logo"
              width={120}
              height={40}
              priority
              className="h-8 w-auto"
            /> */}
            <BrandLogo />
          </Link>
          <Link href="/dashboard" className="font-semibold">
            <Home />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Transactions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/txns">
                    <Users />
                    All Transactions
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/users/pending">
                    <CheckCheck />
                    View by Partner
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/users/pending">
                    <CheckCheck />
                    View by Tipper
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/users/roles">
                    <ShieldUser />
                    View by Tippee
                  </Link>
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
                  <Link href="/dashboard/tippers">
                    <BadgeIndianRupee />
                    View All Tippers
                  </Link>
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
                  <Link href="/dashboard/tippees">
                    <FolderPlus />
                    View All Tippees
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/tippees/add">
                    <FilePlus />
                    Add New Tippee
                  </Link>
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
                  <Link href="/dashboard/partners">
                    <Handshake />
                    View All Partners
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/partners/add">
                    <Cross />
                    Add New Partner
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/partners/locations">
                    <MapPin />
                    View Locations
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/partners/locations/add">
                    <MapPinPlus />
                    Add Locations
                  </Link>
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
                  <Link href="/dashboard/tippees">
                    <BadgePercent />
                    View All Offers
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/tippees/add">
                    <BadgePlus />
                    Add New Offer
                  </Link>
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
                  <Link href="/dashboard/users">
                    <Users />
                    View All Users
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/users/pending">
                    <CheckCheck />
                    Pending for Approval
                  </Link>
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
                  <Link href="/dashboard/logout">
                    <LogOut />
                    Logout
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
});

export { AppSidebar };
