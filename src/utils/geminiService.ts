
const GEMINI_API_KEY = "AIzaSyBiqQk1eN8Jfyt0b2Ye2XUy9H9XUDNR1Ns"; // This is a public key since it's used client-side

interface ChatMessage {
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
