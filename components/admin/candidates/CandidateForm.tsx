"use client";

import { createCandidateAdmin } from "@/actions/admin/candidates/create-candidate";
import { listCandidates } from "@/actions/admin/candidates/list-candidates";
import { updateCandidateAdmin } from "@/actions/admin/candidates/update-candidate";
import { listUsers } from "@/actions/admin/users/list-users";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ComboboxName } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datePicker";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CandidateType,
    Gender,
    LGBTQ,
    Prisma,
    PwdCategory,
    Role,
} from "@prisma/client";
import { Check, Plus, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Zod schema for candidate form validation
const candidateFormSchema = z.object({
  candidateType: z.nativeEnum(CandidateType),
  gender: z.nativeEnum(Gender),
  YOE: z.number().min(0, "YOE is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  Bio: z.string(),
  DOB: z.date(),
  resume: z.string().optional(),
  LGBTQ: z.nativeEnum(LGBTQ).optional(),
  pwdCategory: z.nativeEnum(PwdCategory).optional(),
  employmentBreak: z.string().optional(),
  contact: z.string().min(5, "Contact is required"),
  user: z.object({
    connect: z.object({
      id: z.string(),
    }),
  }),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        specialisation: z.string().min(1, "Specialisation is required"),
        institution: z.string().min(1, "Institution is required"),
        passout_year: z.date(),
        CGPA: z.number(),
      })
    )
    .min(1, "At least one education record is required"),
  certifications: z
    .array(
      z.object({
        name: z.string().min(1, "Certification name is required"),
        company: z.string().min(1, "Company is required"),
        issueDate: z.date(),
        expirationDate: z.date(),
      })
    )
    .optional(),
  WorkExperience: z
    .array(
      z.object({
        companyName: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        startDate: z.date(),
        endDate: z.date(),
        currentlyWorking: z.boolean(),
        jobDescription: z.string(),
      })
    )
    .optional(),
}) satisfies z.ZodType<
  Prisma.CandidateCreateInput & {
    education: Prisma.EducationCreateWithoutCandidateInput[];
    certifications?: Prisma.CertificationCreateWithoutCandidateInput[];
    WorkExperience?: Prisma.WorkExperienceCreateWithoutCandidateInput[];
  }
>;

type CandidateFormValues = z.infer<typeof candidateFormSchema>;

// Add types for education, work experience, and certification
// type EducationInput = Prisma.EducationCreateWithoutCandidateInput;
// type WorkExperienceInput = Prisma.WorkExperienceCreateWithoutCandidateInput;
// type CertificationInput = Prisma.CertificationCreateWithoutCandidateInput;

/**
 * CandidateForm component for admin to create or edit a candidate.
 * Uses shadcn/ui combobox for enums, input/textarea for text, and Zod for validation.
 */
