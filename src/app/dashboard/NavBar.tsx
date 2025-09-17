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
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/lib/hooks';
import { getUserDisplayName, getUserInitials } from '@/lib/auth/utils';

const NavBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

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
              <AvatarFallback>{user ? getUserInitials(user) : 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user ? getUserDisplayName(user) : 'My Account'}</DropdownMenuLabel>
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
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
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
