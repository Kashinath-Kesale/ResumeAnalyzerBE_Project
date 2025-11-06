import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function PleaseVerify() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <Mail size={48} className="text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900">Check Your Email</h2>
        <p className="text-gray-600">
          We've sent a verification link to your email address. Please click the link in the email to activate your account.
        </p>
        <p className="text-sm text-gray-500">
          Didn't get an email? Check your spam folder or try logging in to resend the link.
        </p>
        <div>
          <Link
            to="/login"
            className="w-full py-3 px-4 inline-block text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