export default function CandidateForm({
  initialData,
  candidateId,
}: {
  initialData: Partial<CandidateFormValues> | null;
  candidateId: string | null;
}) {
  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: initialData || {
      YOE: 0,
      skills: [],
      Bio: "",
      DOB: new Date(),
      resume: "",
      LGBTQ: undefined,
      pwdCategory: undefined,
      employmentBreak: "",
      contact: "",
      user: {
        connect: {
          id: "",
        },
      },
      education: [
        {
          degree: "",
          specialisation: "",
          institution: "",
          passout_year: new Date(),
          CGPA: 0,
        },
      ],
      certifications: [],
      WorkExperience: [],
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const candidateType = form.watch("candidateType");

  // Local state for skills input as a string
  const [skillsInput, setSkillsInput] = useState<string>(
    initialData && Array.isArray(initialData.skills)
      ? initialData.skills.join(", ")
      : ""
  );

  // Fetch eligible users for combobox (only for create mode)
  useEffect(() => {
    if (initialData) return; // Only fetch for create
    async function fetchUsers() {
      setUsersLoading(true);
      setUsersError(null);
      try {
        // Fetch all candidates to get userIds that already have a candidate
        const candidatesRes = await listCandidates();
        const candidateUserIds = new Set(
          (candidatesRes || []).map((c) => c.userId)
        );
        // Fetch all users
        const res = await listUsers({ page: 1, pageSize: 100 });
        if (res && res.users) {
          setUsers(
            res.users
              .filter(
                (u) => u.role === Role.CANDIDATE && !candidateUserIds.has(u.id)
              )
              .map((u) => ({
                id: u.id,
                name: `${u.firstname} ${u.lastname}`,
                email: u.email,
              }))
          );
        } else {
          setUsersError("No eligible users found");
        }
      } catch {
        setUsersError("Failed to load users");
      } finally {
        setUsersLoading(false);
      }
    }
    fetchUsers();
  }, [initialData]);

  // In useEffect, sync skillsInput with form value if initialData changes
  useEffect(() => {
    if (initialData && Array.isArray(initialData.skills)) {
      setSkillsInput(initialData.skills.join(", "));
    }
  }, [initialData]);

  // Handle form submission
  async function onSubmit(values: CandidateFormValues) {
    setLoading(true);
    try {
      // Transform arrays to nested Prisma format
      const submitValues = {
        ...values,
        education: { create: values.education },
        certifications: values.certifications
          ? { create: values.certifications }
          : undefined,
        WorkExperience: values.WorkExperience
          ? {
              create: values.WorkExperience.map((w) => ({
                ...w,
              })),
            }
          : undefined,
      };
      // Handle resume file upload
      if (resumeFile) {
        // You may want to upload the file to your server or cloud storage here
        // For now, just log it or handle as needed
        // Example: submitValues.resume = await uploadResume(resumeFile);
      }
      if (candidateId && initialData) {
        // Update candidate
        const res = await updateCandidateAdmin(candidateId, submitValues);
        console.log("control", res.error);
        if (res.success) {
          toast.success("Candidate updated successfully");
          router.push("/ADMIN/candidates");
        } else {
          toast.error(res.error || "Failed to update candidate");
        }
      } else {
        // Create candidate
        const res = await createCandidateAdmin(submitValues);
        if (res.success) {
          toast.success("Candidate created successfully");
          router.push("/ADMIN/candidates");
        } else {
          toast.error(res.error || "Failed to create candidate");
          console.log(res.error);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while submitting the candidate");
    } finally {
      setLoading(false);
    }
  }

  // Field arrays for education, certifications, and work experience
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control: form.control, name: "education" });
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({ control: form.control, name: "certifications" });
  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({ control: form.control, name: "WorkExperience" });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* User (Owner) Combobox - always show at the top and required for create */}
          {!candidateId && (
            <FormField
              control={form.control}
              name="user.connect.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    User (CANDIDATE) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ComboboxName
                      items={users.map((u) => ({
                        id: u.id,
                        name: `${u.name} (${u.email})`,
                      }))}
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        // Auto-fill email, firstname, lastname if empty
                        // const selectedUser = users.find((u) => u.id === val);
                        // if (selectedUser) {
                        //   if (!form.getValues("email"))
                        //     form.setValue("email", selectedUser.email);
                        //   const [first, ...last] = selectedUser.name.split(" ");
                        //   if (!form.getValues("firstname"))
                        //     form.setValue("firstname", first);
                        //   if (!form.getValues("lastname"))
                        //     form.setValue("lastname", last.join(" "));
                        // }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {usersLoading && (
                    <div className="text-xs text-muted-foreground">
                      Loading users...
                    </div>
                  )}
                  {usersError && (
                    <div className="text-destructive text-xs mt-1">
                      {usersError}
                    </div>
                  )}
                  {users.length === 0 && !usersLoading && (
                    <div className="text-xs text-yellow-600 mt-1">
                      No eligible users found. Please create a user with the
                      CANDIDATE role who is not already linked to a candidate,
                      then try again.
                    </div>
                  )}
                </FormItem>
              )}
            />
          )}
          {/* Candidate Type */}
          <FormField
            control={form.control}
            name="candidateType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Candidate Type</FormLabel>
                <FormControl>
                  <ComboboxName
                    items={Object.values(CandidateType).map((i) => ({
                      id: i,
                      name: i,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Conditional fields based on candidateType */}
          {candidateType === CandidateType.REGULAR && (
            // Gender only
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <ComboboxName
                      items={Object.values(Gender).map((i) => ({
                        id: i,
                        name: i,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {candidateType === CandidateType.PWD && (
            <>
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <ComboboxName
                        items={Object.values(Gender).map((i) => ({
                          id: i,
                          name: i,
                        }))}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PWD Category */}
              <FormField
                control={form.control}
                name="pwdCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PWD Category</FormLabel>
                    <FormControl>
                      <ComboboxName
                        items={Object.values(PwdCategory).map((i) => ({
                          id: i,
                          name: i,
                        }))}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {candidateType === CandidateType.LGBTQ && (
            <FormField
              control={form.control}
              name="LGBTQ"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LGBTQ Type</FormLabel>
                  <FormControl>
                    <ComboboxName
                      items={Object.values(LGBTQ).map((i) => ({
                        id: i,
                        name: i,
                      }))}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {candidateType === CandidateType.WOMEN_RETURNING && (
            <FormField
              control={form.control}
              name="employmentBreak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Break</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Employment Break" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* YOE */}
          <FormField
            control={form.control}
            name="YOE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience (YOE)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    placeholder="Years of Experience"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Skills */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    value={skillsInput}
                    placeholder="e.g. JavaScript, React, Node.js"
                    onChange={(e) => {
                      setSkillsInput(e.target.value);
                      const arr = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      field.onChange(arr);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Bio */}
          <FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Short bio (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Resume Upload */}
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="text-center">
              <Upload className="h-10 w-10 text-gray-400 mb-4 mx-auto" />
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop your resume here, or
              </p>
            </div>
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center">
                  <FormControl>
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      Select File
                      <input
                        id="resume-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Validate file type and size
                            const validTypes = [
                              "application/pdf",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ];
                            if (!validTypes.includes(file.type)) {
                              toast.error(
                                "Please upload a PDF, DOC, or DOCX file"
                              );
                              e.target.value = "";
                              return;
                            }
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("File size must be less than 5MB");
                              e.target.value = "";
                              return;
                            }
                            setResumeFile(file);
                            field.onChange(file.name);
                          }
                        }}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {resumeFile && (
              <div className="mt-4 flex flex-col items-center">
                <div className="text-sm text-green-600 flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  <span>{resumeFile.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-red-600 hover:text-red-700"
                  onClick={() => {
                    setResumeFile(null);
                    // Clear the file input value
                    const fileInput = document.getElementById(
                      "resume-upload"
                    ) as HTMLInputElement;
                    if (fileInput) {
                      fileInput.value = "";
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            )}
          </div>
          {/* DOB */}
          <FormField
            control={form.control}
            name="DOB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-1">
                    {/* <Calendar className="h-4 w-4" /> */}
                    <span>Date of Birth *</span>
                  </div>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date || new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Contact */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Contact Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Insert after personal info fields, before submit button: */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Your professional background and skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="education" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="certifications">
                    Certifications
                  </TabsTrigger>
                  <TabsTrigger value="workExperience">
                    Work Experience
                  </TabsTrigger>
                </TabsList>
                {/* Education Tab */}
                <TabsContent value="education" className="space-y-4">
                  <Accordion type="multiple" className="w-full">
                    {educationFields.map((field, index) => (
                      <AccordionItem
                        key={field.id}
                        value={`education-${index}`}
                      >
                        <AccordionTrigger className="text-left font-medium">
                          {form.watch(`education.${index}.degree`) ||
                          form.watch(`education.${index}.institution`)
                            ? `${form.watch(
                                `education.${index}.degree`
                              )} - ${form.watch(
                                `education.${index}.institution`
                              )}`
                            : `Education ${index + 1}`}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.degree`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Degree *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Bachelor of Science"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.specialisation`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Specialization *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Computer Science"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 py-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.institution`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Institution *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="University Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.passout_year`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year of Completion *</FormLabel>
                                  <FormControl>
                                    <DatePicker
                                      value={field.value}
                                      onChange={(date) =>
                                        field.onChange(date || new Date())
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.CGPA`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CGPA*</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="3.8 or 85%"
                                      value={field.value}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          {educationFields.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeEducation(index)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                              Education
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() =>
                      appendEducation({
                        degree: "",
                        specialisation: "",
                        institution: "",
                        passout_year: new Date(),
                        CGPA: 0,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Education
                  </Button>
                </TabsContent>
                {/* Certifications Tab */}
                <TabsContent value="certifications" className="space-y-4">
                  <Accordion type="multiple" className="w-full">
                    {certificationFields.map((field, index) => (
                      <AccordionItem
                        key={field.id}
                        value={`certification-${index}`}
                      >
                        <AccordionTrigger className="text-left font-medium">
                          {form.watch(`certifications.${index}.name`)
                            ? form.watch(`certifications.${index}.name`)
                            : `Certification ${index + 1}`}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Certification Name *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="AWS Solutions Architect"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.company`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Issuing Company *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Amazon Web Services"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.issueDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Issue Date *</FormLabel>
                                  <FormControl>
                                    <DatePicker
                                      value={field.value}
                                      onChange={(date) =>
                                        field.onChange(date || new Date())
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.expirationDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Expiry Date (if applicable)
                                  </FormLabel>
                                  <FormControl>
                                    <DatePicker
                                      value={field.value}
                                      onChange={(date) =>
                                        field.onChange(date || new Date())
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeCertification(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                            Certification
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() =>
                      appendCertification({
                        name: "",
                        company: "",
                        issueDate: new Date(),
                        expirationDate: new Date(),
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Certification
                  </Button>
                </TabsContent>
                {/* Work Experience Tab */}
                <TabsContent value="workExperience" className="space-y-4">
                  <Accordion type="multiple" className="w-full">
                    {workExperienceFields.map((field, index) => (
                      <AccordionItem key={field.id} value={`work-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {form.watch(`WorkExperience.${index}.position`) &&
                          form.watch(`WorkExperience.${index}.companyName`)
                            ? `${form.watch(
                                `WorkExperience.${index}.position`
                              )} at ${form.watch(
                                `WorkExperience.${index}.companyName`
                              )}`
                            : `Work Experience ${index + 1}`}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <FormField
                              control={form.control}
                              name={`WorkExperience.${index}.companyName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Google" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`WorkExperience.${index}.position`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Position *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Software Engineer"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <FormField
                              control={form.control}
                              name={`WorkExperience.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date *</FormLabel>
                                  <FormControl>
                                    <DatePicker
                                      value={field.value}
                                      onChange={(date) =>
                                        field.onChange(date || new Date())
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`WorkExperience.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <DatePicker
                                      value={field.value}
                                      onChange={(date) =>
                                        field.onChange(date || new Date())
                                      }
                                      disabled={form.watch(
                                        `WorkExperience.${index}.currentlyWorking`
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <input
                              type="checkbox"
                              id={`currentlyWorking-${index}`}
                              className="h-4 w-4"
                              checked={form.watch(
                                `WorkExperience.${index}.currentlyWorking`
                              )}
                              onChange={(e) => {
                                form.setValue(
                                  `WorkExperience.${index}.currentlyWorking`,
                                  e.target.checked
                                );
                                if (e.target.checked) {
                                  form.setValue(
                                    `WorkExperience.${index}.endDate`,
                                    new Date()
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={`currentlyWorking-${index}`}>
                              Currently working here
                            </Label>
                          </div>
                          <div className="py-4">
                            <FormField
                              control={form.control}
                              name={`WorkExperience.${index}.jobDescription`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Describe your responsibilities and achievements..."
                                      className="min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeWorkExperience(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Remove Work
                            Experience
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  {workExperienceFields.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No work experience added yet
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() =>
                      appendWorkExperience({
                        companyName: "",
                        position: "",
                        startDate: new Date(),
                        endDate: new Date(),
                        currentlyWorking: false,
                        jobDescription: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Work Experience
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-1/2 cursor-pointer "
          >
            {loading
              ? "Submitting..."
              : initialData && candidateId
              ? "Update Candidate"
              : "Create Candidate"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
