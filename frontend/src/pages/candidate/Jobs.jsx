import React, { useEffect, useState, useMemo, useCallback } from "react";
import api from "../../services/api.js";


// --- SVG Icons ---
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const MapPinIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

// --- Components ---

// Redesigned Job Card with better visual hierarchy
const JobCard = ({ job, pct, applying, onApply }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-lg font-bold text-gray-900">{job.title}</p>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-medium text-indigo-600">{job.companyName}</p>
                    {job.location && <p className="text-sm text-gray-500 flex items-center gap-1"><MapPinIcon className="h-4 w-4"/> {job.location}</p>}
                </div>
            </div>
            <div className="text-center flex-shrink-0">
                <p className="text-2xl font-bold text-green-600">{pct}%</p>
                <p className="text-xs text-gray-500 font-medium">Match</p>
            </div>
        </div>
        
        {job.description && <p className="text-sm text-gray-600 mt-3 line-clamp-2">{job.description}</p>}
        
        <div className="mt-auto pt-6 flex items-center justify-between">
             <div className="flex flex-wrap gap-2">
                {(job.keywords || []).slice(0, 3).map(k => (
                    <span key={k} className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{k}</span>
                ))}
            </div>
            <button
                className="px-5 py-2 rounded-lg text-white text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onApply}
                disabled={applying}
            >
                {applying ? "Applying..." : "Apply Now"}
            </button>
        </div>
    </div>
);

// Skeleton loader for a better loading experience
const JobCardSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col animate-pulse">
        <div className="flex items-start justify-between gap-4">
            <div className="w-3/4">
                <div className="h-6 bg-gray-200 rounded w-4/5 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-1/4 flex flex-col items-center">
                 <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                 <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
            </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
        <div className="mt-auto pt-6 flex items-center justify-between">
            <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
        </div>
    </div>
);


const ApplyModal = ({ isOpen, onClose, onConfirm, job, applying }) => {
    if (!isOpen || !job) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900">Application Confirmation</h2>
                <p className="text-gray-600 mt-2">You are about to apply for the position of:</p>
                <div className="my-4 p-4 bg-gray-50 rounded-lg border">
                    <p className="font-semibold text-lg text-indigo-700">{job.title}</p>
                    <p className="text-sm text-gray-800">{job.companyName}</p>
                </div>
                <p className="text-sm text-gray-500 mb-6">Your profile will be submitted to the recruiter. Are you sure you want to proceed?</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
                    <button onClick={onConfirm} disabled={applying} className="px-6 py-2.5 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50">
                        {applying ? 'Submitting...' : 'Confirm & Apply'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(null); // Stores the ID of the job being applied to
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/candidate/jobs");
            setJobs(res.data || []);
        } catch (err) {
            console.error(err);
            alert("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);
    
    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const confirmApply = async () => {
        if (!selectedJob) return;
        setApplying(selectedJob._id);
        try {
            await api.post("/applications", { jobId: selectedJob._id });
            alert("Applied successfully!");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Apply failed");
        } finally {
            setApplying(null);
            setIsModalOpen(false);
            setSelectedJob(null);
        }
    };

    const filteredJobs = useMemo(() => {
        if (!jobs || jobs.length === 0) return [];
        return jobs.filter(item => {
            const job = item.job || item;
            const title = (job.title || '').toLowerCase();
            const company = (job.companyName || '').toLowerCase();
            const keywords = (job.keywords || []);
            const searchLower = searchTerm.toLowerCase();
            
            return title.includes(searchLower) ||
                   company.includes(searchLower) ||
                   keywords.some(k => k.toLowerCase().includes(searchLower));
        });
    }, [jobs, searchTerm]);

    return (
        <>
            <ApplyModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmApply}
                job={selectedJob}
                applying={!!applying}
            />
            <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Search */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Job Matches</h1>
                        <p className="text-gray-500 mt-1">Showing the best job opportunities based on your profile and skills.</p>
                        <div className="mt-6 relative">
                            <input
                                type="text"
                                placeholder="Search by title, company, or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                            />
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                        </div>
                    </div>

                    {/* Job Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {loading ? (
                            [...Array(4)].map((_, i) => <JobCardSkeleton key={i} />)
                        ) : filteredJobs.length === 0 ? (
                            <div className="lg:col-span-2 text-center bg-white rounded-2xl p-12">
                                <h3 className="text-xl font-semibold text-gray-800">No Jobs Found</h3>
                                <p className="text-gray-500 mt-2">We couldn't find any jobs matching your search. Try broadening your criteria.</p>
                            </div>
                        ) : (
                            filteredJobs.map((item) => {
                                const job = item.job || item;
                                return (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                        pct={item.matchPercentage ?? 0}
                                        applying={applying === job._id}
                                        onApply={() => handleApplyClick(job)}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
