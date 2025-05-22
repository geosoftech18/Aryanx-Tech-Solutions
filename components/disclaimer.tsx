"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import { AlertTriangle, Mail, X } from "lucide-react"
import { useState } from "react"

// Cookie name for tracking if the disclaimer has been shown
// const DISCLAIMER_COOKIE_NAME = "disclaimer_shown"
// // Cookie expiration in days (7 days = 1 week)
// const COOKIE_EXPIRATION_DAYS = 7

export function DisclaimerPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

//   useEffect(() => {
//     // Check if the disclaimer cookie exists
//     // const hasSeenDisclaimer = Cookies.get(DISCLAIMER_COOKIE_NAME)

//     // Only show the popup if the cookie doesn't exist
//     if (!hasSeenDisclaimer) {
//       // Show popup after a short delay when the page loads
//       const timer = setTimeout(() => {
//         setIsOpen(true)
//       }, 1500)

//       return () => clearTimeout(timer)
//     }
//   }, [])

  // Handle closing the popup and setting the cookie
  const handleClose = () => {
    // Set a cookie to remember that the user has seen the disclaimer
    // Cookies.set(DISCLAIMER_COOKIE_NAME, "true", {
    //   expires: COOKIE_EXPIRATION_DAYS,
    //   sameSite: "strict",
    // })

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`
          max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300
          ${isMobile ? "w-[calc(100%-32px)] p-4 rounded-lg" : "sm:max-w-[500px] p-6"}
        `}
        data-state={isOpen ? "open" : "closed"}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <DialogHeader className={isMobile ? "mb-3" : "mb-4"}>
          <DialogTitle className={`flex items-center gap-2 ${isMobile ? "text-lg" : "text-xl"}`}>
            <div className="relative">
              <AlertTriangle className="h-5 w-5 text-amber-500 animate-pulse duration-2000" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
            </div>
            Reports and Disclaimer
          </DialogTitle>
        </DialogHeader>

        {/* Using div instead of DialogDescription to avoid nested p tags */}
        <div className={`text-slate-700 space-y-3 ${isMobile ? "text-xs" : "text-sm"} pt-2`}>
          <div>
            At Aryanx Tech Solutions, we are committed to ethical recruitment practices and strongly oppose any form of
            fraudulent activities targeting job seekers. We do not charge candidates any fees for placement or job
            referrals.
          </div>
          <div>
            If you encounter any individual or organization claiming to represent Aryanx Tech Solutions and requesting
            money for job placement, please report it immediately. Such actions are unauthorized and do not reflect our
            company&apos;s values.
          </div>
          <div className={`bg-amber-50 ${isMobile ? "p-3" : "p-4"} rounded-lg border border-amber-200 my-3`}>
            <h3 className="font-semibold mb-2">To report fraudulent activities:</h3>
            <div className="flex items-center gap-2 text-amber-700">
              <Mail className={isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} />
              <a
                href="mailto:report@aryanxtechsolutions.com"
                className="text-amber-700 hover:text-amber-900 underline break-all"
              >
                report@aryanxtechsolutions.com
              </a>
            </div>
          </div>
          <div>
            Your vigilance helps us maintain the integrity of our recruitment process and protect job seekers from
            potential scams.
          </div>
          <div>
            Please note that any communication from Aryanx Tech Solutions will be through official channels. We advise
            against engaging with unsolicited offers or requests for payment related to job placements.
          </div>
          <div>
            If you have any further questions or need assistance, feel free to reach out at{" "}
            <a
              href="mailto:report@aryanxtechsolutions.com"
              className="text-blue-600 hover:text-blue-800 underline break-all"
            >
              report@aryanxtechsolutions.com
            </a>
          </div>
        </div>

        <DialogFooter className={isMobile ? "mt-4 flex-col gap-2" : "mt-6"}>
          <Button
            onClick={handleClose}
            className={`
              animate-gentle-pulse hover:animate-none transition-all
              ${isMobile ? "w-full py-3 text-sm" : "w-full sm:w-auto"}
            `}
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
