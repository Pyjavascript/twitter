import React, { useState, useRef } from "react";
import { useUserAuth } from "../../../context/userauth";
const MAX_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_SIZE = 100 * 1024 * 1024; // 100MB in bytes

const AudioRecorder = ({ email,isOpen }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const startTimeRef = useRef(null); // Ref to store the start time
  const { user } = useUserAuth();
  let postCount;
  // 🎤 Start Recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];
    startTimeRef.current = Date.now(); // Store the start time

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);

      // Calculate the duration
      const duration = (Date.now() - startTimeRef.current) / 1000; // Duration in seconds
      if (duration > 300) { // 300 seconds = 5 minutes
        alert("Recording exceeds 5 minutes limit. Please record a shorter audio.");
        setAudioURL(""); // Reset the audio preview
        return;
      }

      setAudioBlob(audioBlob);
    };

    mediaRecorder.start();

    // Stop recording automatically after 5 minutes
    setTimeout(() => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    }, MAX_DURATION);

    setRecording(true);
  };

  // 🛑 Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  // ⏳ Check if Upload is Allowed (2 PM - 7 PM IST)
  const canUploadAudio = () => {
    const now = new Date();
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + ISTOffset);
    const hours = istTime.getHours();
    return hours >= 14 && hours < 19;
  };

  // 🔑 Request OTP
  const requestOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const response = await fetch("http://https://twitter-jfq3.onrender.com/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (data.message) {
      alert("OTP sent to your email.");
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    const response = await fetch("http://https://twitter-jfq3.onrender.com/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    if (data.success) {
      setOtpVerified(true);
      alert("OTP verified! You can now upload audio.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // 📤 Upload Audio
  const uploadAudio = async () => {
    if (!otpVerified) {
      alert("Please verify OTP before uploading.");
      return;
    }

    if (!canUploadAudio()) {
      alert("You can only upload audio between 2:00 PM - 7:00 PM IST.");
      return;
    }

    if (!audioBlob) {
      alert("Please record an audio first.");
      return;
    }

    if (audioBlob.size > MAX_SIZE) {
      alert("Audio file size exceeds 100MB. Please record a smaller file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
      if (isUploading) return;
      setIsUploading(true);

      const response = await fetch("http://https://twitter-jfq3.onrender.com/upload-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if(data){
        
        alert("Audio uploaded successfully!");
        setAudioURL(data.audioUrl);
        localStorage.setItem("audioUrl", data.audioUrl);
        let tempName = "";
        let tempUsername = "";
        let profileImage = "";
        if (user?.providerData[0]?.providerId === "password") {
          const res = await fetch(`http://https://twitter-jfq3.onrender.com/api/loggedinuser?email=${email}`);
          const data = await res.json();
          tempName = data[0].displayName;
          tempUsername = data[0].username;
          profileImage = data[0]?.photoURL || user?.profileImage;
        } else {
          tempName = user?.displayName;
          tempUsername = email?.split("@")[0];
        }
  
        if (tempName) {
          const userpost = {
            profilephoto: profileImage,
            post: "",
            photo: "",
            username: tempUsername,
            name: tempName,
            email: email,
            audioUrl: data.audioUrl
          };
          console.log(userpost);
          
  
          console.log(userpost);
          localStorage.setItem("audioUrl", "");
          // setAudioUrl(""); 
  
          // if (checkTweetForKeywords(post)) {
          //   showNotification(post);
          // }
  
          fetch("http://https://twitter-jfq3.onrender.com/api/post", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userpost),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
             if(postCount > 0){
              postCount = postCount - 1;
              localStorage.setItem("postCount", postCount);
              
             }
            });
      }
    }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error in Uploading Audio")
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.3)] flex items-center justify-center z-10`}>
      <div className="bg-white p-8 md:rounded-lg shadow-lg max-w-md w-full">
        <div className="w-full flex justify-end mb-2 text-2xl cursor-pointer" onClick={() => isOpen(false)}>
        <ion-icon name="close-outline"></ion-icon>
        </div>
      <h2 className="font-bold  md:text-2xl mb-2">🎙 Record & Upload Audio Tweet</h2>

     <div className="flex gap-2 mb-2">
       {/* 🎤 Record Controls */}
       <button className="bg-blue-400 text-white p-1 md:p-2 rounded-md" onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button className="bg-red-500 text-white p-1 md:p-2 rounded-md" onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
     </div>

      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}

      <br />

      {/* 📩 OTP Authentication */}
      <input type="email" placeholder="Enter your email" value={email} disabled />
      <button onClick={requestOtp} className="bg-black p-1 px-3 rounded-full text-white mb-2">Request OTP</button>

      <br />
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}  className="bg-black p-1 px-3 rounded-full text-white mb-2">Verify OTP</button>

      <br />

      {/* 📤 Upload Button */}
      <button onClick={uploadAudio} disabled={!otpVerified} className={`${otpVerified ? "bg-blue-400" : "bg-gray-500"} text-white p-2 rounded-md`}>
        Upload Audio
      </button>
    </div>
    </div>
  );
};

export default AudioRecorder