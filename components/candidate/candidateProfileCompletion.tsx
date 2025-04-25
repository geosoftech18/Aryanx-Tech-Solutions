"use client";
import { createCandidateProfile } from "@/actions/candidate-actions/createCandidateProfile";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { countriesData } from "@/data/countiries";
import { statesData } from "@/data/states";
import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateType } from "@prisma/client";
import {
  Briefcase,
  Calendar,
  Check,
  Globe,
  GraduationCap,
  Loader2,
  MapPin,
  Phone,
  Plus,
  School,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema } from "./formschema";
import { LGBTQCandidate } from "./LGBTQCANDIDATE";
import { PWDCandidate } from "./PWDCANDIDATE";
import { RegularCandidate } from "./REGULARCANDIDATE";
import { WomenReturningCandidate } from "./WOMENRETURNINGCANDIDATE";

const experienceOptions = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const CandidateProfileCompletion = ({
  userId,
  initialData,
}: {
  userId: string;
  initialData: z.infer<typeof formSchema> | null;
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // States for location dropdowns
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [, setSelectedState] = useState<string | null>(null);
  const [, setAvailableStates] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // State for popover open/close
  const [countryOpen, setCountryOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      phone: "",
      housenumber: "",
      locality: "",
      pincode: "",
      country: "",
      currentState: "",
      currentCity: "",
      dob: "",
      experience: "",
      skills: "",
      bio: "",
      jobTitle: "",
      gender: "MALE",
      candidateType: undefined,
      education: [
        {
          degree: "",
          specialization: "",
          institution: "",
          yearOfCompletion: "",
          grade: "",
        },
      ],
      certifications: [],
      workExperience: [],
      acknowledgement: false,
      resume: undefined,
    },
  });

  // Update available states when country changes
  useEffect(() => {
    if (
      selectedCountry &&
      statesData[selectedCountry as keyof typeof statesData]
    ) {
      setAvailableStates(
        statesData[selectedCountry as keyof typeof statesData]
      );
      setSelectedState(null);
      form.setValue("currentState", "");
      form.setValue("currentCity", "");
    } else {
      setAvailableStates([]);
    }
  }, [selectedCountry, form]);

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
  } = useFieldArray({ control: form.control, name: "workExperience" });

  // const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setResumeFile(e.target.files[0]);
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!resumeFile) {
      toast.error("Please upload your resume to continue.");
      return;
    }

    if (!userId) {
      toast.error("No userId found");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("values", JSON.stringify(values));

      const response = await createCandidateProfile(userId, formData);

      if (response.success) {
        toast.success("Your profile has been successfully completed.");
        // router.push("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("There was an error saving your profile. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="py-4 px-6 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Complete Your Profile
          </h1>
          <div className="text-sm text-gray-500">
            Required fields are marked with an asterisk (*)
          </div>
        </div>
      </div>

      <div className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Welcome! Please complete your profile to continue
            </h2>
            <p className="text-gray-500 mb-6">
              This information will help us personalize your experience and
              connect you with the right opportunities.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Basic information about you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>Contact Number *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="string"
                                value={field.value}
                                placeholder="555 123 4567"
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Date of Birth *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current/Desired Job Title *</FormLabel>
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
                    {/* house no */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="housenumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>House Number *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="78B..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="locality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Locality *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="xyz colony near..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Pincode *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="111111..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Country Selection */}
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                <span>Country *</span>
                              </div>
                            </FormLabel>
                            <Popover
                              open={countryOpen}
                              onOpenChange={setCountryOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={`w-full justify-between ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value
                                      ? countriesData.find(
                                          (country) =>
                                            country.id === field.value
                                        )?.name
                                      : "Select country"}
                                    <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[200px] p-0"
                                align="start"
                              >
                                <Command>
                                  <CommandInput placeholder="Search country..." />
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                                    {countriesData.map((country) => (
                                      <CommandItem
                                        key={country.id}
                                        value={country.name}
                                        onSelect={() => {
                                          form.setValue("country", country.id);
                                          setSelectedCountry(country.id);
                                          setCountryOpen(false);
                                        }}
                                      >
                                        {country.name}
                                        {field.value === country.id && (
                                          <Check className="ml-auto h-4 w-4" />
                                        )}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* State Selection */}
                      <FormField
                        control={form.control}
                        name="currentState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Current State *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="State..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* City Selection */}
                      <FormField
                        control={form.control}
                        name="currentCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Current City *</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="City..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}
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
                        <div className="flex items-center gap-2">
                          <School className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-medium">
                            Education Details
                          </h3>
                        </div>

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
                                        <FormLabel>
                                          <div className="flex items-center gap-1">
                                            <GraduationCap className="h-4 w-4" />
                                            <span>Degree *</span>
                                          </div>
                                        </FormLabel>
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
                                    name={`education.${index}.specialization`}
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
                                    name={`education.${index}.yearOfCompletion`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Year of Completion *
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="2023"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`education.${index}.grade`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>CGPA/Percentage *</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="3.8 or 85%"
                                            {...field}
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
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove Education
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
                              specialization: "",
                              institution: "",
                              yearOfCompletion: "",
                              grade: "",
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </TabsContent>

                      {/* Certifications Tab */}
                      <TabsContent value="certifications" className="space-y-4">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-medium">
                            Certifications
                          </h3>
                        </div>

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
                                        <FormLabel>
                                          Certification Name *
                                        </FormLabel>
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
                                    name={`certifications.${index}.issuingCompany`}
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
                                          <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`certifications.${index}.expiryDate`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Expiry Date (if applicable)
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="date" {...field} />
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
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove Certification
                                </Button>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>

                        {certificationFields.length === 0 && (
                          <div className="text-center py-4 text-gray-500">
                            No certifications added yet
                          </div>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() =>
                            appendCertification({
                              name: "",
                              issuingCompany: "",
                              issueDate: "",
                              expiryDate: "",
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Certification
                        </Button>
                      </TabsContent>

                      {/* Work Experience Tab */}
                      <TabsContent value="workExperience" className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-medium">
                            Work Experience
                          </h3>
                        </div>

                        <Accordion type="multiple" className="w-full">
                          {workExperienceFields.map((field, index) => (
                            <AccordionItem
                              key={field.id}
                              value={`work-${index}`}
                            >
                              <AccordionTrigger className="text-left font-medium">
                                {form.watch(
                                  `workExperience.${index}.companyName`
                                )
                                  ? `${form.watch(
                                      `workExperience.${index}.position`
                                    )} at ${form.watch(
                                      `workExperience.${index}.companyName`
                                    )}`
                                  : `Work Experience ${index + 1}`}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                  <FormField
                                    control={form.control}
                                    name={`workExperience.${index}.companyName`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Company Name *</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Google"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`workExperience.${index}.position`}
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
                                    name={`workExperience.${index}.startDate`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Start Date *</FormLabel>
                                        <FormControl>
                                          <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`workExperience.${index}.endDate`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="date"
                                            disabled={form.watch(
                                              `workExperience.${index}.currentlyWorking`
                                            )}
                                            {...field}
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
                                      `workExperience.${index}.currentlyWorking`
                                    )}
                                    onChange={(e) => {
                                      form.setValue(
                                        `workExperience.${index}.currentlyWorking`,
                                        e.target.checked
                                      );
                                      if (e.target.checked) {
                                        form.setValue(
                                          `workExperience.${index}.endDate`,
                                          ""
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
                                    name={`workExperience.${index}.description`}
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
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove Work Experience
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
                              startDate: "",
                              endDate: "",
                              currentlyWorking: false,
                              description: "",
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Work Experience
                        </Button>
                      </TabsContent>
                    </Tabs>

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Skills *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="React, JavaScript, Project Management, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Bio *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write a brief professional summary about yourself..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Resume Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Upload</CardTitle>
                    <CardDescription>
                      Upload your latest resume (PDF, DOC, DOCX) - Max 5MB
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                                        toast.error(
                                          "File size must be less than 5MB"
                                        );
                                        e.target.value = "";
                                        return;
                                      }
                                      setResumeFile(file);
                                      field.onChange(file); // Update form field value
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
                  </CardContent>
                </Card>

                {/* Acknowledgement */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="acknowledgement"
                        className="h-4 w-4 mt-1"
                        checked={form.watch("acknowledgement")}
                        onChange={(e) => {
                          form.setValue("acknowledgement", e.target.checked);
                        }}
                      />
                      <div>
                        <Label
                          htmlFor="acknowledgement"
                          className="font-medium"
                        >
                          Acknowledgement *
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          I confirm that all information provided above is
                          accurate to the best of my knowledge. I understand
                          that providing false information may result in
                          rejection of my application or termination of
                          employment.
                        </p>
                        {form.formState.errors.acknowledgement && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.acknowledgement.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    Select Your Candidate Type
                  </div>
                  <FormField
                    control={form.control}
                    name="candidateType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Candidate Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your candidate type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(CandidateType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("candidateType") === CandidateType.REGULAR && (
                    <RegularCandidate form={form} />
                  )}
                  {form.watch("candidateType") === CandidateType.PWD && (
                    <PWDCandidate form={form} />
                  )}
                  {form.watch("candidateType") === CandidateType.LGBTQ && (
                    <LGBTQCandidate form={form} />
                  )}
                  {form.watch("candidateType") ===
                    CandidateType.WOMEN_RETURNING && (
                    <WomenReturningCandidate form={form} />
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Complete Profile
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              By completing your profile, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileCompletion;
