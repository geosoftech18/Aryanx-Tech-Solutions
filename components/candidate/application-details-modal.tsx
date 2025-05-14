"use client";

import { getApplicationDetails } from "@/actions/application/employer-actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Application, ApplicationStatus, Candidate, Certification, Company, Education, Job, User, WorkExperience } from "@prisma/client";
import { FileText } from "lucide-react";
import React, { useState } from "react";

// Type for the application details returned by the server action
interface ApplicationDetails extends Application {
  job: Job & { company: Company };
  Candidate: (Candidate & {
    user: User;
    education: Education[];
    WorkExperience: WorkExperience[];
    certifications: Certification[];
  }) | null;
}

interface ApplicationDetailsModalProps {
  applications: (Application & Job & Company)[];
}

/**
 * ApplicationDetailsModal
 * Renders a list of applications with a View (eye) button for each.
 * Handles all client logic for modal state and fetching details.
 */
const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({ applications }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [, setSelectedApplicationId] = useState<string | null>(null);
  const [details, setDetails] = useState<ApplicationDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleView = async (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setModalOpen(true);
    setLoading(true);
    setError(null);
    try {
      const data = await getApplicationDetails(applicationId);
      setDetails(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch application details");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedApplicationId(null);
    setDetails(null);
    setError(null);
  };

  // Helper for status badge
  const getStatusVariant = (
    status: ApplicationStatus
  ): "destructive" | "default" | "secondary" => {
    switch (status) {
      case ApplicationStatus.REJECTED:
        return "destructive";
      case ApplicationStatus.ACCEPTED:
      case ApplicationStatus.INTERVIEW:
        return "default";
      default:
        return "secondary";
    }
  };

  // Helper for status icon
  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.REJECTED:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        );
      case ApplicationStatus.ACCEPTED:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check-circle"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case ApplicationStatus.INTERVIEW:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar-check"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
            <path d="m9 16 2 2 4-4" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-hourglass"
          >
            <path d="M5 22h14" />
            <path d="M5 2h14" />
            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
          </svg>
        );
    }
  };

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id} className="overflow-hidden transition-all duration-200 hover:shadow-md group border rounded-lg mb-4">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-5">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    {/* <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=${application.name.substring(0, 2)}`}
                      alt={application.name}
                    /> */}
                    <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                      {application.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {application.title}
                    </h3>
                    <p className="text-muted-foreground">{application.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin mr-1"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {application.location.map((loc) => loc).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
                  <Badge
                    variant={getStatusVariant(application.status)}
                    className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1"
                  >
                    {getStatusIcon(application.status)}
                    {application.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1" /> Applied: {new Date(application.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:flex-col justify-between border-t md:border-t-0 md:border-l p-3 bg-muted/30">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8"
                onClick={() => handleView(application.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye mr-1"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Dialog open={modalOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              View all information submitted for this application.
            </DialogDescription>
          </DialogHeader>
          {loading && <div className="py-8 text-center">Loading...</div>}
          {error && <div className="py-8 text-center text-destructive">{error}</div>}
          {details && (
            <div className="space-y-6">
              {/* Job & Company Info */}
              <section>
                <h3 className="font-semibold text-lg mb-1">Job Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Title:</span> {details.job.title}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {details.job.location.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {details.job.type}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {details.job.category}
                  </div>
                  <div>
                    <span className="font-medium">Salary:</span> {details.job.salary ? `$${details.job.salary}` : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span> {new Date(details.job.deadline).toLocaleDateString()}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Description:</span> {details.job.description}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Company:</span> {details.job.company.name} ({details.job.company.industry})
                  </div>
                </div>
              </section>
              {/* Candidate Info */}
              {details.Candidate && (
                <section>
                  <h3 className="font-semibold text-lg mb-1">Candidate Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">Name:</span> {details.Candidate.user.firstname} {details.Candidate.user.lastname}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {details.Candidate.user.email}
                    </div>
                    <div>
                      <span className="font-medium">Contact:</span> {details.Candidate.contact}
                    </div>
                    <div>
                      <span className="font-medium">Gender:</span> {details.Candidate.gender}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {details.Candidate.candidateType}
                    </div>
                    <div>
                      <span className="font-medium">YOE:</span> {details.Candidate.YOE}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Bio:</span> {details.Candidate.Bio}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Skills:</span> {details.Candidate.skills.join(", ")}
                    </div>
                    {details.Candidate.resume && (
                      <div className="col-span-2">
                        <span className="font-medium">Resume:</span> <a href={details.Candidate.resume} target="_blank" rel="noopener noreferrer" className="text-primary underline">View Resume</a>
                      </div>
                    )}
                  </div>
                  {/* Education */}
                  <div className="mt-3">
                    <h4 className="font-semibold">Education</h4>
                    {details.Candidate.education.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {details.Candidate.education.map((edu) => (
                          <li key={edu.id}>
                            {edu.degree} in {edu.specialisation} from {edu.institution} ({new Date(edu.passout_year).getFullYear()}) - CGPA: {edu.CGPA}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">No education details</span>
                    )}
                  </div>
                  {/* Work Experience */}
                  <div className="mt-3">
                    <h4 className="font-semibold">Work Experience</h4>
                    {details.Candidate.WorkExperience.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {details.Candidate.WorkExperience.map((exp) => (
                          <li key={exp.id}>
                            {exp.position} at {exp.companyName} ({new Date(exp.startDate).getFullYear()} - {exp.currentlyWorking ? "Present" : new Date(exp.endDate).getFullYear()})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">No work experience</span>
                    )}
                  </div>
                  {/* Certifications */}
                  <div className="mt-3">
                    <h4 className="font-semibold">Certifications</h4>
                    {details.Candidate.certifications.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {details.Candidate.certifications.map((cert) => (
                          <li key={cert.id}>
                            {cert.name} from {cert.company} ({new Date(cert.issueDate).getFullYear()})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">No certifications</span>
                    )}
                  </div>
                </section>
              )}
              {/* Application Info */}
              <section>
                <h3 className="font-semibold text-lg mb-1">Application Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Status:</span> <Badge>{details.status}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Applied On:</span> {new Date(details.createdAt).toLocaleDateString()}
                  </div>
                  {details.coverLetter && (
                    <div className="col-span-2">
                      <span className="font-medium">Cover Letter:</span> {details.coverLetter}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationDetailsModal; 