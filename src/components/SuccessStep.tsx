import { ArrowLeft } from "lucide-react";
import Successbadge from "./figma/successbadge.png";
interface SuccessStepProps {
  onBack: () => void;
}

export default function SuccessStep({ onBack }: SuccessStepProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col min-h-screen py-4">
        {/* Header */}
        <div className="mb-8">
          <button className="p-2 -ml-2" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Title and description */}
        <div className="mb-8">
          <h1 className="mb-3">You're verified!</h1>
          <p className="text-gray-600">
            Welcome aboard, <span className="text-black">Michael</span>! Your account is ready, let's create your first card and start spending!
          </p>
        </div>

        {/* Success Icon - centered in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          {/* <svg 
            width="180" 
            height="180" 
            viewBox="0 0 180 180" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
           
            <path 
              d="M90 30C95 30 100 25 105 25C110 25 115 28 120 30C125 32 130 30 135 32C140 34 143 39 146 44C149 49 152 52 152 57C152 62 155 67 155 72C155 77 152 82 150 87C148 92 150 97 146 101C142 105 137 106 132 109C127 112 124 117 119 119C114 121 109 119 104 119C99 119 94 121 89 119C84 117 81 112 76 109C71 106 66 105 62 101C58 97 60 92 58 87C56 82 53 77 53 72C53 67 56 62 58 57C60 52 58 47 62 43C66 39 71 38 76 35C81 32 84 27 89 25C94 23 90 30 90 30Z" 
              fill="white" 
              stroke="#9333EA" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
    
            <path 
              d="M70 90L85 105L115 75" 
              stroke="#9333EA" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg> */}
          <img src={Successbadge} alt="" width={120}/>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-8">
          <button 
            className="w-full bg-purple-600 text-white py-4 rounded-full hover:bg-purple-700 transition-colors mb-3 flex items-center justify-center"
          >
            Create My Card
          </button>
          <button 
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-full hover:bg-gray-200 transition-colors mb-3 flex items-center justify-center"
          >
            Explore dashboard
          </button>
          <p className="text-center text-gray-400 text-sm">
            Data Stay private. No third-party access.
          </p>
        </div>
      </div>
    </div>
  );
}
