import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [search] = useSearchParams();
  const email = search.get("email") || "";
  const phone = search.get("phone") || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (!/^[0-9]{6}$/.test(otpString)) {
      setStatusMessage("Please enter a 6-digit code.");
      return;
    }

    setLoading(true);
    setStatusMessage("");
    try {
      await axios.post(import.meta.env.VITE_API_BASE + "/auth/verify-otp", { email, otp: otpString, phone });
      // on success redirect to dashboard or next step
      navigate("/dashboard?email=" + encodeURIComponent(email));
    } catch (err: any) {
      setStatusMessage(err?.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (countdown > 0) return;
    
    setResendLoading(true);
    setStatusMessage("");
    try {
      await axios.post(import.meta.env.VITE_API_BASE + "/auth/resend-otp", { email, phone });
      setStatusMessage("A new code has been sent.");
      setCountdown(30);
    } catch (err: any) {
      setStatusMessage(err?.response?.data?.error || "Unable to resend code. Try again later.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 otpformdiv">
      
      <div className="w-full max-w-md flex flex-col min-h-screen py-8 generalpadding">
        {/* Title and description */}
        <div className="mb-8">
          <h1 className="mb-2 checkbox">Check your inbox</h1>
          <p className="text-gray-400 text-sm">
            A 6 digit code was sent to <span className="text-black">{email || phone || "your contact"}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={verify} className="flex flex-col flex-1 otpform">
          <div className="mb-6">
            <label className="block mb-3 text-sm">Enter 6-digit code</label>
            <div className="flex gap-3 justify-between ">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="inputfield flex-1 h-14 text-center bg-gray-100 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all text-xl"
                />
              ))}
            </div>
          </div>

          {/* Resend text */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">
              Didn't get it?{" "}
              {countdown > 0 ? (
                <span className="text-purple-600">Resend code in {countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={resend}
                  disabled={resendLoading}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {resendLoading ? "Sending..." : "Resend code"}
                </button>
              )}
            </p>
          </div>

          {/* Error message */}
          {statusMessage && (
            <p className="text-sm text-red-500 text-center mb-4">{statusMessage}</p>
          )}

          {/* Spacer to push content to bottom */}
          <div className="flex-1"></div>

          {/* Wrong email link */}
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-purple-600 hover:text-purple-700 text-sm"
            >
              Wrong email?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-4 generalbutton hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {/* Footer text */}
          <p className="text-center text-gray-400 text-sm">
            Safe. Simple. Borderless
          </p>
        </form>
      </div>
    </div>
  );
}