import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const pageTitle = {
  '/dashboard': 'Dashboard',
  '/products': 'Products',
  '/orders': 'My Orders',
  '/cart': 'Shopping Cart',
};

export function DashboardHeader() {
  const location = useLocation();
  const currentTitle = pageTitle[location.pathname as keyof typeof pageTitle] || 'Dashboard';

  return (
    <header className="glass-card border-b border-glass-border p-3 md:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <SidebarTrigger className="glass-button" />
          <h1 className="text-lg md:text-xl font-semibold truncate">{currentTitle}</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="glass-input pl-10 w-48 xl:w-64"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative glass-button">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}