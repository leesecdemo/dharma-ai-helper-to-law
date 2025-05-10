
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendMessageToGemini, ChatMessage as GeminiMessage } from "@/utils/geminiService";
import { Loader2, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

interface CaseChatProps {
  caseId?: string;
  userRole: "public" | "police" | "lawyer" | "judge" | "admin";
  initialContext?: string;
}

const CaseChat: React.FC<CaseChatProps> = ({ caseId, userRole, initialContext }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize the chat with context about the case and user role
  useEffect(() => {
    const initializeChat = async () => {
      if (!messages.length && initialContext) {
        setIsLoading(true);
        try {
          const systemPrompt = `You are an AI legal assistant for the Dharma platform. The user is a ${userRole}${caseId ? ` working on case ${caseId}` : ""}. ${initialContext || ""}`;
          
          const response = await sendMessageToGemini([
            { role: "user", parts: systemPrompt }
          ]);
          
          if (response.error) {
            toast({
              title: "Error initializing chat",
              description: response.error,
              variant: "destructive"
            });
            return;
          }
          
          setMessages([
            {
              role: "model",
              content: response.text || "Hello, I'm your legal assistant. How can I help you with your case today?",
              timestamp: new Date()
            }
          ]);
        } catch (error) {
          console.error("Error initializing chat:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    initializeChat();
  }, [caseId, initialContext, userRole, messages.length, toast]);

  // Auto scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the Gemini API
      const geminiMessages: GeminiMessage[] = messages.concat(userMessage).map(msg => ({
        role: msg.role,
        parts: msg.content
      }));
      
      const response = await sendMessageToGemini(geminiMessages);
      
      if (response.error) {
        toast({
          title: "Error from AI",
          description: response.error,
          variant: "destructive"
        });
        return;
      }
      
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          content: response.text,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full">
      <CardHeader className="bg-background border-b">
        <CardTitle>Case Assistant{caseId ? ` - Case ${caseId}` : ""}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0">
        <div className="flex-grow overflow-y-auto p-4">
          {messages.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Start a conversation about this case
            </div>
          )}
          
          {isLoading && messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === "user" ? "flex flex-row-reverse" : "flex"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center text-xs">
                      AI
                    </div>
                  )}
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form
          onSubmit={handleSendMessage}
          className="border-t p-4 flex gap-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CaseChat;
