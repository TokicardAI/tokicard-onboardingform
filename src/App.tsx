import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailForm from "./components/EmailForm";
import VerifyOtp from "./components/VerifyOtp";
import KycBasic from "./components/KycBasic";       
import Dashboard from "./components/Dashboard";
import Welcome from "./components/welcome";
import FundingDashboard from "./components/Fund";
import Fundaccount from "./components/fundaccount";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Welcome/>} />
        <Route path="/emailform" element={<EmailForm />} />
        <Route path="/verify" element={<VerifyOtp />} />
         <Route path="/KycBasic" element={<KycBasic />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fund" element={<FundingDashboard />} />
           <Route path="/fundaccount" element={<Fundaccount/>} />
      </Routes>
    </BrowserRouter>
  );
}
