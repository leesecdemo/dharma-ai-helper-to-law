
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import CaseChat from "@/components/case-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const CaseDiscussion = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const location = useLocation();
  
  // Extract userType from the URL path
  const pathParts = location.pathname.split("/");
  const userType = pathParts[1] as "public" | "police" | "lawyer" | "judge" | "admin";
  
  // In a real app, these would be fetched from an API based on the caseId
  const caseDetails = {
    title: `Case ${caseId || "Discussion"}`,
    description: "Case details would be loaded from the database",
    status: "Active",
    filingDate: "2023-04-15",
    court: "District Court, Delhi",
    nextHearing: "2023-05-30"
  };
  
  // Context for the AI about this specific case
  const caseContext = `
    You are assisting with case ${caseId || "unknown"}. 
    This is a ${caseDetails.status.toLowerCase()} case filed on ${caseDetails.filingDate} at ${caseDetails.court}.
    The next hearing is scheduled for ${caseDetails.nextHearing}.
    Provide helpful information and guidance related to legal processes, documentation requirements, and procedural advice.
    Do not give specific legal advice that would need to come from a qualified lawyer.
    Your role is to assist with understanding processes and requirements, not to provide legal opinions.
  `;

  return (
    <DashboardLayout
      userType={userType}
      userName={`${userType.charAt(0).toUpperCase() + userType.slice(1)} User`}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{caseDetails.title}</h1>
          <p className="text-muted-foreground">{caseDetails.description}</p>
        </div>
        
        <Tabs defaultValue="chat">
          <TabsList>
            <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            <TabsTrigger value="details">Case Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-6">
            <CaseChat
              caseId={caseId}
              userRole={userType}
              initialContext={caseContext}
            />
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-muted-foreground">Case ID</h3>
                    <p>{caseId || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Status</h3>
                    <p>{caseDetails.status}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Filing Date</h3>
                    <p>{caseDetails.filingDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Court</h3>
                    <p>{caseDetails.court}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Next Hearing</h3>
                    <p>{caseDetails.nextHearing}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Case Summary</h3>
                  <p className="text-muted-foreground">
                    This is a placeholder for the case summary. In a real application, this would contain
                    details about the case, its history, parties involved, and current status.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This section would display all documents related to the case.
                  Users could upload, download, and view documents based on their permissions.
                </p>
                
                <div className="rounded-md border p-4 text-center">
                  <p>No documents available for this demo.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CaseDiscussion;
