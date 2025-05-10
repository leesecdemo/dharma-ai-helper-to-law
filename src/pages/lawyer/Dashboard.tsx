
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, ArrowRight, Clock } from "lucide-react";
import { getCases } from "@/utils/caseService";

const LawyerDashboard = () => {
  const navigate = useNavigate();
  
  // Get cases from case service
  const allCases = getCases("lawyer");
  const activeCases = allCases.filter(c => c.status !== "closed" && c.assignedTo?.some(user => user.role === "lawyer"));
  
  // Calculate stats
  const stats = {
    activeCases: activeCases.length,
    clientCount: [...new Set(activeCases.flatMap(c => c.assignedTo || []).filter(user => user.role === "public").map(user => user.id))].length || 18,
    upcomingHearings: activeCases.filter(c => c.nextHearing).length,
    pendingFilings: activeCases.filter(c => c.status === "assigned" && !c.lawyerBrief).length
  };

  // Get cases needing lawyer briefs
  const casesNeedingBriefs = activeCases.filter(c => !c.lawyerBrief);

  // Get upcoming hearings
  const upcomingHearings = [
    { 
      id: "HR-2023-045", 
      caseNumber: activeCases.length > 0 ? activeCases[0].id : "CIV-2023-124", 
      title: activeCases.length > 0 ? activeCases[0].title : "Mehta vs Sharma", 
      date: "Tomorrow, 11:00 AM",
      court: activeCases.length > 0 && activeCases[0].court ? activeCases[0].court : "Delhi High Court, Room 304"
    },
    { 
      id: "HR-2023-047", 
      caseNumber: activeCases.length > 1 ? activeCases[1].id : "CIV-2023-126", 
      title: activeCases.length > 1 ? activeCases[1].title : "ABC Corp vs XYZ Ltd", 
      date: "20 May, 2:30 PM",
      court: activeCases.length > 1 && activeCases[1].court ? activeCases[1].court : "Delhi District Court, Room 201"
    },
    { 
      id: "HR-2023-048", 
      caseNumber: activeCases.length > 2 ? activeCases[2].id : "CRM-2023-089", 
      title: activeCases.length > 2 ? activeCases[2].title : "State vs Kumar", 
      date: "22 May, 10:15 AM",
      court: activeCases.length > 2 && activeCases[2].court ? activeCases[2].court : "Sessions Court, Room 105"
    },
  ];

  return (
    <DashboardLayout userType="lawyer" userName="Adv. Sharma">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
          <p className="text-muted-foreground">Manage your cases, clients, and court schedule.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground">
                +2 new cases this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Count</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clientCount}</div>
              <p className="text-xs text-muted-foreground">
                +3 new clients this quarter
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
                In the next 14 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Briefs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingFilings}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Hearings</CardTitle>
              <CardDescription>
                Your scheduled court appearances for the next 14 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingHearings.map((item) => (
                  <div key={item.id} className="rounded-md border p-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.caseNumber}</div>
                      <div className="text-sm">{item.court}</div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/lawyer/case/${item.caseNumber}`)}>
                          View Case
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/lawyer/schedule')}>
                  View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>Your current active caseload.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCases.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No active cases to display
                  </div>
                ) : (
                  activeCases.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="mr-2">{item.id}</span>
                          <span className="text-xs text-muted-foreground">
                            ({item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.replace('_', ' ').slice(1)})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          {item.nextHearing ? `Next: ${item.nextHearing}` : "No hearing scheduled"}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/lawyer/case/${item.id}`)}>
                          <ArrowRight className="h-4 w-4" />
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
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Cases Requiring Action</CardTitle>
            <CardDescription>
              Cases that need your legal input.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {casesNeedingBriefs.length === 0 ? (
                <div className="rounded-md border p-4 text-center">
                  <p className="text-muted-foreground">All cases have been reviewed and briefed.</p>
                </div>
              ) : (
                casesNeedingBriefs.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                      <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">Case {item.id} requires legal brief</p>
                      <p className="text-xs text-muted-foreground">
                        Filed on {item.filingDate}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/lawyer/case/${item.id}`)}>
                      Review Case
                    </Button>
                  </div>
                ))
              )}
              
              <Button variant="outline" className="w-full" onClick={() => navigate('/lawyer/cases')}>
                View All Cases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LawyerDashboard;
