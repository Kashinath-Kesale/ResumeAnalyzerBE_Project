import React, { useState, useEffect } from 'react';
import { User, Building, Globe, Phone, MapPin } from 'lucide-react';

// --- Reusable Components ---

const ProfileInput = ({ icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
  </div>
);

// --- Main Profile Component ---

export default function Profile() {
  const [profile, setProfile] = useState({
    companyName: '',
    website: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch recruiter profile on component mount
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchProfile = async () => {
      setLoading(true);
      // const { data } = await api.get('/recruiter/profile');
      const dummyData = {
        companyName: 'TechSolutions Inc.',
        website: 'https://techsolutions.com',
        address: '123 Tech Street, Silicon Valley, CA',
        phone: '123-456-7890',
      };
      setTimeout(() => { // Simulate API delay
        setProfile(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    // In a real app, you would make a POST/PUT request to update the profile
    console.log("Saving profile:", profile);
    setTimeout(() => {
      setSaving(false);
      // Maybe show a success toast message
    }, 1500);
  };
  
  if (loading) {
      return <div>Loading profile...</div>
  }

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recruiter Profile</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Your company's name"
              value={profile.companyName}
              onChange={handleChange}
              icon={<Building size={18} className="text-gray-400" />}
            />
            <ProfileInput
              label="Company Website"
              name="website"
              type="url"
              placeholder="https://example.com"
              value={profile.website}
              onChange={handleChange}
              icon={<Globe size={18} className="text-gray-400" />}
            />
            <ProfileInput
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="e.g., 123-456-7890"
              value={profile.phone}
              onChange={handleChange}
              icon={<Phone size={18} className="text-gray-400" />}
            />
            <ProfileInput
              label="Address"
              name="address"
              type="text"
              placeholder="Company's full address"
              value={profile.address}
              onChange={handleChange}
              icon={<MapPin size={18} className="text-gray-400" />}
            />
          </div>

          <div className="pt-4 border-t mt-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {saving && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
