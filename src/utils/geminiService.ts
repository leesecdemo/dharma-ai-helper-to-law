
const GEMINI_API_KEY = "AIzaSyBiqQk1eN8Jfyt0b2Ye2XUy9H9XUDNR1Ns"; // This is a public key since it's used client-side

export interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

export interface ChatResponse {
  text: string;
  error?: string;
}

export async function sendMessageToGemini(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.parts }],
        })),
        generationConfig: {
          temperature: 0.9,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return { 
        text: "", 
        error: data.error?.message || "Failed to get response from Gemini" 
      };
    }

    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "", 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

// Function to generate case-specific context for the AI based on case details
export const generateCaseContext = (caseId: string, caseDetails: any, userRole: string): string => {
  return `
    You are assisting with case ${caseId || "unknown"}. 
    This is a ${caseDetails.status} case filed on ${caseDetails.filingDate} ${caseDetails.court ? `at ${caseDetails.court}` : ""}.
    ${caseDetails.nextHearing ? `The next hearing is scheduled for ${caseDetails.nextHearing}.` : ""}
    
    ${caseDetails.policeReport ? `Police Report: ${caseDetails.policeReport}` : "No police report has been filed yet."}
    ${caseDetails.lawyerBrief ? `Lawyer Brief: ${caseDetails.lawyerBrief}` : "No lawyer brief has been filed yet."}
    ${caseDetails.judgeNotes ? `Judge Notes: ${caseDetails.judgeNotes}` : ""}
    
    You are speaking to a ${userRole} user.
    ${
      userRole === "police"
        ? "Provide information related to investigation procedures, evidence collection, and report filing requirements."
        : userRole === "lawyer"
        ? "Provide information related to legal procedures, precedents, and brief preparation."
        : userRole === "judge"
        ? "Provide information related to judicial procedures, applicable laws, and judgment considerations."
        : userRole === "admin"
        ? "Provide comprehensive information about the case and system administration options."
        : "Provide general information about the case status and process."
    }
    
    Do not give specific legal advice that would need to come from a qualified professional.
    Your role is to assist with understanding processes and requirements, not to provide legal opinions.
  `;
};
