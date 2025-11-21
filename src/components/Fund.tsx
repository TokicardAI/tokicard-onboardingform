import { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, ChevronRight, Building2, Bitcoin } from "lucide-react";
import './style.css'
import Btcicon from './figma/bitcoin.png';
import Bankicon from './figma/bank.png';
import Withdrawicon from './figma/Withdrawicon.png';
import Recieveicon from './figma/Recieveicon.png';
export default function KycFunding() {
  const [search] = useSearchParams();
  const email = search.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  // Extract first name from email (or use "User" as fallback)
  const emailFirstName = email.split("@")[0] || "User";
  const displayName = emailFirstName.charAt(0).toUpperCase() + emailFirstName.slice(1);

  // const handlePaymentMethod = async (method: string) => {
  //   setLoading(true);

  //   try {

  //     await axios.post(import.meta.env.VITE_API_BASE + "/auth/kyc-funding", {
  //       email,
  //       method
  //     });

  
  //     navigate("/kyc/verify?email=" + encodeURIComponent(email));
  //   } catch (err: any) {
  //     alert(err?.response?.data?.error || "Failed to process payment method");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-200 verifygeneraldiv ">
        {/* Header */}
      <div className="bg-gray-200 px-6 py-4 px-4 flex items-center justify-between">
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
      <div className="transactionbtndiv">
        <button className="transactionbtn"><span><img src={Recieveicon} alt="" /></span> Deposit</button>
        <button className="transactionbtntwo"><span><img src={Withdrawicon} alt="" /></span>Withdraw</button>
      </div>

      {/* Main Content */}
      <div  className="px-6  identitydiv generalpadding basicinfodiv ">
        {/* Card Section */}
      

        {/* Deposit Options */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {/* Title */}
          <div className="text-center mb-6 makedepositdiv">
            <h3 className="text-xl mb-1">Make Deposit</h3>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            {/* Bank Transfer */}
            <button
              onClick={() => navigate(`/fundaccount?email=${encodeURIComponent(email)}`)}
              disabled={loading}
              className="depositbtn w-full p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {/* <Building2 className="w-5 h-5 text-purple-600" /> */}
                  <img src={Bankicon} alt="Bitcoin"  />
                </div>
                <span className="text-black">Bank Transfer</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Crypto */}
            <button
              onClick={() => navigate(`/fundaccount?email=${encodeURIComponent(email)}`)}
              disabled={loading}
              className="depositbtn w-full p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {/* <Bitcoin className="w-5 h-5 text-purple-600" /> */}
                    <img src={Btcicon} alt="Bitcoin"  />
                </div>
                <span className="text-black">Crypto</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
              
            </button>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-400 mt-6 depositfootertext">
            Your card becomes available after all steps are done
          </p>
        </div>
      </div>
    </div>
  );
}
