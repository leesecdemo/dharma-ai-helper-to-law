
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Calendar, Clock, MessageSquare, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CaseChat from "@/components/case-chat";
import { getCaseById, CaseFile } from "@/utils/caseService";

interface CaseViewerProps {
  caseId: string;
  userType: "public" | "police" | "lawyer" | "judge" | "admin";
  userName: string;
  onEdit?: (section: string) => void;
}

const CaseViewer: React.FC<CaseViewerProps> = ({
  caseId,
  userType,
  userName,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();
  const navigate = useNavigate();

  // In a real app, this would be fetched from an API
  const caseData = getCaseById(caseId);

  if (!caseData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Case Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The requested case could not be found or you don't have permission to view it.
            </p>
            <Button onClick={() => navigate(`/${userType}/dashboard`)}>
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generate context for the AI based on the case and user role
  const caseContext = `
    You are assisting with case ${caseId || "unknown"}. 
    This is a ${caseData.status} case filed on ${caseData.filingDate} ${caseData.court ? `at ${caseData.court}` : ""}.
    ${caseData.nextHearing ? `The next hearing is scheduled for ${caseData.nextHearing}.` : ""}
    
    ${caseData.policeReport ? `Police Report: ${caseData.policeReport}` : "No police report has been filed yet."}
    ${caseData.lawyerBrief ? `Lawyer Brief: ${caseData.lawyerBrief}` : "No lawyer brief has been filed yet."}
    ${caseData.judgeNotes ? `Judge Notes: ${caseData.judgeNotes}` : ""}
    
    You are speaking to a ${userType} user named ${userName}.
    ${
      userType === "police"
        ? "Provide information related to investigation procedures, evidence collection, and report filing requirements."
        : userType === "lawyer"
        ? "Provide information related to legal procedures, precedents, and brief preparation."
        : userType === "judge"
        ? "Provide information related to judicial procedures, applicable laws, and judgment considerations."
        : "Provide general information about the case status and process."
    }
    
    Do not give specific legal advice that would need to come from a qualified professional.
    Your role is to assist with understanding processes and requirements.
  `;

  const getStatusBadge = (status: CaseFile["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "filed":
        return <Badge className="bg-blue-500">Filed</Badge>;
      case "assigned":
        return <Badge className="bg-yellow-500">Assigned</Badge>;
      case "in_progress":
        return <Badge className="bg-green-500">In Progress</Badge>;
      case "pending_judgment":
        return <Badge className="bg-purple-500">Pending Judgment</Badge>;
      case "closed":
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleEditClick = (section: string) => {
    if (onEdit) {
      onEdit(section);
    } else {
      toast({
        title: "Edit not available",
        description: "You don't have permission to edit this section.",
        variant: "destructive",
      });
    }
  };

  const canEditPoliceReport = userType === "police";
  const canEditLawyerBrief = userType === "lawyer";
  const canEditJudgeNotes = userType === "judge";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{caseData.title}</h1>
            {getStatusBadge(caseData.status)}
          </div>
          <p className="text-muted-foreground">{caseData.description}</p>
        </div>
      </div>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Case ID</h3>
                  <p>{caseData.id}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Status</h3>
                  <p>{getStatusBadge(caseData.status)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Filing Date</h3>
                  <p>{caseData.filingDate}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Court</h3>
                  <p>{caseData.court || "Not assigned"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Next Hearing</h3>
                  <p>{caseData.nextHearing || "Not scheduled"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Police Report Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Police Report</CardTitle>
              {canEditPoliceReport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick("policeReport")}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {caseData.policeReport ? (
                <p className="whitespace-pre-wrap">{caseData.policeReport}</p>
              ) : (
                <p className="text-muted-foreground italic">No police report has been filed.</p>
              )}
            </CardContent>
          </Card>

          {/* Lawyer Brief Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lawyer Brief</CardTitle>
              {canEditLawyerBrief && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick("lawyerBrief")}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {caseData.lawyerBrief ? (
                <p className="whitespace-pre-wrap">{caseData.lawyerBrief}</p>
              ) : (
                <p className="text-muted-foreground italic">No lawyer brief has been filed.</p>
              )}
            </CardContent>
          </Card>

          {/* Judge Notes Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Judge Notes</CardTitle>
              {canEditJudgeNotes && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick("judgeNotes")}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {caseData.judgeNotes ? (
                <p className="whitespace-pre-wrap">{caseData.judgeNotes}</p>
              ) : (
                <p className="text-muted-foreground italic">No judge notes have been added.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Documents</CardTitle>
              <CardDescription>Documents related to this case</CardDescription>
            </CardHeader>
            <CardContent>
              {caseData.documents.length > 0 ? (
                <div className="space-y-4">
                  {caseData.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <span>Uploaded by {doc.uploadedBy.name}</span>
                            <span>•</span>
                            <span>{doc.uploadedOn}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border p-4 text-center">
                  <p className="text-muted-foreground">No documents available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Case History</CardTitle>
              <CardDescription>Timeline of actions taken on this case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseData.history.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      {index !== caseData.history.length - 1 && (
                        <div className="absolute top-8 bottom-0 w-0.5 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="font-medium">{item.action}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>By {item.user.name}</span>
                      </div>
                      {item.notes && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="mt-6">
          <CaseChat
            caseId={caseId}
            userRole={userType}
            initialContext={caseContext}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseViewer;
