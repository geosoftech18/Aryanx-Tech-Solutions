// ...existing code...
"use client";

import { getResumeDownloadLinkAction } from "@/actions/digitalOcean/upload-resume";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ResumeModalProps {
  candidateId?: string;
  candidateName?: string;
  triggerText?: string;
  triggerVariant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  triggerIcon?: boolean;
  className?: string;

  // new props
  allowDownload?: boolean; // show download/open buttons (default true)
  resumeUrl?: string; // if provided, use this URL for viewing instead of fetching
  isOpen?: boolean;
  onClose?: () => void;
}

export function ResumeModal({
  candidateId,
  candidateName = "Candidate",
  triggerText = "View Resume",
  triggerVariant = "outline",
  triggerSize = "sm",
  triggerIcon = true,
  className = "",
  allowDownload = true,
  resumeUrl,
  isOpen: externalIsOpen,
  onClose
}: ResumeModalProps) {
  // ...existing code...
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<{
    downloadUrl: string;
    metadata: {
      filename: string;
      uploadDate: Date;
      candidateName: string;
    };
  } | null>(null);

  // Controlled vs uncontrolled open state
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof externalIsOpen === "boolean";
  const open = isControlled ? !!externalIsOpen : internalOpen;

  const setIsOpen = (val: boolean) => {
    if (isControlled) {
      // If parent provided onClose, call it when closing
      if (!val && onClose) onClose();
    } else {
      setInternalOpen(val);
    }
    // If opening, ensure resume data is loaded
    if (val) {
      // fire-and-forget, handleOpenResume manages its own errors
      void handleOpenResume();
    }
  };

  // If parent controls `isOpen`, open should trigger loading resume
  useEffect(() => {
    if (open) {
      void handleOpenResume();
    }
  }, [open]);

  const handleOpenResume = async () => {
    // if already loaded, just open
    if (resumeData) return;

    // If a resumeUrl prop is provided, use it and avoid server call
    if (resumeUrl) {
      setResumeData({
        downloadUrl: resumeUrl,
        metadata: {
          filename: resumeUrl.split("/").pop() || "resume.pdf",
          uploadDate: new Date(),
          candidateName,
        },
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
        if (!candidateId) {
          setError("Candidate ID not provided to fetch resume");
          return;
        }

        const result = await getResumeDownloadLinkAction(candidateId);

      if (result.success && result.downloadUrl && result.metadata) {
        setResumeData({
          downloadUrl: result.downloadUrl,
          metadata: {
            filename: result.metadata.filename || "resume.pdf",
            uploadDate: result.metadata.uploadDate ? new Date(result.metadata.uploadDate) : new Date(),
            candidateName: result.metadata.candidateName || candidateName,
          },
        });
      } else {
        setError(result.error || "Failed to load resume");
      }
    } catch  {
      setError("Failed to load resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (resumeData?.downloadUrl) {
      window.open(resumeData.downloadUrl, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={className}
          onClick={handleOpenResume}
        >
          {triggerIcon && <FileText className="h-4 w-4 mr-1" />}
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {candidateName}&apos;s Resume
            </span>

            {resumeData && (
              <div className="flex items-center gap-2">
                

                {/* show download / open buttons only when allowed */}
                {allowDownload && (
                  <>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      variant="default"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open in New Tab
                    </Button>
                  </>
                )}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading resume...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-4 text-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <div>
                  <h3 className="font-semibold text-destructive">Failed to Load Resume</h3>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                  <Button onClick={handleOpenResume} variant="outline" size="sm" className="mt-3">
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {resumeData && !isLoading && !error && (
            <div className="h-full overflow-scroll-y">
              <iframe
                src={`${resumeData.downloadUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full min-h-[600px] overflow-y-scroll border rounded-md"
                title={`${candidateName}'s Resume`}
                onError={() => setError("Failed to display PDF. Click 'Open in New Tab' to view.")}
              />

              {/* Fallback for browsers that don't support iframe PDF viewing */}
              <div className=" p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">If the resume doesn&apos;t display above, you can:</p>
                <div className="flex gap-2 mt-2">
                  {allowDownload ? (
                    <>
                      <Button onClick={handleDownload} size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Download PDF
                      </Button>
                      <Button onClick={handleDownload} size="sm" variant="default" className="flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Open in New Tab
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => navigator.clipboard.writeText(resumeData.downloadUrl)} size="sm" variant="outline">
                      Copy Link
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {resumeData && (
          <div className="border-t pt-4 text-xs text-muted-foreground">
            <div className="flex justify-between items-center">
              <span>Uploaded: {new Date(resumeData.metadata.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ResumeModal;