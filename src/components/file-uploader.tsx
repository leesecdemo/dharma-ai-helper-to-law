
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FileUploaderProps {
  caseId: string;
  userType: "public" | "police" | "lawyer" | "judge" | "admin";
  userName: string;
  onFileUploaded: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  caseId, 
  userType, 
  userName,
  onFileUploaded 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const resetForm = () => {
    setFile(null);
    setDescription("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // 1. Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${caseId}/${Date.now()}-${file.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('case-files')
        .upload(filePath, file);
      
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      
      // 2. Store metadata in the case_attachments table
      const { error: dbError } = await supabase.from('case_attachments').insert({
        case_id: caseId,
        file_name: file.name,
        file_type: file.type,
        file_path: filePath,
        file_size: file.size,
        uploaded_by_id: `${userType}-123`, // In a real app, use actual user ID
        uploaded_by_role: userType,
        uploaded_by_name: userName,
        description: description
      });
      
      if (dbError) {
        throw new Error(dbError.message);
      }
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded to the case.`,
      });
      
      resetForm();
      onFileUploaded();
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">Select File</Label>
        <Input
          id="file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      
      {file && (
        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/30">
          <File className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
        </div>
      )}
      
      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description of this file..."
          disabled={isUploading}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          disabled={isUploading || !file}
        >
          Clear
        </Button>
        <Button type="submit" disabled={isUploading || !file}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default FileUploader;
