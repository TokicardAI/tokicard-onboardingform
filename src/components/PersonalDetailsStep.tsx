import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface PersonalDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalDetailsStep({ onNext, onBack }: PersonalDetailsStepProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bvn, setBvn] = useState("");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 -ml-2" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
          
          <span className="text-gray-400">3/4</span>
        </div>

        {/* Title and description */}
        <div className="mb-8">
          <h1 className="mb-3">One step closer</h1>
          <p className="text-gray-600">
            We just need a few details to set up your account securely. Promise, this takes less than a minute.
          </p>
        </div>

        {/* Form inputs */}
        <div className="space-y-5 mb-8">
          <div>
            <label className="block mb-3">
              First Name
            </label>
            <input
              type="text"
              placeholder="e.g. Michael"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-3">
              Last name
            </label>
            <input
              type="text"
              placeholder="e.g. Daniel"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-3">
              Email address
            </label>
            <input
              type="email"
              placeholder="e.g. michael@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-3">
              BVN (for verification)
            </label>
            <input
              type="text"
              placeholder="11-digit BVN"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              maxLength={11}
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-gray-400"
            />
            <p className="text-gray-400 text-sm mt-2">
              Your data is protected with bank-grade security
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-8">
          <button className="w-full bg-purple-600 text-white py-4 rounded-full hover:bg-purple-700 transition-colors mb-3 flex items-center justify-center" onClick={onNext}>
            Continue
          </button>
          <p className="text-center text-gray-600 text-sm mb-2">
            Typo in your number? <span className="text-purple-600 cursor-pointer">Edit number</span>
          </p>
          <p className="text-center text-gray-400 text-sm">
            Safe. Simple. Borderless
          </p>
        </div>
      </div>
    </div>
  );
}