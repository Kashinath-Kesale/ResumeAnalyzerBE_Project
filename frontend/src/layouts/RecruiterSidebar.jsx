import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar.jsx";
import Navbar from "./Navbar.jsx";
import { LayoutGrid, Users, Briefcase, PlusSquare, User, Settings } from "lucide-react";

const RecruiterDashboardLayout = () => {
  // --- CHANGE IS HERE ---
  // The sidebar is now closed by default by setting the initial state to 'false'.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // The links array that is passed down to the sidebar
  const recruiterLinks = [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/recruiter" },
    { name: "Applicants", icon: <Users size={20} />, path: "/recruiter/applicants" },
    { name: "My Jobs", icon: <Briefcase size={20} />, path: "/recruiter/my-jobs" },
    { name: "Create Job", icon: <PlusSquare size={20} />, path: "/recruiter/create-job" },
    { name: "Profile", icon: <User size={20} />, path: "/recruiter/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/recruiter/settings" },
  ];

  const currentPage = recruiterLinks.find(link => link.path === location.pathname);
  const pageTitle = currentPage ? currentPage.name : "";

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <RecruiterSidebar 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        links={recruiterLinks} 
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-[240px]" : "md:ml-[80px]"}`}>
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          role="recruiter" 
        />
        <main className="p-4 sm:p-6 lg:p-8 pt-20">
          
          {/* Dynamic Header */}
          {pageTitle && (
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboardLayout;
