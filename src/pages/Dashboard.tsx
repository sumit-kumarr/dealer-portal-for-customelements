import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  FileText, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Activity,
  Users
} from 'lucide-react';
import { DashboardStats } from '@/types/product';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { totalItems, totalPrice } = useCart();

  // Mock dashboard stats
  const stats: DashboardStats = {
    totalOrders: 12,
    totalSpent: 2567.43,
    pendingOrders: 2,
    favoriteProducts: 8
  };

  const recentOrders = [
    { id: 'ORD-2024-001', date: '2024-01-15', total: 789.97, status: 'Delivered' },
    { id: 'ORD-2024-002', date: '2024-01-10', total: 329.97, status: 'Processing' },
    { id: 'ORD-2024-003', date: '2024-01-05', total: 317.47, status: 'Shipped' },
  ];

  const quickActions = [
    { label: 'Browse Products', icon: Package, href: '/products', color: 'bg-blue-500' },
    { label: 'View Cart', icon: ShoppingCart, href: '/cart', color: 'bg-green-500' },
    { label: 'Order History', icon: FileText, href: '/orders', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card p-4 md:p-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient truncate">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              {user?.dealerName} • Dealer ID: {user?.dealerId}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-xl md:text-2xl font-bold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="glass-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Cart</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              ${totalPrice.toFixed(2)} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used features and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-auto p-4 glass-button group"
              >
                <Link to={action.href} className="flex flex-col items-center gap-2">
                  <div className={`p-3 rounded-full ${action.color} text-white group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                Your latest order activity
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/orders">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 md:p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm md:text-base truncate">{order.id}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4 ml-2">
                  <p className="font-medium text-sm md:text-base">${order.total.toFixed(2)}</p>
                  <Badge
                    variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                    className={order.status === 'Delivered' ? 'bg-success' : ''}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;