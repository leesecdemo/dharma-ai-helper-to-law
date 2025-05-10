
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateCase, CaseFile } from "@/utils/caseService";

interface CaseEditorProps {
  caseData: CaseFile;
  section: "policeReport" | "lawyerBrief" | "judgeNotes";
  userType: "public" | "police" | "lawyer" | "judge" | "admin";
  userName: string;
  onCancel: () => void;
  onSave: () => void;
}

const CaseEditor: React.FC<CaseEditorProps> = ({
  caseData,
  section,
  userType,
  userName,
  onCancel,
  onSave,
}) => {
  const [content, setContent] = useState<string>(caseData[section] || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const user = { 
        id: `${userType}-123`, // This would come from auth context
        name: userName,
        role: userType
      };
      
      const updates = {
        [section]: content
      };
      
      // Update status if needed based on the section being updated
      if (section === "policeReport" && caseData.status === "draft") {
        updates.status = "filed" as const;
      } else if (section === "lawyerBrief" && (caseData.status === "assigned" || caseData.status === "filed")) {
        updates.status = "in_progress" as const;
      } else if (section === "judgeNotes" && caseData.status === "in_progress") {
        updates.status = "pending_judgment" as const;
      }
      
      const updatedCase = updateCase(caseData.id, updates, user);
      
      if (updatedCase) {
        toast({
          title: "Changes saved",
          description: `The ${section.replace(/([A-Z])/g, ' $1').toLowerCase()} has been updated successfully.`,
        });
        onSave();
      } else {
        throw new Error("Failed to update case");
      }
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSectionTitle = () => {
    switch(section) {
      case "policeReport": return "Police Report";
      case "lawyerBrief": return "Lawyer Brief";
      case "judgeNotes": return "Judge Notes";
      default: return "Edit Content";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{getSectionTitle()}</h2>
      
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Enter ${getSectionTitle().toLowerCase()} here...`}
        rows={12}
        className="w-full"
      />
      
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading || content === caseData[section]}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default CaseEditor;

