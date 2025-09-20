'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
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

interface SidebarLoadingProps {
  children: React.ReactNode;
  minLoadingTime?: number;
}

export function SidebarLoading({ children, minLoadingTime = 300 }: SidebarLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  if (isLoading) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-6" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {Array.from({ length: 6 }).map((_, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              <SidebarGroupLabel>
                <Skeleton className="h-4 w-20" />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Array.from({ length: 3 }).map((_, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton>
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupLabel>
              <Skeleton className="h-4 w-16" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    );
  }

  return <>{children}</>;
}
