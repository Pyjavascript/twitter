import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../context/firebase";

function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    // Initialize Recaptcha only once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha verified");
        },
      });
    }
  }, []);

  const sendOTP = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      console.log("OTP sent successfully!");
    } catch (e) {
      console.error("Error sending OTP:", e);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) {
      console.error("No confirmation result found");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      console.log("User signed in successfully:", result.user);
    } catch (e) {
      console.error("Error verifying OTP:", e);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(phone) => setPhoneNumber("+" + phone)}
        containerClass="!w-72"
        inputClass="!w-full"
      />
      
      <button className="bg-blue-500 text-white p-2 px-4 rounded" onClick={sendOTP}>
        Get OTP
      </button>

      <div id="recaptcha"></div>

      <div className="flex flex-col justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Verify OTP"
          className="outline-none border border-slate-300 p-2 w-72 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="bg-green-600 text-white p-2 px-4 rounded" onClick={verifyOTP}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default PhoneAuth;
