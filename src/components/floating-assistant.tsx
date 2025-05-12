
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import CaseChat from "@/components/case-chat";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useLocation } from "react-router-dom";
import { generateCaseContext } from "@/utils/geminiService";
import { getCaseById } from "@/utils/caseService";

type UserType = "police" | "lawyer" | "judge" | "public" | "admin";

interface FloatingAssistantProps {
  userType: UserType;
  userName: string;
}

const FloatingAssistant = ({ userType, userName }: FloatingAssistantProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Extract case ID from URL if present
  const caseId = location.pathname.includes("/case/") 
    ? location.pathname.split("/case/")[1] 
    : undefined;
  
  // Get case details if we have a case ID
  const caseDetails = caseId ? getCaseById(caseId) : undefined;
  
  // Generate context for the AI based on user role and case (if available)
  const contextPrompt = caseDetails 
    ? generateCaseContext(caseId, caseDetails, userType)
    : `You are assisting a ${userType} user named ${userName}. Provide relevant information about legal processes, case management, and the Dharma system.`;

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full shadow-lg w-14 h-14 p-0 z-50"
        onClick={() => setOpen(true)}
        variant="default"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[85vh] max-h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle>AI Legal Assistant</DrawerTitle>
              <DrawerClose>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="px-4 py-2 flex-grow overflow-hidden h-[calc(85vh-65px)]">
            <CaseChat 
              caseId={caseId} 
              userRole={userType} 
              initialContext={contextPrompt} 
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FloatingAssistant;
