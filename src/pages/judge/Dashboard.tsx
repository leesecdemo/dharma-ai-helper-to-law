
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Gavel, Calendar, ArrowRight, MessageSquare } from "lucide-react";
import { getCases } from "@/utils/caseService";
import FloatingAssistant from "@/components/floating-assistant";

const JudgeDashboard = () => {
  const navigate = useNavigate();
  
  // Get cases from case service
  const allCases = getCases("judge");
  const pendingJudgmentCases = allCases.filter(c => c.status === "pending_judgment");
  
  // Calculate stats
  const stats = {
    totalCases: allCases.length,
    pendingJudgment: pendingJudgmentCases.length,
    upcomingHearings: allCases.filter(c => {
      if (!c.nextHearing) return false;
      const hearingDate = new Date(c.nextHearing);
      const today = new Date();
      return hearingDate >= today;
    }).length,
    casesWithoutNotes: allCases.filter(c => !c.judgeNotes).length,
  };

  // Get upcoming hearings
  const upcomingHearings = allCases
    .filter(c => c.nextHearing)
    .sort((a, b) => {
      const aDate = new Date(a.nextHearing || "");
      const bDate = new Date(b.nextHearing || "");
      return aDate.getTime() - bDate.getTime();
    })
    .slice(0, 4);

  return (
    <DashboardLayout userType="judge" userName="Hon. Justice Patel">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Judge Dashboard</h1>
          <p className="text-muted-foreground">Manage cases, hearings, and judgments.</p>
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
                All assigned cases
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Judgment</CardTitle>
              <Gavel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingJudgment}</div>
              <p className="text-xs text-muted-foreground">
                Cases awaiting judgment
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Hearings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingHearings}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled hearings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Notes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.casesWithoutNotes}</div>
              <p className="text-xs text-muted-foreground">
                Cases without judge notes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Pending Judgments</CardTitle>
              <CardDescription>
                Cases that require your judgment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingJudgmentCases.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No pending judgments
                  </div>
                ) : (
                  pendingJudgmentCases.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="mr-2">{item.id}</span>
                          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
                            Pending Judgment
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/judge/case/${item.id}`)}
                          title="View Case"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/judge/case/${item.id}`)}
                        >
                          Review Case
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/judge/cases')}>
                  View All Cases
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Hearings</CardTitle>
              <CardDescription>Your scheduled court hearings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingHearings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming hearings scheduled
                  </div>
                ) : (
                  upcomingHearings.map((item) => (
                    <div key={item.id} className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                          onClick={() => navigate(`/judge/case/${item.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/judge/hearings')}>
                  View All Hearings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingAssistant userType="judge" userName="Hon. Justice Patel" />
    </DashboardLayout>
  );
};

export default JudgeDashboard;
