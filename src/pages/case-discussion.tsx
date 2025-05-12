
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import CaseViewer from "@/components/case-viewer";
import CaseEditor from "@/components/case-editor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCaseById } from "@/utils/caseService";
import { ArrowLeft } from "lucide-react";
import FloatingAssistant from "@/components/floating-assistant";

const CaseDiscussion = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract userType from the URL path
  const pathParts = location.pathname.split("/");
  const userType = pathParts[1] as "public" | "police" | "lawyer" | "judge" | "admin";
  
  // State to track editing mode
  const [editMode, setEditMode] = useState<{
    active: boolean;
    section: "policeReport" | "lawyerBrief" | "judgeNotes" | null;
  }>({ active: false, section: null });
  
  // Generate placeholder user name based on role
  const getUserName = () => {
    switch(userType) {
      case "police": return "Officer Singh";
      case "lawyer": return "Adv. Sharma";
      case "judge": return "Hon. Justice Patel";
      case "admin": return "Admin User";
      default: return "Public User";
    }
  };

  // Fetching the case data
  const caseData = caseId ? getCaseById(caseId) : undefined;
  
  // Check if user has permission to edit based on role
  const canEdit = (section: "policeReport" | "lawyerBrief" | "judgeNotes") => {
    if (userType === "police" && section === "policeReport") return true;
    if (userType === "lawyer" && section === "lawyerBrief") return true;
    if (userType === "judge" && section === "judgeNotes") return true;
    return false;
  };
  
  // Handler for edit button clicks
  const handleEdit = (section: string) => {
    if (section === "policeReport" || section === "lawyerBrief" || section === "judgeNotes") {
      if (canEdit(section)) {
        setEditMode({ active: true, section });
      }
    }
  };
  
  // Handler for cancelling edits
  const handleCancelEdit = () => {
    setEditMode({ active: false, section: null });
  };
  
  // Handler for saving edits
  const handleSaveEdit = () => {
    setEditMode({ active: false, section: null });
  };
  
  // Redirect to dashboard if no case found
  if (caseId && !caseData) {
    return (
      <DashboardLayout
        userType={userType}
        userName={getUserName()}
      >
        <div className="space-y-6">
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
        </div>
        <FloatingAssistant userType={userType} userName={getUserName()} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userType={userType}
      userName={getUserName()}
    >
      <div className="space-y-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate(`/${userType}/dashboard`)}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
        
        {/* Case content */}
        {caseId && caseData && (
          <>
            {editMode.active && editMode.section && (
              <Card>
                <CardContent className="pt-6">
                  <CaseEditor
                    caseData={caseData}
                    section={editMode.section}
                    userType={userType}
                    userName={getUserName()}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                  />
                </CardContent>
              </Card>
            )}
            
            {!editMode.active && (
              <CaseViewer
                caseId={caseId}
                userType={userType}
                userName={getUserName()}
                onEdit={handleEdit}
              />
            )}
          </>
        )}
      </div>
      <FloatingAssistant userType={userType} userName={getUserName()} />
    </DashboardLayout>
  );
};

export default CaseDiscussion;
