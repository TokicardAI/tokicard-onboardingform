import { ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";

interface VerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VerificationStep({ onNext, onBack }: VerificationStepProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
          
          <span className="text-gray-400">2/4</span>
        </div>

        {/* Title and description */}
        <div className="mb-8">
          <h1 className="mb-3">Just a quick check</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <span className="text-black">+234 812 345 6789</span> via sms or WhatsApp. Enter it below to verify your number and unlock your Virtual USD card.
          </p>
        </div>

        {/* Code input */}
        <div className="mb-6">
          <label className="block mb-4">
            Enter 6-digit code
          </label>
          <div className="flex gap-3 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full aspect-square bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-purple-600 transition-all text-center text-2xl"
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            Didn't get it? <span className="text-purple-600 cursor-pointer">Resend code in 30s</span>
          </p>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-32">
          <button className="w-full bg-purple-600 text-white py-4 rounded-full hover:bg-purple-700 transition-colors mb-3 flex items-center justify-center" onClick={onNext}>
            Verify & Continue
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