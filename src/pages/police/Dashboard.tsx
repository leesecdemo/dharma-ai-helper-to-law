
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Folder, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { getCases } from "@/utils/caseService";

const PoliceDashboard = () => {
  const navigate = useNavigate();
  
  // Get cases from case service
  const allCases = getCases("police");
  const activeCases = allCases.filter(c => c.status !== "closed");
  
  // Calculate stats
  const stats = {
    totalCases: allCases.length,
    activeCases: activeCases.length,
    pendingReports: allCases.filter(c => c.status === "draft").length,
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
    <DashboardLayout userType="police" userName="Officer Singh">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Police Dashboard</h1>
          <p className="text-muted-foreground">Manage and track cases, evidence, and reports.</p>
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
                +2 cases this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReports}</div>
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
                          onClick={() => navigate(`/police/case/${item.id}`)}
                          title="View Case"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/police/case/${item.id}`)}
                          className="gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          AI Assistant
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/police/cases')}>
                  View All Cases
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks that require your attention.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.pendingReports > 0 ? (
                  <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                        <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Pending Reports</h4>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          {stats.pendingReports} case(s) require reports to be completed
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          const draftCase = allCases.find(c => c.status === "draft");
                          if (draftCase) {
                            navigate(`/police/case/${draftCase.id}`);
                          }
                        }}
                      >
                        Complete Reports
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                        <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-300">All Reports Complete</h4>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          All case reports have been completed
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Evidence verification task example */}
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Folder className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Evidence Verification</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        3 items require verification for case {allCases.length > 0 ? allCases[0].id : "CASE-2023-001"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => navigate('/police/evidence')}>
                      Review Evidence
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/police/tasks')}>
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PoliceDashboard;
