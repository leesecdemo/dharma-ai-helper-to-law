
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { getCases } from "@/utils/caseService";
import FloatingAssistant from "@/components/floating-assistant";

const LawyerDashboard = () => {
  const navigate = useNavigate();
  
  // Get cases from case service
  const allCases = getCases("lawyer");
  const activeCases = allCases.filter(c => c.status !== "closed");
  
  // Calculate stats
  const stats = {
    totalCases: allCases.length,
    activeCases: activeCases.length,
    pendingBriefs: allCases.filter(c => !c.lawyerBrief).length,
    recentUpdates: allCases.filter(c => {
      const lastUpdate = new Date(c.history[c.history.length - 1].date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastUpdate >= weekAgo;
    }).length,
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
    <DashboardLayout userType="lawyer" userName="Adv. Sharma">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
          <p className="text-muted-foreground">Manage cases, prepare legal briefs, and track hearings.</p>
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
                {stats.totalCases > 0 ? "All assigned cases" : "No cases assigned yet"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCases > 0 
                  ? `${((stats.activeCases / stats.totalCases) * 100).toFixed(0)}% of total cases` 
                  : "No cases yet"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Briefs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBriefs}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentUpdates}</div>
              <p className="text-xs text-muted-foreground">
                In the last 7 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Cases</CardTitle>
              <CardDescription>
                View and manage your most recently updated cases.
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
                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          {new Date() > new Date(item.history[item.history.length - 1].date) ? 
                            new Date(item.history[item.history.length - 1].date).toLocaleDateString() : 
                            "Today"}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/lawyer/case/${item.id}`)}
                          title="View Case"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/lawyer/case/${item.id}`)}
                          className="gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          AI Assistant
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/lawyer/cases')}>
                  View All Cases
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Hearings</CardTitle>
              <CardDescription>Scheduled hearings for your cases.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allCases.filter(c => c.nextHearing).length > 0 ? (
                  allCases
                    .filter(c => c.nextHearing)
                    .sort((a, b) => new Date(a.nextHearing || "").getTime() - new Date(b.nextHearing || "").getTime())
                    .slice(0, 3)
                    .map((item) => (
                      <div key={item.id} className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                            <Scale className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300">{item.title}</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {item.court} - {item.nextHearing}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/lawyer/case/${item.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming hearings scheduled
                  </div>
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/lawyer/hearings')}>
                  View All Hearings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingAssistant userType="lawyer" userName="Adv. Sharma" />
    </DashboardLayout>
  );
};

export default LawyerDashboard;
