
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, ArrowRight, Clock } from "lucide-react";

const LawyerDashboard = () => {
  const navigate = useNavigate();
  
  // In a real app, this would be fetched from an API
  const stats = {
    activeCases: 12,
    clientCount: 18,
    upcomingHearings: 5,
    pendingFilings: 3
  };

  const upcomingHearings = [
    { 
      id: "HR-2023-045", 
      caseNumber: "CIV-2023-124", 
      title: "Mehta vs Sharma", 
      date: "Tomorrow, 11:00 AM",
      court: "Delhi High Court, Room 304" 
    },
    { 
      id: "HR-2023-047", 
      caseNumber: "CIV-2023-126", 
      title: "ABC Corp vs XYZ Ltd", 
      date: "20 May, 2:30 PM",
      court: "Delhi District Court, Room 201" 
    },
    { 
      id: "HR-2023-048", 
      caseNumber: "CRM-2023-089", 
      title: "State vs Kumar", 
      date: "22 May, 10:15 AM",
      court: "Sessions Court, Room 105" 
    },
  ];

  const activeCases = [
    { id: "CIV-2023-124", title: "Mehta vs Sharma", type: "Property Dispute", status: "Active", nextDate: "Tomorrow" },
    { id: "CRM-2023-089", title: "State vs Kumar", type: "Criminal Defense", status: "Active", nextDate: "22 May" },
    { id: "CIV-2023-126", title: "ABC Corp vs XYZ Ltd", type: "Contract Dispute", status: "Active", nextDate: "20 May" },
    { id: "CIV-2023-118", title: "Singh vs Municipal Corp", type: "Public Interest", status: "Pending", nextDate: "1 Jun" },
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
              <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
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
                        <Button variant="outline" size="sm" onClick={() => navigate(`/lawyer/schedule/${item.id}`)}>
                          View Details
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
                {activeCases.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2">{item.id}</span>
                        <span className="text-xs text-muted-foreground">({item.type})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Next: {item.nextDate}</div>
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/lawyer/cases/${item.id}`)}>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/lawyer/cases')}>
                  View All Cases
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Case Notifications</CardTitle>
            <CardDescription>
              Recent updates about your cases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">New Document Available</p>
                  <p className="text-sm text-muted-foreground">Police report uploaded for case CRM-2023-089</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/lawyer/cases/CRM-2023-089')}>
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Hearing Date Changed</p>
                  <p className="text-sm text-muted-foreground">New date set for case CIV-2023-118</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/lawyer/schedule')}>
                  View
                </Button>
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate('/lawyer/notifications')}>
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LawyerDashboard;
