
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Clock, ArrowRight, Users, AlertCircle } from "lucide-react";

const PublicDashboard = () => {
  const navigate = useNavigate();
  
  // In a real app, this would be fetched from an API
  const stats = {
    activeCases: 2,
    upcomingHearings: 1,
    documentsRequired: 3,
    assignedLawyers: 1
  };

  const myCases = [
    { 
      id: "PB-2023-042", 
      title: "Property Dispute with Neighbor", 
      status: "Active", 
      court: "Delhi District Court",
      nextHearing: "28 May, 2023"
    },
    { 
      id: "PB-2023-038", 
      title: "Insurance Claim Dispute", 
      status: "Pending", 
      court: "Consumer Forum",
      nextHearing: "Awaiting date"
    },
  ];

  return (
    <DashboardLayout userType="public" userName="Rahul Singh">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">Track your legal cases and proceedings.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground">
                Active in the system
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
                In the next 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents Required</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.documentsRequired}</div>
              <p className="text-xs text-muted-foreground">
                Pending submission
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Lawyers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assignedLawyers}</div>
              <p className="text-xs text-muted-foreground">
                Currently representing you
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>My Cases</CardTitle>
            <CardDescription>
              Track the status of your ongoing legal cases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCases.map((item) => (
                <div key={item.id} className="rounded-md border p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.title}</h4>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Case ID: {item.id}</p>
                    <p className="text-sm text-muted-foreground">Court: {item.court}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Next Hearing: {item.nextHearing}</span>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/public/cases/${item.id}/documents`)}>
                        View Documents
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/public/cases/${item.id}/details`)}>
                        Case Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/public/cases')}>
                View All Cases
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Required Actions</CardTitle>
              <CardDescription>
                Tasks requiring your immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Document Submission</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Please upload your identity proof for case PB-2023-042</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => navigate('/public/cases/PB-2023-042/upload')}>
                      Upload Documents
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Upcoming Hearing</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Prepare for your court appearance on 28 May</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => navigate('/public/hearings/HR-2023-078')}>
                      View Details
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/public/tasks')}>
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>My Legal Team</CardTitle>
              <CardDescription>
                Lawyers representing your cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Adv. Sharma</p>
                    <p className="text-sm text-muted-foreground">Property Law Specialist</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Bar Council ID: LW5678</span>
                      <span>•</span>
                      <span>5+ years experience</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" onClick={() => navigate('/public/lawyers/LW5678')}>
                      Contact
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/public/find-lawyer')}>
                    Find a Lawyer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>
              Latest activity on your cases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Hearing Date Scheduled</p>
                  <p className="text-sm text-muted-foreground">Your case PB-2023-042 has been scheduled for hearing on 28 May, 2023</p>
                  <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => navigate('/public/cases/PB-2023-042')}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Lawyer Assigned</p>
                  <p className="text-sm text-muted-foreground">Adv. Sharma has been assigned to your case PB-2023-042</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => navigate('/public/lawyers/LW5678')}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => navigate('/public/activity')}>
                View All Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PublicDashboard;
