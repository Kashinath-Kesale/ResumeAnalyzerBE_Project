import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Briefcase, Clock, Users, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

// --- Reusable Components ---

const JobCard = ({ job, onMenuClick }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.companyName}</p>
      </div>
      <div className="relative">
        <button onClick={() => onMenuClick(job.id)} className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical size={20} className="text-gray-500" />
        </button>
        {job.menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-10">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Eye size={16} /> View Applicants
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit size={16} /> Edit Job
            </a>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 size={16} /> Delete Job
            </button>
          </div>
        )}
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-indigo-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-indigo-500" />
          <span>Min. Experience: {job.minExperience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-500" />
          <span>Posted {job.postedAgo}</span>
        </div>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-3 bg-indigo-50 p-3 rounded-lg">
        <Users size={20} className="text-indigo-600" />
        <span className="font-semibold text-indigo-800">{job.applicantCount} applicants</span>
        <a href="#" className="ml-auto text-sm font-bold text-indigo-600 hover:underline">View All</a>
    </div>
  </div>
);

const EmptyState = () => (
    <div className="text-center py-20 bg-white rounded-2xl shadow-md">
        <Briefcase size={60} className="mx-auto text-gray-300" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">No Jobs Posted Yet</h2>
        <p className="mt-2 text-gray-500">Click the button below to create your first job posting.</p>
        <button className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">
          <Plus size={20} />
          Create New Job
        </button>
    </div>
)

// --- Main MyJobs Component ---

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch this data from your API.
  useEffect(() => {
    const dummyJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        companyName: 'TechSolutions Inc.',
        location: 'Remote',
        minExperience: '3 years',
        postedAgo: '5 days ago',
        applicantCount: 25,
        menuOpen: false
      },
      {
        id: 2,
        title: 'Product Manager',
        companyName: 'Innovate Co.',
        location: 'New York, NY',
        minExperience: '5 years',
        postedAgo: '2 weeks ago',
        applicantCount: 15,
        menuOpen: false
      },
       {
        id: 3,
        title: 'Data Scientist',
        companyName: 'DataDriven LLC',
        location: 'San Francisco, CA',
        minExperience: '4 years',
        postedAgo: '3 weeks ago',
        applicantCount: 40,
        menuOpen: false
      },
    ];
    // Simulate API call
    setTimeout(() => {
        setJobs(dummyJobs);
        setLoading(false);
    }, 1000);
  }, []);

  const handleMenuClick = (jobId) => {
    setJobs(jobs.map(job => 
        job.id === jobId ? {...job, menuOpen: !job.menuOpen} : {...job, menuOpen: false}
    ));
  };
  
  if (loading) {
      return <div>Loading jobs...</div>
  }

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Job Postings</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-transform transform hover:-translate-y-0.5">
          <Plus size={20} />
          Create New Job
        </button>
      </div>
      
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
            <JobCard key={job.id} job={job} onMenuClick={handleMenuClick} />
            ))}
        </div>
      ) : (
          <EmptyState />
      )}
    </div>
  );
}
