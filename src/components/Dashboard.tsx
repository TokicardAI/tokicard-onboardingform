import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, Shield, ChevronRight, Lock } from "lucide-react";
import verifylogo from '../components/figma/verifylogo.png';

export default function Dashboard() {
  const [search] = useSearchParams();
  const email = search.get("email") || "";
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_BASE + "/auth/user?email=" + email)
      .then(res => setUser(res.data))
      .catch(() => console.error("Failed to load user"));
  }, [email]);

  if (!user) return <p className="text-center py-12">Loading dashboard...</p>;

  const basicDone = !!user.kycBasicCompleted;
  const fundingDone = !!user.fundingCompleted;
  const verifyDone = !!user.verifyCompleted;

  const steps = [
    {
      id: 1,
      title: "Provide your details",
      subtitle: "Tell us who you are.",
      done: basicDone,
      path: "/kycBasic",
      locked: false,
    },
    {
      id: 2,
      title: "Add money",
      subtitle: "Fund your account to continue.",
      done: fundingDone,
      path: "/kyc/funding",
      locked: !basicDone,
    },
    {
      id: 3,
      title: "Confirm your ID",
      subtitle: "Upload ID for verification.",
      done: verifyDone,
      path: "/kyc/verify",
      locked: !fundingDone,
    },
  ];

  const completedCount = [basicDone, fundingDone, verifyDone].filter(Boolean).length;
  const allComplete = completedCount === steps.length;

  // Find the next step (not done, not locked)
  const nextStep = steps.find(step => !step.done && !step.locked);

  const firstName = email.split("@")[0] || "User";
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

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
      <div className="px-6 pb-6 identitydiv">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {/* Icon */}
          <div className="flex justify-center mb-4 verifyicondiv">
            <img src={verifylogo} alt="" />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl mb-1 verifyheader">Verify your identity</h3>
            <p className="text-sm text-gray-400 completestep">
              You must complete these steps before you can use your USD card.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-6 space-y-3">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => !step.locked && navigate(`${step.path}?email=${email}`)}
                disabled={step.locked}
                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all stepbtn ${
                  step.done
                    ? "bg-green-50 border-2 border-green-500"
                    : step.locked
                    ? "b00 border-0"
                    : "onit bg-purple-100 border-2 border-purple-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* ADDED: Radio button for "next step" */}
                  {nextStep?.id === step.id ? (
                    <div className="w-6 h-6  border-2 grayradiobtn flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  ) : step.locked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : step.done ? (
                    <div className="w-6 h-6 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-md border-2 border-purple-600 bg-white"></div>
                  )}

                  <div className="text-left">
                    <p className={`${step.locked ? "" : "text-black"} steptitlep`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400">{step.subtitle}</p>
                  </div>
                </div>
                {!step.locked && (
                  <ChevronRight className={`w-5 h-5 ${step.done ? "text-green-500" : "text-purple-600"}`} />
                )}
              </button>
            ))}
          </div>

          {/* Activate Card Button */}
          <button
            disabled={!allComplete}
            onClick={() => navigate("/account?email=" + email)}
            className={`w-full mt-6 py-4 rounded-2xl transition-all ${
              allComplete
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed activatebtn"
            }`}
          >
            Activate Card
          </button>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-400 mt-3">
            Your card becomes available after all steps are done
          </p>
        </div>
      </div>
    </div>
  );
}