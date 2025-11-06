import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("Verifying your email, please wait...");

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No verification token found. The link seems incomplete.");
        return;
      }

      try {
        console.log("🔍 Verifying token:", token);

        // ✅ Call backend verify endpoint
        const { data } = await api.get(`/auth/verify?token=${token}`);

        console.log("✅ Verification API response:", data);

        setStatus("success");
        setMessage(data.message || "Your email has been verified successfully!");

        // ✅ Auto redirect to login after 3s
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.error("❌ Verification API error:", err);
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Verification failed. The link may be invalid or expired."
        );
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center">
        {status === "verifying" && (
          <>
            <div className="flex justify-center">
              <Loader size={48} className="text-indigo-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">{message}</h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Success!</h2>
            <p className="text-gray-600">{message}</p>
            <div>
              <Link
                to="/login"
                className="w-full py-3 px-4 inline-block text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Proceed to Login
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center">
              <XCircle size={48} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Verification Failed
            </h2>
            <p className="text-gray-600">{message}</p>
            <div>
              <Link
                to="/login"
                className="w-full py-3 px-4 inline-block text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
