import { Role } from "@prisma/client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Linkedin } from "lucide-react";
import React from "react";

interface LinkedInSignInDropdownProps {
  buttonLabel: string;
  candidateCallbackUrl: string;
  employerCallbackUrl: string;
}

const LinkedInSignInDropdown: React.FC<LinkedInSignInDropdownProps> = ({
  buttonLabel,
  candidateCallbackUrl,
  employerCallbackUrl,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="w-full border-2 border-gray-300 flex items-center justify-center"
        >
          <Linkedin className="mr-2 h-5 w-5 text-[#0077B5]" />
          {buttonLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem
          onClick={() => {
            document.cookie = `oauth_role=${Role.CANDIDATE}; path=/; max-age=600`;
            signIn("linkedin", { callbackUrl: candidateCallbackUrl });
          }}    
        >
          Sign up as Candidate
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.cookie = `oauth_role=${Role.EMPLOYER}; path=/; max-age=600`;
            signIn("linkedin", { callbackUrl: employerCallbackUrl });
          }}
        >
          Sign up as Employer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkedInSignInDropdown; 