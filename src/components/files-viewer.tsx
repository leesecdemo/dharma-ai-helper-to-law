
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, File as FileIcon, FileText, FileImage, FileAudio, File, FileArchive, FileVideo } from "lucide-react";
import FileUploader from "./file-uploader";

interface FileAttachment {
  id: string;
  case_id: string;
  file_name: string;
  file_type: string;
  file_path: string;
  file_size: number;
  uploaded_by_name: string;
  uploaded_by_role: string;
  uploaded_at: string;
  description: string | null;
}

interface FilesViewerProps {
  caseId: string;
  userType: "public" | "police" | "lawyer" | "judge" | "admin";
  userName: string;
}

const FilesViewer: React.FC<FilesViewerProps> = ({ caseId, userType, userName }) => {
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('case_attachments')
        .select('*')
        .eq('case_id', caseId)
        .order('uploaded_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error fetching files",
        description: "Could not load case attachments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFiles();
  }, [caseId]);
  
  const handleDownload = async (file: FileAttachment) => {
    try {
      const { data, error } = await supabase.storage
        .from('case-files')
        .download(file.file_path);
      
      if (error) {
        throw error;
      }
      
      // Create a URL for the file and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.file_name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Could not download the file",
        variant: "destructive",
      });
    }
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <FileImage className="h-8 w-8" />;
    if (fileType.startsWith('audio/')) return <FileAudio className="h-8 w-8" />;
    if (fileType.startsWith('video/')) return <FileVideo className="h-8 w-8" />;
    if (fileType === 'application/pdf') return <File className="h-8 w-8" />; // Changed from FilePdf to File
    if (fileType.includes('zip') || fileType.includes('compressed')) return <FileArchive className="h-8 w-8" />;
    if (fileType.includes('text') || fileType.includes('document')) return <FileText className="h-8 w-8" />;
    return <FileIcon className="h-8 w-8" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New File</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader
            caseId={caseId}
            userType={userType}
            userName={userName}
            onFileUploaded={fetchFiles}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Case Files</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No files have been uploaded to this case yet.
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex-shrink-0 mr-4 text-primary">
                    {getFileIcon(file.file_type)}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-base font-medium">{file.file_name}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                      <span>Uploaded by {file.uploaded_by_name} ({file.uploaded_by_role})</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{new Date(file.uploaded_at).toLocaleString()}</span>
                    </div>
                    {file.description && (
                      <p className="mt-1 text-sm">{file.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(file)}
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilesViewer;
