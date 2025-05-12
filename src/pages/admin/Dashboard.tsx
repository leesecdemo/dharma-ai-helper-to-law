
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Settings, ArrowRight } from "lucide-react";
import { getCases } from "@/utils/caseService";
import FloatingAssistant from "@/components/floating-assistant";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Get cases from case service
  const allCases = getCases("admin");
  
  // Calculate stats
  const stats = {
    totalCases: allCases.length,
    activeCases: allCases.filter(c => c.status !== "closed").length,
    draftCases: allCases.filter(c => c.status === "draft").length,
    closedCases: allCases.filter(c => c.status === "closed").length,
  };

  // Get recent cases for display
  const recentCases = allCases
    .sort((a, b) => {
      const aDate = new Date(a.history[a.history.length - 1].date);
      const bDate = new Date(b.history[b.history.length - 1].date);
      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 4);

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCases}</div>
              <p className="text-xs text-muted-foreground">
                All cases in the system
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
                {stats.totalCases > 0 
                  ? `${((stats.activeCases / stats.totalCases) * 100).toFixed(0)}% of all cases` 
                  : "No cases in system"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftCases}</div>
              <p className="text-xs text-muted-foreground">
                Pending initial filing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.closedCases}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCases > 0 
                  ? `${((stats.closedCases / stats.totalCases) * 100).toFixed(0)}% closure rate` 
                  : "No cases in system"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Case Activity</CardTitle>
              <CardDescription>
                View recently updated cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No cases to display
                  </div>
                ) : (
                  recentCases.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="mr-2">{item.id}</span>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.status === 'in_progress' || item.status === 'assigned' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            item.status === 'draft' || item.status === 'filed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                            item.status === 'closed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          Last update: {new Date(item.history[item.history.length - 1].date).toLocaleDateString()}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/admin/case/${item.id}`)}
                          title="View Case"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/cases')}>
                  View All Cases
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>System Management</CardTitle>
              <CardDescription>Admin tools and functions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate('/admin/users')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/cases')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Case Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingAssistant userType="admin" userName="Admin User" />
    </DashboardLayout>
  );
};

export default AdminDashboard;
