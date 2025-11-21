import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'
export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saveEmail, setSaveEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_API_BASE + "/auth/send-otp", { email, phone });
      navigate("/verify?email=" + encodeURIComponent(email) + (phone ? "&phone=" + encodeURIComponent(phone) : ""));
    } catch (err:any) {
      alert(err?.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 emailformdiv ">
      <div className="w-full max-w-md pt-12 generalpadding">
        {/* Title and description */}
        <div className="mb-8">
          <h1 className="mb-2">Enter your email</h1>
          <p className="text-gray-500">
            We'll send a code to verify it's yours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={sendOtp} className="flex flex-col h-[calc(100vh-250px)]">
          <div className="mb-4">
            <input
              type="email"
              placeholder="e.g. example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 mb-6">
            <input
              type="checkbox"
              id="saveEmail"
              checked={saveEmail}
              onChange={(e) => setSaveEmail(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
            />
            <label htmlFor="saveEmail" className="text-gray-500 cursor-pointer">
              Save this email on this device
            </label>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1 summitbtn"></div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className=" w-full bg-purple-600 text-white py-4 generalbutton hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Next"}
          </button>
        
          <span className="simplespan">Safe. Simple. Borderless</span>
        </form>
      </div>
    </div>
  );
}
