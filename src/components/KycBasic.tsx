import { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, Calendar } from "lucide-react";
import Circle from './figma/circle.png';
import './style.css'

export default function KycBasic() {
  const [search] = useSearchParams();
  const email = search.get("email") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [bvn, setBvn] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  // const [showVerified, setShowVerified] = useState(false);
  // ← ADD THIS ONE LINE ONLY
  const [showVerified, setShowVerified] = useState(false);
  
  const navigate = useNavigate();

  const emailFirstName = email.split("@")[0] || "User";
  const displayName = emailFirstName.charAt(0).toUpperCase() + emailFirstName.slice(1);

  const submitBasic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(import.meta.env.VITE_API_BASE + "/auth/kyc-basic", {
        email,
        firstName,
        lastName,
        dob,
        bvn
      });

      // ← ADD THIS ONE LINE ONLY
      setShowVerified(true);
      
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to save information");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = firstName && lastName && dob && bvn;

  return (
    <div className="min-h-screen bg-gray-200 verifygeneraldiv">
      {/* Header */}
      <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Welcome back, <span className="text-black">{displayName}</span></p>
        </div>
        <button className="p-2 hover:bg-gray-300 rounded-full">
          <Bell className="w-5 h-5 text-purple-600" />
        </button>
      </div>

      {/* Balance Section */}
      <div className="px-6 py-6 bg-gray-200 balanceviewdiv">
        <p className="text-xs text-gray-600 mb-1 availablebal">Available Balance</p>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl showbal">
            {showBalance ? "$0.00" : "••••"}
          </h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-gray-300 rounded-full"
          >
            {showBalance ? (
              <Eye className="w-5 h-5 text-gray-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
     <div 
  className="px-6 pb-6 identitydiv generalpadding basicinfodiv "
  style={{ marginTop: showVerified ? '250px' : '0px' }}
>
        {/* FORM — Shows by default */}
        {!showVerified ? (
          <>
            <div>
              <h1 className="basicinfoheader">Add your basic info</h1>
              <p className="basicinfoheaderp">We need a few details to verify your identity.</p>
            </div>
            <form onSubmit={submitBasic} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 inputusertext">First name</label>
                <input
                  type="text"
                  placeholder="e.g. Michael"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="kycinputfield w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 inputusertext">Last name</label>
                <input
                  type="text"
                  placeholder="e.g. Daniel"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="kycinputfield w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* BVN */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 inputusertext">BVN</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={11}
                  placeholder="enter your BVN"
                  value={bvn}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setBvn(value);
                    }
                  }}
                  required
                  className="kycinputfield w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 inputusertext">Date of Birth</label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    required
                    className="kycinputfield w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full activebtn py-4 generalbutton transition-all ${
                  isFormValid && !loading
                    ? "bg-purple-600 text-white hover:bg-purple-700 generalbutton"
                    : "bg-gray-500 text-gray-400 cursor-not-allowed generalbutton inactivebtn"
                }`}
              >
                {loading ? "Saving..." : "Continue"}
              </button>

              {/* Footer text */}
              <p className="text-center text-xs text-gray-400 mt-3 basicinfoheaderp">
                Your card becomes available after all steps are done
              </p>
            </form>
          </>
          
        ) : (
          /* ====== SUCCESS SCREEN — Shows after clicking Continue ====== */
          <div className="verifieddiv">
            <div className="circleimgdiv">
              <img src={Circle} alt="" width={100}/>
            </div>
            <div>
              <h1 className="basicinfoheader">Your verification is <br /> complete</h1>
              <p className="basicinfoheaderp">Everything checks out. Your USD card is ready.</p>
              <button
                onClick={() => navigate("/fund?email=" + encodeURIComponent(email))}
                className="w-full activebtn py-4 verifiedbtn transition-all bg-purple-600 text-white hover:bg-purple-700 generalbutton"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}