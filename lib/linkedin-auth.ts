import LinkedInProvider from "next-auth/providers/linkedin";

// Custom LinkedIn provider with custom profile mapping
export const linkedInProviderWithCustomFlow = LinkedInProvider({
  clientId: process.env.LINKEDIN_CLIENT_ID as string,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
  issuer: "https://www.linkedin.com/oauth/v2",
  wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  profile(profile) {
    // console.log('Raw LinkedIn profile:', profile);
    // console.log('LinkedIn tokens:', tokens);
    return {
      id: profile.sub || profile.id,
      name:
        profile.name ||
        `${profile.given_name || profile.localizedFirstName || ""} ${
          profile.family_name || profile.localizedLastName || ""
        }`.trim(),
      email: profile.email,
      image: profile.picture,
      role: "CANDIDATE", // Default role, will be overwritten in signIn callback if needed
    };
  },
});
