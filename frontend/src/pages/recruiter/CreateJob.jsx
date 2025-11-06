import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate for SPA-friendly navigation
import { Plus, Tag, MapPin, Briefcase, ChevronLeft } from 'lucide-react';

// --- Reusable Components (with Accessibility Improvement) ---

// 2. Added id and htmlFor for better accessibility
const FormInput = ({ id, label, type = 'text', placeholder, value, onChange, name }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

// 2. Added id and htmlFor for better accessibility
const FormTextarea = ({ id, label, placeholder, value, onChange, name }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows="6"
      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

const KeywordInput = ({ keywords, setKeywords }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newKeyword = inputValue.trim();
            if (newKeyword && !keywords.includes(newKeyword)) {
                setKeywords([...keywords, newKeyword]);
            }
            setInputValue('');
        }
    };

    const removeKeyword = (keywordToRemove) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords / Skills</label>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 border border-gray-300 rounded-lg">
                {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded">
                        {keyword}
                        <button type="button" onClick={() => removeKeyword(keyword)} className="text-indigo-600 hover:text-indigo-800">&times;</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a skill and press Enter..."
                    className="flex-grow bg-transparent p-1 focus:outline-none"
                />
            </div>
             <p className="text-xs text-gray-500 mt-1">Add relevant skills like "React", "Node.js", "Project Management".</p>
        </div>
    );
};


// --- Main CreateJob Component ---

export default function CreateJob() {
  const navigate = useNavigate(); // 1. Use the navigate hook
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    location: '',
    minExperience: '',
  });
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // 4. For user feedback

  // 3. Effect for simple form validation
  useEffect(() => {
    const { title, description, location } = jobDetails;
    setFormValid(title.trim() !== '' && description.trim() !== '' && location.trim() !== '');
  }, [jobDetails]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) {
        setFeedbackMessage('Please fill out all required fields.');
        return;
    }
    setLoading(true);
    setFeedbackMessage('');
    console.log({ ...jobDetails, keywords });

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setFeedbackMessage('Job posted successfully!');
      // In a real app, you would redirect
      // navigate(`/recruiter/jobs/${newJobId}`);
      setTimeout(() => navigate('/recruiter/my-jobs'), 2000); // Redirect after showing success
    }, 1500);
  };

  return (
    // The main layout now provides the page title, so we can remove the one here.
    <div className="p-1">
       {/* 5. The page header is now handled by the layout component. */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
                <FormInput
                    id="jobTitle" // 2. Pass ID prop
                    label="Job Title"
                    name="title"
                    placeholder="e.g., Senior Frontend Developer"
                    value={jobDetails.title}
                    onChange={handleChange}
                />
            </div>

            <div className="md:col-span-2">
                <FormTextarea
                    id="jobDescription" // 2. Pass ID prop
                    label="Job Description"
                    name="description"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    value={jobDetails.description}
                    onChange={handleChange}
                />
            </div>

            <div className="md:col-span-2">
                <KeywordInput keywords={keywords} setKeywords={setKeywords} />
            </div>

            <div>
                <FormInput
                    id="jobLocation" // 2. Pass ID prop
                    label="Location"
                    name="location"
                    placeholder="e.g., San Francisco, CA or Remote"
                    value={jobDetails.location}
                    onChange={handleChange}
                />
            </div>
              <div>
                <FormInput
                    id="minExperience" // 2. Pass ID prop
                    label="Minimum Experience (Optional)"
                    name="minExperience"
                    placeholder="e.g., 3 years"
                    value={jobDetails.minExperience}
                    onChange={handleChange}
                />
            </div>

            <div className="md:col-span-2 mt-4">
                <button 
                    type="submit" 
                    disabled={loading || !formValid} // 3. Disable button if form is invalid
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    {loading ? 'Posting Job...' : 'Post Job'}
                </button>
            </div>
            {/* 4. Display feedback message to the user */}
            {feedbackMessage && (
                <div className={`md:col-span-2 mt-4 text-center p-3 rounded-lg ${feedbackMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedbackMessage}
                </div>
            )}
        </div>
      </form>
    </div>
  );
}
