'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/custom/ModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, ReceiptIndianRupee, Phone, Handshake, LogOut } from 'lucide-react';
import { useAuth, useUserInitials, useIsLoading } from '@/lib/auth';
import { SidebarTrigger } from '@/components/ui/sidebar';

const NavBar = () => {
  const { logout } = useAuth();
  const userInitials = useUserInitials();
  const isLoading = useIsLoading();

  if (isLoading) {
    return (
      <nav className="p-4 flex justify-between items-center">
        <div>Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="w-full flex justify-between items-center p-4">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/user-01.jpg" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ReceiptIndianRupee />
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ReceiptIndianRupee />
              Privacy Policy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Handshake />
              Terms of Service
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
