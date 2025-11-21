import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, Copy, Check } from "lucide-react";
import Circle from './figma/circle.png';
import './style.css';

export default function KycFundingBank() {
  const [search] = useSearchParams();
  const email = search.get("email") || "";
  const navigate = useNavigate();

  const [showBalance, setShowBalance] = useState(true);
  const [showVerified, setShowVerified] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const displayName = email.split("@")[0]?.charAt(0).toUpperCase() + email.split("@")[0]?.slice(1) || "User";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const confirmDeposit = () => {
    setShowVerified(true);
    // Here you would call your backend to mark funding as done
  };

  return (
    <div className="min-h-screen bg-gray-200 verifygeneraldiv ">
      {/* Header */}
      <div className="bg-gray-200 px-6 py-4 flex items-center justify-between welcomepadding">
        <div>
          <p className="text-sm text-gray-600 ">Welcome back, <span className="text-black">{displayName}</span></p>
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
          <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-gray-300 rounded-full">
            {showBalance ? <Eye className="w-5 h-5 text-gray-600" /> : <EyeOff className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Main Content - EXACT same layout as your Basic Info */}
      <div
        className="px-6 pb-6 identitydiv generalpadding basicinfodiv"
        style={{ marginTop: showVerified ? '250px' : '0px' }}
      >
        {/* FORM / INSTRUCTIONS */}
        {!showVerified ? (
          <>
            <div className="text-center mb-8">
              <h1 className="basicinfoheader text-2xl font-bold">Bank Transfer</h1>
              <p className="basicinfoheaderp text-gray-600 mt-2">Send the exact amount to the account below.</p>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8">
              <p className="text-sm text-yellow-800">
                You must send at least $5 (NGN Equivalent) for your transfer to be processed. Anything below this amount will not reflect in your balance.
              </p>
            </div>

            {/* Account Details */}
            <div className="space-y-6 accountdetailsdiv bg-gray-50">
              <div className="accountdetailscontainer rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 subjectname">Full Name</p>
                  <p className="font-semibold text-lg subjectinput">Michael Eton</p>
                </div>
                <button onClick={() => copyToClipboard("Michael Eton", "name")} className="p-2">
                  {copiedField === "name" ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-500" />}
                </button>
              </div>

              <div className="accountdetailscontainer rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 subjectname">Account Number</p>
                  <p className="font-semibold text-lg subjectinput">9172698034</p>
                </div>
                <button onClick={() => copyToClipboard("9172698034", "acc")} className="p-2">
                  {copiedField === "acc" ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-500" />}
                </button>
              </div>

              <div className="accountdetailscontainer rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 subjectname">Bank Name</p>
                  <p className="font-semibold text-lg subjectinput">Globus Bank</p>
                </div>
                <button onClick={() => copyToClipboard("Globus Bank", "bank")} className="p-2">
                  {copiedField === "bank" ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={confirmDeposit}
              className="w-full mt-10 activebtn py-5 generalbutton transition-all bg-purple-600 text-white hover:bg-purple-700 rounded-2xl font-medium text-lg"
            >
              I've Made the Transfer
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">
              Transfers reflect in less than 1 minute.
            </p>
          </>
        ) : (
          /* SUCCESS SCREEN - EXACT same as Basic Info */
          <div className="verifieddiv text-center">
            <div className="circleimgdiv">
              <img src={Circle} alt="Success" width={100} />
            </div>
            <div className="mt-8">
              <h1 className="basicinfoheader text-2xl font-bold">Deposit Confirmed</h1>
              <p className="basicinfoheaderp text-gray-600 mt-4">Your balance has been updated</p>
              <button
                onClick={() => navigate("/dashboard?email=" + encodeURIComponent(email))}
                className="w-full mt-10 mb-5 activebtn py-5 generalbutton transition-all bg-purple-600 text-white hover:bg-purple-700 rounded-2xl font-medium text-lg"
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