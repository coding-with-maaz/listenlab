
import { Link, useLocation } from 'react-router-dom';
import { 
  Headphones, 
  FileText, 
  Users, 
  Settings, 
  BarChart, 
  CheckSquare,
  Home,
  LogOut
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarSeparator
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/dashboard' },
    { title: 'Listening Tests', icon: Headphones, path: '/dashboard/listening-tests' },
    { title: 'Submissions', icon: CheckSquare, path: '/dashboard/submissions' },
    { title: 'Users', icon: Users, path: '/dashboard/users' },
    { title: 'Reports', icon: BarChart, path: '/dashboard/reports' },
    { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <Headphones className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl">ListenLab</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive(item.path)}
                tooltip={item.title}
              >
                <Link to={item.path} className="w-full">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarSeparator />
        <div className="mt-2">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full p-2 rounded-md hover:bg-gray-100">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
