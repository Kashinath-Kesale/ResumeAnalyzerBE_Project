import React from "react";
import { Link } from "react-router-dom";

export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-indigo-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect width="20" height="16" x="2" y="4" rx="2" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        <p className="text-gray-600 mt-2">We sent a verification link to your email. Click the link to verify your account.</p>
        <div className="mt-6">
          <Link to="/login" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}


