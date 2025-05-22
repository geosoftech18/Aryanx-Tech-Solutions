import { Briefcase, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <span className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">JobSphere</span>
            </span>
            <p className="text-gray-400 mb-4">
              JobSphere connects talented professionals with top employers. Find your dream job or the perfect candidate
              with our comprehensive job board platform.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Browse Jobs
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Saved Jobs
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Job Alerts
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Career Advice
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Resume Tips
                </span>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Post a Job
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Employer Dashboard
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} JobSphere. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <span className="hover:text-white transition-colors">
                    Privacy
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors">
                    Terms
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors">
                    Cookies
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
