import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Check, X, Star, Briefcase, User } from 'lucide-react';

// --- Reusable Components ---

const StatusBadge = ({ status }) => {
  const statusConfig = {
    applied: { color: 'bg-yellow-100 text-yellow-800', icon: <User size={14} /> },
    shortlisted: { color: 'bg-blue-100 text-blue-800', icon: <Star size={14} /> },
    rejected: { color: 'bg-red-100 text-red-800', icon: <X size={14} /> },
    hired: { color: 'bg-green-100 text-green-800', icon: <Check size={14} /> },
  };

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${config.color}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// --- Main Applicants Component ---

export default function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ job: 'all', status: 'all' });
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  
  // In a real app, this data would be fetched from your API.
  useEffect(() => {
    const dummyApplicants = [
      { id: 1, candidate: { name: 'Alice Johnson', email: 'alice@example.com' }, job: { title: 'Senior Frontend Developer' }, appliedOn: '2023-10-01', status: 'shortlisted' },
      { id: 2, candidate: { name: 'Bob Williams', email: 'bob@example.com' }, job: { title: 'UX/UI Designer' }, appliedOn: '2023-09-30', status: 'applied' },
      { id: 3, candidate: { name: 'Charlie Brown', email: 'charlie@example.com' }, job: { title: 'Product Manager' }, appliedOn: '2023-09-29', status: 'rejected' },
      { id: 4, candidate: { name: 'Diana Miller', email: 'diana@example.com' }, job: { title: 'Senior Frontend Developer' }, appliedOn: '2023-09-28', status: 'hired' },
      { id: 5, candidate: { name: 'Ethan Hunt', email: 'ethan@example.com' }, job: { title: 'Data Scientist' }, appliedOn: '2023-09-27', status: 'applied' },
    ];
    setTimeout(() => {
      setApplicants(dummyApplicants);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(applicants.map(app => 
        app.id === applicantId ? {...app, status: newStatus} : app
    ));
    setActiveActionMenu(null); // Close menu after action
  };
  
  const filteredApplicants = applicants.filter(app => 
      (filters.job === 'all' || app.job.title === filters.job) &&
      (filters.status === 'all' || app.status === filters.status)
  );

  const jobTitles = ['all', ...new Set(applicants.map(a => a.job.title))];
  const statuses = ['all', 'applied', 'shortlisted', 'rejected', 'hired'];

  if (loading) return <div>Loading applicants...</div>;

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applicants</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-2xl shadow-md">
          <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-700">Filter by:</h3>
          </div>
          <div>
            <label htmlFor="job-filter" className="sr-only">Job</label>
            <select id="job-filter" onChange={(e) => setFilters({...filters, job: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                {jobTitles.map(title => <option key={title} value={title}>{title === 'all' ? 'All Jobs' : title}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="status-filter" className="sr-only">Status</label>
            <select id="status-filter" onChange={(e) => setFilters({...filters, status: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                {statuses.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
            </select>
          </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4">Candidate</th>
              <th scope="col" className="px-6 py-4">Job Applied For</th>
              <th scope="col" className="px-6 py-4">Date Applied</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                    <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/40?u=${applicant.candidate.email}`} alt={applicant.candidate.name} className="w-10 h-10 rounded-full"/>
                        <div>
                            {applicant.candidate.name}
                            <p className="font-normal text-gray-500 text-xs">{applicant.candidate.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">{applicant.job.title}</td>
                <td className="px-6 py-4">{applicant.appliedOn}</td>
                <td className="px-6 py-4"><StatusBadge status={applicant.status} /></td>
                <td className="px-6 py-4 text-center">
                  <div className="relative">
                    <button onClick={() => setActiveActionMenu(activeActionMenu === applicant.id ? null : applicant.id)} className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mx-auto">
                      Update Status <ChevronDown size={16} />
                    </button>
                    {activeActionMenu === applicant.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl z-10">
                            <button onClick={() => handleStatusChange(applicant.id, 'shortlisted')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Shortlist</button>
                            <button onClick={() => handleStatusChange(applicant.id, 'rejected')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Reject</button>
                            <button onClick={() => handleStatusChange(applicant.id, 'hired')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Mark as Hired</button>
                        </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredApplicants.length === 0 && (
            <div className="text-center py-16">
                <Briefcase size={50} className="mx-auto text-gray-300" />
                <h3 className="mt-3 text-xl font-bold text-gray-800">No Applicants Found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your filters.</p>
            </div>
        )}
      </div>
    </div>
  );
}
