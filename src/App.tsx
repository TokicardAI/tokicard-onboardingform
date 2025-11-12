import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import VerificationStep from "./components/VerificationStep";
import PersonalDetailsStep from "./components/PersonalDetailsStep";
import IDVerificationStep from "./components/IDVerificationStep";
import SuccessStep from "./components/SuccessStep";

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);

  if (step === 2) {
    return <VerificationStep onNext={() => setStep(3)} onBack={() => setStep(1)} />;
  }

  if (step === 3) {
    return <PersonalDetailsStep onNext={() => setStep(4)} onBack={() => setStep(2)} />;
  }

  if (step === 4) {
    return <IDVerificationStep onNext={() => setStep(5)} onBack={() => setStep(3)} />;
  }

  if (step === 5) {
    return <SuccessStep onBack={() => setStep(4)} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
          
          <span className="text-gray-400">1/4</span>
        </div>

        {/* Title and description */}
        <div className="mb-8">
          <h1 className="mb-3">Your card journey starts here</h1>
          <p className="text-gray-600">
            Drop your phone number and unlock your virtual USD card in seconds
          </p>
        </div>

        {/* Phone number input */}
        <div className="mb-auto">
          <label className="block mb-3">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          />
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-32">
          <button 
            onClick={() => setStep(2)}
            className="w-full bg-purple-600 text-white py-4 rounded-full hover:bg-purple-700 transition-colors mb-3 flex items-center justify-center">
            create account
          </button>
          <p className="text-center text-gray-400 text-sm">
            Safe. Simple. Borderless
          </p>
        </div>
      </div>
    </div>
  );
}