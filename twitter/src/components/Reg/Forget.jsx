import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pass,Setpass] = useState("")
  const [clicked, setClicked] = useState(false);
  const [resetAttempts, setResetAttempts] = useState(0);

  useEffect(() => {
    const lastAttemptDate = localStorage.getItem("lastResetDate");
    const attempts = localStorage.getItem("resetAttempts") || 0;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (lastAttemptDate === today) {
      setResetAttempts(parseInt(attempts));
    } else {
      localStorage.setItem("resetAttempts", 0);
      setResetAttempts(0);
    }
  }, []);

  const handleResetPassword = async () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastAttemptDate = localStorage.getItem("lastResetDate");

    if (lastAttemptDate !== today) {
        localStorage.setItem("resetAttempts", 0);
        setResetAttempts(0);
        localStorage.setItem("lastResetDate", today);
    }

    if (resetAttempts >= 1) {
        setError("You can only request a password reset once per day.");
        return;
    }

    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent! Please check your inbox.");

        const newAttempts = resetAttempts + 1;
        localStorage.setItem("resetAttempts", newAttempts);
        setResetAttempts(newAttempts);
    } catch (error) {
        setError(error.message);
    }
};

  const RandomPass = () => {
    setClicked(false);
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const allChars = uppercase + lowercase;

    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    Setpass(password);
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-sky-500">
      <div className="w-1/2 h-screen"></div>
      <div className="bg-white w-1/2 h-screen px-10 flex flex-col justify-center items-start gap-2">
        {error && <div className="bg-red-200 p-2 rounded-md">{error}</div>}
        <div className="rounded-lg flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Forgot Password</h2>
          <input
            className="bg-slate-200 p-2 rounded-md"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <button
          onClick={RandomPass}
          className="bg-black p-2 px-12 rounded-md text-white"
        >
          Generate Password
        </button>
        {pass && (
          <div className="bg-slate-200 p-2 rounded-md flex justify-center items-center gap-8">
            <p className="w-40">{pass}</p>
            <div
              className="text-slate-500 text-xl flex justify-center items-center cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(pass);
                setClicked(true);
              }}
            >
              {clicked ? <p className="text-sm">Copied</p> : <ion-icon name="copy-outline"></ion-icon>}
            </div>
          </div>
        )}
          <button
            className="bg-sky-500 p-2 rounded-md text-white"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <p className="text-green-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Forget;
