import { ArrowLeft } from "lucide-react";

interface IDVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function IDVerificationStep({ onNext, onBack }: IDVerificationStepProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col min-h-screen py-4">
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
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          </div>
          
          <span className="text-gray-400">4/4</span>
        </div>

        {/* Title and description */}
        <div className="mb-6">
          <h1 className="mb-3">Let's verify it's really you</h1>
          <p className="text-gray-600 mb-4">
            We'll take a quick moment to confirm your identity with our trusted verification partner.
          </p>
          <p className="text-gray-600">
            Have your ID handy (e.g. NIN, Passport, or Driver's License).
          </p>
        </div>

        {/* Icon/Illustration - centered in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          <svg 
            width="180" 
            height="180" 
            viewBox="0 0 180 180" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clipboard */}
            <path 
              d="M125 35H130C135.523 35 140 39.477 140 45V155C140 160.523 135.523 165 130 165H50C44.477 165 40 160.523 40 155V45C40 39.477 44.477 35 50 35H55" 
              stroke="#E5E7EB" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {/* Clipboard top */}
            <rect 
              x="65" 
              y="25" 
              width="50" 
              height="20" 
              rx="5" 
              stroke="#E5E7EB" 
              strokeWidth="12"
            />
            {/* Person icon */}
            <circle 
              cx="90" 
              cy="80" 
              r="15" 
              stroke="#E5E7EB" 
              strokeWidth="10"
            />
            <path 
              d="M70 120C70 109 78 100 90 100C102 100 110 109 110 120" 
              stroke="#E5E7EB" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
            {/* X circle */}
            <circle 
              cx="125" 
              cy="130" 
              r="25" 
              fill="white" 
              stroke="#E5E7EB" 
              strokeWidth="10"
            />
            <path 
              d="M115 120L135 140M135 120L115 140" 
              stroke="#E5E7EB" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-8">
          <button 
            onClick={onNext}
            className="w-full bg-purple-600 text-white py-4 rounded-full hover:bg-purple-700 transition-colors mb-3 flex items-center justify-center"
          >
            Start verification
          </button>
          <p className="text-center text-gray-400 text-sm">
            Data Stay private. No third-party access.
          </p>
        </div>
      </div>
    </div>
  );
}
