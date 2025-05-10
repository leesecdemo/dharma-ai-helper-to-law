
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, Calendar, CheckCheck, ArrowRight } from "lucide-react";
import { getCases } from "@/utils/caseService";

const JudgeDashboard = () => {
  const navigate = useNavigate();
  
  // Get cases from case service
  const allCases = getCases("judge");
  const assignedCases = allCases.filter(c => c.assignedTo?.some(user => user.role === "judge"));
  const pendingJudgmentCases = assignedCases.filter(c => c.status === "pending_judgment" && !c.judgeNotes);
  
  // Calculate stats
  const stats = {
    pendingCases: assignedCases.filter(c => c.status !== "closed").length || 127,
    todayHearings: 8, // Would come from a calendar service in real app
    casesDisposed: assignedCases.filter(c => c.status === "closed").length || 43,
    judgmentsPending: pendingJudgmentCases.length || 12
  };

  // Dummy hearings data for today - in a real app, this would come from a calendar service
  const todayHearings = [
    { 
      id: "HR-2023-056", 
      caseNumber: assignedCases.length > 0 ? assignedCases[0].id : "CRL-2023-189", 
      title: assignedCases.length > 0 ? assignedCases[0].title : "State vs Prakash", 
      time: "11:00 AM",
      type: "Bail Hearing" 
    },
    { 
      id: "HR-2023-057", 
      caseNumber: assignedCases.length > 1 ? assignedCases[1].id : "CIV-2023-234", 
      title: assignedCases.length > 1 ? assignedCases[1].title : "Gupta vs Reddy", 
      time: "12:30 PM",
      type: "Motion Hearing" 
    },
    { 
      id: "HR-2023-058", 
      caseNumber: assignedCases.length > 2 ? assignedCases[2].id : "CRL-2023-190", 
      title: assignedCases.length > 2 ? assignedCases[2].title : "State vs Verma & Others", 
      time: "2:15 PM",
      type: "Evidence Presentation" 
    },
    { 
      id: "HR-2023-059", 
      caseNumber: assignedCases.length > 3 ? assignedCases[3].id : "CIV-2023-235", 
      title: assignedCases.length > 3 ? assignedCases[3].title : "Kumar vs Municipal Corp.", 
      time: "3:30 PM",
      type: "Final Arguments" 
    },
  ];

  return (
    <DashboardLayout userType="judge" userName="Hon. Justice Patel">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Judicial Dashboard</h1>
          <p className="text-muted-foreground">Manage your case docket and court schedule.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingCases}</div>
              <p className="text-xs text-muted-foreground">
                In your current docket
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Hearings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayHearings}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled for today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cases Disposed</CardTitle>
              <CheckCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.casesDisposed}</div>
              <p className="text-xs text-muted-foreground">
                In the past 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Judgments Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.judgmentsPending}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Hearings</CardTitle>
            <CardDescription>
              Scheduled cases for today in your courtroom.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayHearings.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.caseNumber}</span>
                        <span>•</span>
                        <span>{item.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{item.time}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => navigate(`/judge/case/${item.caseNumber}`)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/judge/hearings')}>
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pending Judgments</CardTitle>
              <CardDescription>
                Cases requiring judgment pronouncement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingJudgmentCases.length === 0 ? (
                  <div className="rounded-md border p-4 text-center">
                    <p className="text-muted-foreground">No pending judgments at this time.</p>
                  </div>
                ) : (
                  pendingJudgmentCases.slice(0, 2).map((item) => (
                    <div key={item.id} className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                      <p className="font-semibold text-amber-800 dark:text-amber-300">{item.id}: {item.title}</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        Case in progress since {item.filingDate}
                      </p>
                      <div className="mt-3 flex justify-end">
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
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/judge/judgments')}>
                  View All Pending Judgments
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Case Notifications</CardTitle>
              <CardDescription>
                Recent updates in your assigned cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New Case Assignment</p>
                    <p className="text-sm text-muted-foreground">
                      Case {allCases.length > 0 ? allCases[0].id : "CIV-2023-240"} has been assigned to your court
                    </p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(`/judge/case/${allCases.length > 0 ? allCases[0].id : "CIV-2023-240"}`)}
                  >
                    View
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Schedule Change</p>
                    <p className="text-sm text-muted-foreground">
                      Hearing rescheduled for case {allCases.length > 1 ? allCases[1].id : "CRL-2023-189"}
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/judge/schedule')}>
                    View
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => navigate('/judge/notifications')}>
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JudgeDashboard;
