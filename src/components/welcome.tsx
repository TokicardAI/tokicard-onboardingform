import { useNavigate } from "react-router-dom";
import logoImage from "./figma/tokilogo.png";
import './style.css'
export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 welcomegeneraldiv">
      <div className="w-full max-w-md flex flex-col items-center text-center py-12">
        {/* Logo */}
        <div className="mb-12 welcomelogodiv">
            <img src={logoImage} alt="Tokicard Logo" className="w-24 h-24" />
        </div>

        {/* Title and subtitle */}
        <div className="welcometextdiv ">
          <h1 className="mb-3 welcomeheader">Welcome to Tokicard</h1>
          <p className="text-gray-500 text-sm px-4">
            Your USD card built for fast, secure, everyday payments.
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Buttons section */}
        <div className="w-full space-y-4 welcomebuttondiv ">
          <button 
            onClick={() => navigate("/emailform")}
            className="w-full bg-purple-600 text-white py-4  hover:bg-purple-700 transition-colors generalbutton"
          >
            Get Started
          </button>
          
          <button 
            onClick={() => navigate("/emailform")}
            className="w-full text-gray-700 hover:text-gray-900 transition-colors py-4 mt-2 bg-gray-600 secondbuttondiv"
          >
            I already have an account
          </button>
        </div>

        {/* Footer text */}
        <p className="text-gray-400 text-xs mt-8 welcomefootertext">
          Your data stay private. No outside access
        </p>
      </div>
    </div>
  );
}
