import React from 'react';
import { Briefcase, Users, FileText, CheckCircle, Clock } from 'lucide-react';

// --- Reusable Components ---

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-5 transition-transform transform hover:-translate-y-1">
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ApplicantRow = ({ name, jobTitle, status }) => {
  const statusStyles = {
    shortlisted: 'bg-blue-100 text-blue-700',
    applied: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <img src={`https://i.pravatar.cc/40?u=${name}`} alt={name} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{jobTitle}</p>
        </div>
      </div>
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

// --- Main Dashboard Component ---

export default function Dashboard() {
  // Dummy data - in a real app, this would come from API calls.
  const stats = {
    activeJobs: 12,
    totalApplicants: 256,
    shortlisted: 48,
    hired: 8,
  };

  const recentApplicants = [
    { name: 'Alice Johnson', jobTitle: 'Senior Frontend Developer', status: 'shortlisted' },
    { name: 'Bob Williams', jobTitle: 'UX/UI Designer', status: 'applied' },
    { name: 'Charlie Brown', jobTitle: 'Product Manager', status: 'applied' },
    { name: 'Diana Miller', jobTitle: 'Senior Frontend Developer', status: 'shortlisted' },
  ];

  const activeJobs = [
      {title: "Senior Frontend Developer", applicants: 25},
      {title: "Product Manager", applicants: 15},
      {title: "Data Scientist", applicants: 40}
  ]

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recruiter Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Briefcase size={28} className="text-white" />}
          title="Active Jobs"
          value={stats.activeJobs}
          color="bg-indigo-500"
        />
        <StatCard
          icon={<Users size={28} className="text-white" />}
          title="Total Applicants"
          value={stats.totalApplicants}
          color="bg-sky-500"
        />
        <StatCard
          icon={<FileText size={28} className="text-white" />}
          title="Shortlisted"
          value={stats.shortlisted}
          color="bg-amber-500"
        />
        <StatCard
          icon={<CheckCircle size={28} className="text-white" />}
          title="Hired This Month"
          value={stats.hired}
          color="bg-emerald-500"
        />
      </div>

      {/* Recent Activity & Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Applicants</h2>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            {recentApplicants.map((applicant, index) => (
              <ApplicantRow key={index} {...applicant} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Top Jobs</h2>
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              {activeJobs.map((job, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                      <div>
                        <p className="font-semibold text-gray-800">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.applicants} Applicants</p>
                      </div>
                      <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline">View</a>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
