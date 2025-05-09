
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Shield, Settings, ArrowRight } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // In a real app, this would be fetched from an API
  const stats = {
    totalUsers: 1245,
    casesProcessed: 3867,
    activeCases: 892,
    systemAlerts: 4
  };

  const userStats = {
    public: 984,
    police: 128,
    lawyer: 86,
    judge: 47
  };

  return (
    <DashboardLayout userType="admin" userName="Admin Kumar">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor system performance and manage platform users.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +24 in the last 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cases Processed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.casesProcessed}</div>
              <p className="text-xs text-muted-foreground">
                Since platform launch
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground">
                Currently in system
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemAlerts}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>
                Registered users by role in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Public Users</span>
                    </div>
                    <span className="font-medium">{userStats.public}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${(userStats.public / stats.totalUsers) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Police Officers</span>
                    </div>
                    <span className="font-medium">{userStats.police}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${(userStats.police / stats.totalUsers) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Lawyers</span>
                    </div>
                    <span className="font-medium">{userStats.lawyer}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-yellow-500" style={{ width: `${(userStats.lawyer / stats.totalUsers) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Judges</span>
                    </div>
                    <span className="font-medium">{userStats.judge}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${(userStats.judge / stats.totalUsers) * 100}%` }}></div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/users')}>
                  View User Management
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Performance metrics and alerts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300">System Operational</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">All services running normally</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                      <Settings className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Server Load</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Database load at 78% capacity</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/systems/database')}>
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                      <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Security Alert</h4>
                      <p className="text-sm text-red-600 dark:text-red-400">4 failed login attempts detected</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/security')}>
                      Investigate
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/systems')}>
                  View System Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
            <CardDescription>
              Latest administrative actions taken on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">User Account Approved</p>
                    <p className="text-sm text-muted-foreground">Verified and approved lawyer ID LW7891</p>
                    <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/users/LW7891')}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">System Configuration Updated</p>
                    <p className="text-sm text-muted-foreground">Document storage limits increased by 50GB</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 4:15 PM</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/systems/storage')}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                    <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium">Access Revoked</p>
                    <p className="text-sm text-muted-foreground">Temporary suspension of account PL4567</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/users/PL4567')}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => navigate('/admin/activity')}>
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
